import React, { useEffect, useState, useRef, useMemo } from 'react';
import { createLazyFileRoute, Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Box, Button, Container, Grid, HStack, Heading, Image, Spinner, Stack, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HistoryCard from '../../components/History/HistoryCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DetailCard from '../../components/History/DetailCard';
import DatePicker from '../../components/History/DatePicker';
import Search from '../../components/History/Search';
import { cancelBooking, getHistory } from '../../services/history';
import NoList from '../../assets/img/no_list.png';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const Route = createLazyFileRoute('/history/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const location = useLocation();
	const urlParams = new URLSearchParams(location.search);

	const { user, token } = useSelector(state => state.auth);

	useEffect(() => {
		if (!token && !user) {
			toast.error('Silahkan login terlebih dahulu!', {
				position: 'top-right',
				autoClose: 3000, // Durasi toast
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				theme: 'colored',
			});
			setTimeout(() => {
				navigate({ to: '/login' });
			}, 1000);
		}
	}, [navigate, token, user]);

	const [params, setParams] = useState({
		startDate: urlParams.get('search[startBookingDate]'),
		endDate: urlParams.get('search[endBookingDate]'),
		orderId: urlParams.get('search[orderId]'),
	});
	// Ambil tanggal dari query parameter
	const startBookingDate = urlParams.get('search[startBookingDate]');
	const endBookingDate = urlParams.get('search[endBookingDate]');

	const [selectedOrder, setSelectedOrder] = useState(null);
	const [selectedOrderId, setSelectedOrderId] = useState(null);
	const [dateRange, setDateRange] = useState([
		{
			startDate: startBookingDate ? new Date(startBookingDate) : new Date(),
			endDate: endBookingDate ? new Date(endBookingDate) : new Date(),
			key: 'selection',
		},
	]);

	// State untuk kontrol munculkan input
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const [selectedStatus, setSelectedStatus] = useState('All');
	const [orders, setOrders] = useState([]);

	const filteredOrders = orders.filter(order => {
		if (selectedStatus === 'All') return true;
		return order.orderStatus === selectedStatus;
	});

	const queryParams = useMemo(() => {
		return { ...params, dateRange };
	}, [params, dateRange]);

	const { data, isSuccess, isLoading, isError } = useQuery({
		queryKey: ['history', queryParams],
		queryFn: () => getHistory(queryParams),
		retry: 0,
		enabled: !!token && !!user, // Only run the query if the user is logged in
		onSuccess: newData => {
			// Update orders dengan data terbaru setelah pemesanan dibatalkan
			if (isSuccess) {
				setOrders(newData);
			}
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setOrders(data);
		}
	}, [data, isSuccess]);

	// Pastikan state diperbarui jika query parameter berubah
	useEffect(() => {
		setDateRange([
			{
				startDate: startBookingDate ? new Date(startBookingDate) : new Date(),
				endDate: endBookingDate ? new Date(endBookingDate) : new Date(),
				key: 'selection',
			},
		]);
	}, [startBookingDate, endBookingDate]);

	const { mutate: executeCancelBooking } = useMutation({
		mutationFn: orderId => cancelBooking(orderId),
		onSuccess: () => {
			// Invalidasi query untuk menyegarkan data setelah pembatalan
			queryClient.invalidateQueries(['history']);

			toast.success('Pemesanan berhasil dibatalkan.');
		},
		onError: error => {
			toast.error(error.message || 'Terjadi kesalahan saat membatalkan pemesanan.');
		},
	});

	// Handle Simpan dari DatePicker
	const handleSaveDateRange = ({ startDate, endDate }) => {
		// Perbarui URL dengan parameter baru
		const newUrl = new URL(window.location);
		newUrl.searchParams.set('search[startBookingDate]', startDate);
		newUrl.searchParams.set('search[endBookingDate]', endDate);
		window.history.pushState({}, '', newUrl);

		// Set params ke state untuk memastikan URL dan data sinkron
		setParams({ startDate, endDate });
	};

	const detailRef = useRef(null); // Referensi untuk elemen detail

	const handleSelectOrder = order => {
		setSelectedOrder(order);
		setSelectedOrderId(order.id);

		console.log('Selected Order ID:', order.id); // Pastikan ID pesanan ada

		if (detailRef.current) {
			detailRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const toggleDatePicker = () => {
		setIsPickerOpen(prevState => !prevState);
	};

	const toggleSearch = () => {
		setIsSearchOpen(prevState => !prevState);
	};

	const handleSearch = orderId => {
		const newParams = { ...params, orderId };
		setParams(newParams);

		// Tutup detail order saat pencarian dijalankan
		setSelectedOrder(null);
		setSelectedOrderId(null);

		// Update URL with new orderId parameter
		const newUrl = new URL(window.location);
		if (orderId) {
			newUrl.searchParams.set('search[orderId]', orderId);
		} else {
			newUrl.searchParams.delete('search[orderId]');
		}
		window.history.pushState({}, '', newUrl); // Update the browser history
	};

	// Menggunakan useBreakpointValue untuk menentukan urutan
	const orderDetail = useBreakpointValue({ base: 1, md: 2 }); // Detail di awal untuk layar kecil, di akhir untuk layar medium ke atas

	const handlePayment = () => {
		if (selectedOrder?.id) {
			navigate({
				to: '/payment',
				state: { orderId: selectedOrder.id },
			});
		} else {
			toast.error('Token pembayaran tidak tersedia.');
		}
	};

	console.log('Selected Order:', selectedOrder);

	useEffect(() => {
		// Menyinkronkan selectedOrder dengan order yang diperbarui
		if (orders && selectedOrder) {
			const updatedOrder = orders.find(order => order.id === selectedOrder.id);
			if (updatedOrder) {
				setSelectedOrder(updatedOrder);
			}
		}
	}, [orders, selectedOrder]);

	const handleCancelBooking = order => {
		if (!order?.id) {
			toast.error('ID pesanan tidak valid.');
			return;
		}

		Swal.fire({
			title: 'Apakah Anda yakin?',
			text: 'Pemesanan Akan Dibatalkan!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Ya, hapus!',
			cancelButtonText: 'Batal',
		}).then(result => {
			console.log('SweetAlert result:', result); // Cek apakah konfirmasi terjadi
			if (result.isConfirmed) {
				executeCancelBooking(order.id); // Pastikan ID pesanan dikirimkan dengan benar
			}
		});
	};

	return (
		<Container maxW="10/12" py={6} minH="100vh">
			<Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold">
				Pilih Penerbangan
			</Heading>
			<Grid templateColumns={['1fr', '1fr', '13fr 2fr 1fr']} gap={4} alignItems="center">
				<Stack
					as={Link}
					to="/"
					py={3}
					px={8}
					bg="#44B3F8"
					borderRadius="lg"
					color="#FDFFFE"
					justifyContent={['center', 'center', 'flex-start']}
					alignItems="center"
					gap={4}
					display="flex"
					flexDirection={['row']}
					_hover={{ bg: '#2078B8', color: 'white' }}
				>
					<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					<Text>Beranda</Text>
				</Stack>

				{/* Tombol Filter yang membuka DatePicker */}
				<Button py={6} px={8} borderRadius={'lg'} borderColor={'#44B3F8'} bg="#FDFFFE" color={'#44B3F8'} onClick={toggleDatePicker}>
					<FontAwesomeIcon icon={faFilter} color="#44B3F8" size="2xl" m={0} p={0} /> Filter
				</Button>

				{/* Tombol yang membuka Search */}
				<Button py={6} borderRadius={'lg'} borderColor={'#44B3F8'} bg="#FDFFFE" color={'#44B3F8'} onClick={toggleSearch}>
					<FontAwesomeIcon icon={faMagnifyingGlass} color="#44B3F8" size="2xl" />
				</Button>

				<Text fontSize={'xl'} fontWeight={'bold'}>
					{`${new Intl.DateTimeFormat('id-ID', {
						month: 'long',
						year: 'numeric',
					}).format(dateRange[0].startDate)}`}
				</Text>
			</Grid>

			{/* Menampilkan Search ketika isSearchOpen true */}
			{isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} onSearch={handleSearch} />}

			{/* Menampilkan DatePicker ketika isPickerOpen true */}
			{isPickerOpen && <DatePicker setIsPickerOpen={setIsPickerOpen} dateRange={dateRange} setDateRange={setDateRange} onSave={handleSaveDateRange} />}

			{/* Filter Order by Status */}
			<Box overflowX="auto" my={4}>
				<HStack gap={4} justifyContent="start" minWidth="max-content">
					<Button
						bg={selectedStatus === 'All' ? '#44B3F8' : 'transparent'}
						border={selectedStatus === 'All' ? 'none' : '2px solid #44B3F8'}
						color={selectedStatus === 'All' ? 'white' : '#44B3F8'}
						_hover={{
							bg: selectedStatus === 'All' ? '#2078BB' : 'transparent',
							color: selectedStatus === 'All' ? 'white' : '#2078BB',
						}}
						borderRadius="full"
						onClick={() => setSelectedStatus('All')}
					>
						ALL
					</Button>
					<Button
						bg={selectedStatus === 'Unpaid' ? 'red.500' : 'transparent'}
						border={selectedStatus === 'Unpaid' ? 'none' : '2px solid #E53E3E'}
						color={selectedStatus === 'Unpaid' ? 'white' : '#E53E3E'}
						_hover={{
							bg: selectedStatus === 'Unpaid' ? 'red.700' : 'transparent',
							color: selectedStatus === 'Unpaid' ? 'white' : '#C53030',
						}}
						borderRadius="full"
						onClick={() => setSelectedStatus('Unpaid')}
					>
						Unpaid
					</Button>
					<Button
						bg={selectedStatus === 'Issued' ? 'green.500' : 'transparent'}
						border={selectedStatus === 'Issued' ? 'none' : '2px solid #38A169'}
						color={selectedStatus === 'Issued' ? 'white' : '#38A169'}
						_hover={{
							bg: selectedStatus === 'Issued' ? 'green.700' : 'transparent',
							color: selectedStatus === 'Issued' ? 'white' : '#2F855A',
						}}
						borderRadius="full"
						onClick={() => setSelectedStatus('Issued')}
					>
						Issued
					</Button>
					<Button
						bg={selectedStatus === 'Cancelled' ? 'gray.500' : 'transparent'}
						border={selectedStatus === 'Cancelled' ? 'none' : '2px solid #A0AEC0'}
						color={selectedStatus === 'Cancelled' ? 'white' : '#A0AEC0'}
						_hover={{
							bg: selectedStatus === 'Cancelled' ? 'gray.700' : 'transparent',
							color: selectedStatus === 'Cancelled' ? 'white' : '#718096',
						}}
						borderRadius="full"
						onClick={() => setSelectedStatus('Cancelled')}
					>
						Cancelled
					</Button>
				</HStack>
			</Box>

			{isLoading ? (
				<Box display="flex" justifyContent="center" alignItems="center" textAlign="center" py={10} height="50vh">
					<VStack spacing={4} align="center" justify="center" height="100vh">
						<Spinner size="lg" color="#44B3F8" />
						<Text>Memuat history penerbangan...</Text>
					</VStack>
				</Box>
			) : filteredOrders.length === 0 || isError ? (
				<Stack alignItems="center" justifyContent="center" textAlign="center" mt={{ base: 2, sm: 5, md: 8, lg: 10 }} py={{ base: 5, sm: 10 }}>
					<Image src={NoList} alt="No list Image" width={{ base: '50%', sm: '40%', md: '30%', lg: '25%' }} objectFit="cover" />
					<Text color="#44b3f8" fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }}>
						Oops! Riwayat pesanan kosong!
					</Text>
					<Text mt={-2} fontSize={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}>
						Anda belum melakukan pemesanan penerbangan
					</Text>
					<Button as={Link} to="/" rounded="xl" mt={{ base: 3, sm: 4, md: 5 }} py={2} bgColor="#44b3f8" _hover={{ bgColor: '#2078b8' }} fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
						Cari Penerbangan
					</Button>
				</Stack>
			) : (
				<>
					<Grid
						templateColumns={['1fr', '1fr', '6fr 5fr']} // Responsif: 1 kolom di layar kecil
						gap={4}
						justifyContent={'space-between'}
						mt={8}
					>
						{/* DetailCard dipindahkan ke atas saat 1fr */}
						{selectedOrder && (
							<Box ref={detailRef} order={orderDetail}>
								<DetailCard order={selectedOrder} onCancelBooking={handleCancelBooking} onPayment={handlePayment} />
							</Box>
						)}

						{/* HistoryCard di bawah saat 1fr */}
						<Box order={orderDetail === 1 ? 2 : 1}>
							<Grid gap={4} pt={2}>
								<HistoryCard orders={filteredOrders} onSelectOrder={handleSelectOrder} selectedOrderId={selectedOrderId} />
							</Grid>
						</Box>
					</Grid>
				</>
			)}
		</Container>
	);
}

export default RouteComponent;
