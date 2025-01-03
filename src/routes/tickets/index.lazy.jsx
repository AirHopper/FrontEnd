import * as React from 'react';
import { createLazyFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { Box, Container, Grid, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getTicketsListing } from '../../services/ticketsListing';
import FilterDay from '../../components/Tickets/FilterDay';
import { useState, useEffect } from 'react';
import notFoundTicket from '../../assets/img/notfoundflight.png';
import loadingImage from '../../assets/img/loading.png';
import pack from '../../assets/img/pack.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowLeftLong, faArrowRightLong, faCircleInfo, faGreaterThan, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useBreakpointValue } from '@chakra-ui/react';
import { HStack, VStack, Image, AccordionItem, AccordionRoot, AccordionItemTrigger, AccordionItemContent, Flex } from '@chakra-ui/react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SelectFilter from '../../components/Tickets/SelectFilter';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';

export const Route = createLazyFileRoute('/tickets/')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const location = useLocation();

	const [tickets, setTickets] = useState([]);
	const [selectedDay, setSelectedDay] = useState(0);
	const [activeAccordion, setActiveAccordion] = useState(null);
	const [isFilterOpen, setFilterOpen] = useState(false);
	// state management transit
	const [isTransitFilter, setIsTransitFilter] = useState(false);
	const [isDirectFilter, setIsDirectFilter] = useState(false);
	// state navigate
	const [isNavigating, setIsNavigating] = useState(false);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	// Ambil parameter URL
	const urlParams = new URLSearchParams(location.search);
	const params = {
		departureCity: urlParams.get('departure')?.split('+').join(' ').split('_').join(' '),
		arrivalCity: urlParams.get('arrival')?.split('+').join(' ').split('_').join(' '),
		flightDate: urlParams.get('departureDate'),
		classType: urlParams.get('classType')?.split('+').join(' ').split('_').join(' '),
		adult: urlParams.get('adult'),
		child: urlParams.get('child'),
		infant: urlParams.get('infant'),
		returnDate: urlParams.get('returnDate'),
		isTransit: urlParams.get('isTransit'),
		orderBy: urlParams.get('orderBy') || 'price_asc',
		passenger: parseInt(urlParams.get('adult')) + parseInt(urlParams.get('child')) + parseInt(urlParams.get('infant')),
		airline: urlParams.get('airline')?.split('+').join(' ').split('_').join(' '),
	};

	const formatString = str => {
		return str?.split('+').join(' ').split('_').join(' ') || '';
	};

	const hasRequiredParams = () => {
		return params.departureCity && params.arrivalCity && params.classType && params.flightDate;
	};

	useEffect(() => {
		// Check for valid parameters on mount and when params change
		if (!hasRequiredParams() && !isNavigating) {
			// Show error and navigate to home
			setTimeout(() => {
				navigate({ to: '/' });
			}, 500);
			setIsNavigating(true);
			toast.error('Pencarian Tidak Valid!', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				theme: 'colored',
			});
		} else if (hasRequiredParams()) {
			// Reset navigation state if params are valid
			setIsNavigating(true);
		}
	}, [params, navigate, isNavigating]);

	const updateUrlParams = (key, value) => {
		const urlParams = new URLSearchParams(window.location.search);
		if (value === null || value === undefined) {
			urlParams.delete(key);
		} else {
			urlParams.set(key, value);
		}
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, '', newUrl);
	};

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['tickets', params],
		queryFn: async () => {
			const response = await getTicketsListing(params);
			return response;
		},
		retry: 0,
	});

	// cek apakah data adalah valid array?
	useEffect(() => {
		if (Array.isArray(data)) {
			setTickets(data);
		} else {
			setTickets([]);
		}
	}, [data, isSuccess, params.flightDate]);

	// handle filter date
	const updateTickets = selectedDate => {
		// Perbarui data tickets berdasarkan tanggal
		getTicketsListing({ ...params, flightDate: selectedDate }).then(data => {
			setTickets(data);
		});
	};

	// handle accordion
	const handleAccordionToggle = index => {
		setActiveAccordion(prev => (prev === index ? null : index));
	};

	const [isTransitAccordionOpen, setIsTransitAccordionOpen] = useState(false);

	// Handler untuk Transit Accordion
	const toggleTransitAccordion = () => {
		setIsTransitAccordionOpen(prev => !prev);
	};

	// handle filter
	const handleApplyFilter = filteredData => {
		setTickets(filteredData);
	};

	useEffect(() => {
		// Update URL params setiap kali filter diubah
		if (isDirectFilter && isTransitFilter) {
			updateUrlParams('isTransit', undefined);
		} else if (isDirectFilter) {
			updateUrlParams('isTransit', '0');
		} else if (isTransitFilter) {
			updateUrlParams('isTransit', '1');
		} else {
			updateUrlParams('isTransit', undefined);
		}
	}, [isDirectFilter, isTransitFilter]);

	useEffect(() => {
		// Set filter berdasarkan status isTransitFilter dan isDirectFilter
		if (data) {
			setTickets(data);
		}
	}, [data]); // Memantau perubahan pada filter dan data

	// Handler untuk Perubahan Filter Transit
	const handleDirectFilterChange = e => {
		setIsDirectFilter(e.target.checked);
	};

	const handleTransitFilterChange = e => {
		setIsTransitFilter(e.target.checked);
	};

	// Inisialisasi state untuk ticketId1 dan ticketId2
	const [ticketId1, setTicketId1] = useState(null);
	const [ticketId2, setTicketId2] = useState(null);
	const [departureDate, setDepartureDate] = useState(null);

	// Handle send search function
	const handleSendSearch = (ticketId, ticketDepartureDate) => {
		// Periksa apakah tombol dinonaktifkan
		if (isButtonDisabled) {
			return; // Hentikan eksekusi jika tombol dinonaktifkan
		}

		setIsNavigating(true); // Set navigasi aktif
		const searchParams = new URLSearchParams();

		if (params.returnDate) {
			if (!ticketId1) {
				setTicketId1(ticketId);
				setDepartureDate(ticketDepartureDate); // Set departureDate here
				searchParams.append('departure', params.arrivalCity);
				searchParams.append('arrival', params.departureCity);
				searchParams.append('classType', params.classType);
				searchParams.append('departureDate', params.returnDate);
				searchParams.append('ticketId1', ticketId);
				if (params.adult) searchParams.append('adult', params.adult);
				if (params.child) searchParams.append('child', params.child);
				if (params.infant) searchParams.append('infant', params.infant);
				navigate({ to: `/tickets?${searchParams.toString()}` });
			}
		} else {
			if (!ticketId1) {
				setTicketId1(ticketId);
				setDepartureDate(ticketDepartureDate); // Set departureDate here
				searchParams.append('ticketId1', ticketId);
				if (params.classType) searchParams.append('classType', params.classType);
				if (params.adult) searchParams.append('adult', params.adult);
				if (params.child) searchParams.append('child', params.child);
				if (params.infant) searchParams.append('infant', params.infant);
				navigate({ to: `/checkout?${searchParams.toString()}` });
			} else {
				setTicketId2(ticketId);
				setDepartureDate(ticketDepartureDate); // Set departureDate here
				searchParams.append('ticketId1', ticketId1);
				searchParams.append('ticketId2', ticketId);
				if (params.classType) searchParams.append('classType', params.classType);
				if (params.adult) searchParams.append('adult', params.adult);
				if (params.child) searchParams.append('child', params.child);
				if (params.infant) searchParams.append('infant', params.infant);
				navigate({ to: `/checkout?${searchParams.toString()}` });
			}
		}
	};

	const handleNavigation = () => {
		navigate({ to: '/' });
	};

	return (
		<Container maxW={{ base: '100%', md: '90%', lg: '80%' }} py={6} minH="100vh">
			<Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold" textAlign={{ base: 'start', md: 'left' }}>
				Pilih Penerbangan
			</Heading>
			<Grid templateColumns={['1fr', '5fr 2fr']} gap={4} alignItems="center">
				<Stack
					onClick={handleNavigation}
					py={3}
					px={6}
					bg="#44B3F8"
					borderRadius="md"
					color="#FDFFFE"
					gap={4}
					display="flex"
					flexDirection="row"
					alignItems="center"
					justifyContent={{ base: 'center', md: 'start' }}
					fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
					w="full"
					maxW="100%"
					_hover={{ bg: '#2078B8', color: '#FDFFFE' }}
					cursor={'pointer'}
				>
					<Flex align="flex-start" direction={{ base: 'row' }} wrap="wrap" textAlign={{ base: 'start', sm: 'start' }}>
						<FontAwesomeIcon icon={faArrowLeftLong} size="sm" />
					</Flex>
					<Flex gap={{ base: 1, sm: 2, md: 4 }} align="start" direction={{ base: 'row' }} wrap="wrap" textAlign={{ base: 'start', sm: 'start' }}>
						<Box align="start">
							<Text as="span">{params.departureCity}</Text>

							<Text as="span" mx={2}>
								<FontAwesomeIcon icon={faArrowRightLong} size="sm" />
							</Text>
							<Text as="span">{params.arrivalCity}</Text>
							<Text as="span" mx={2}>
								<FontAwesomeIcon icon={faMinus} />
							</Text>
							<Text as="span" style={{ whiteSpace: 'nowrap' }}>
								{params.passenger} Penumpang
							</Text>
							<Text as="span" mx={2}>
								<FontAwesomeIcon icon={faMinus} />
							</Text>
							<Text as="span">{params.classType}</Text>
						</Box>
					</Flex>
				</Stack>

				<Stack
					onClick={handleNavigation}
					py={3}
					px={9}
					bg="#F8D24D"
					_hover={{ bg: '#D4B340', color: '#FDFFFE' }}
					borderRadius="md"
					color="#FDFFFE"
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexDirection="row"
					fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
					cursor={'pointer'}
				>
					<Text display="inline">Ubah Pencarian</Text>
				</Stack>
			</Grid>

			{/* Filter Day */}
			<FilterDay selectedDay={selectedDay} setSelectedDay={setSelectedDay} paramsDate={params.flightDate} onUpdateTickets={updateTickets} flightDate={departureDate} setIsButtonDisabled={setIsButtonDisabled} />

			{/* Select Filter */}
			<Box textAlign="right" mt={4}>
				<Button onClick={() => setFilterOpen(true)} py={2} px={9} bg={'#FDFFFE'} border="1px solid #44B3F8" _hover={{ bg: '#2078B8', color: '#FDFFFE' }} color={'#44B3F8'}>
					Filter
				</Button>{' '}
			</Box>

			{isFilterOpen && <SelectFilter onCloseClick={() => setFilterOpen(false)} onApplyFilter={handleApplyFilter} />}

			<Grid mt={8}>
				<Grid templateColumns={['1fr', '1fr', '2fr 4fr']} gap={4} alignItems="flex-start">
					<VStack gap={4}>
						<Box display="flex" width="100%" borderWidth="1px" borderRadius="md" px={6} py={{ base: '4', md: '6' }} shadow="sm" height="auto">
							<AccordionRoot collapsible>
								<AccordionItem>
									<Box display="block" width="100%">
										{/* Header */}
										<Flex justify={'space-between'} alignItems="flex-start">
											<Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'semibold'}>
												Filter Transit
											</Text>
											<AccordionItemTrigger
												display={'inline-block'}
												width={'auto'}
												onClick={toggleTransitAccordion} // Menggunakan handler transit
											>
												<Text cursor={'pointer'} display={'flex'} alignItems={'flex-start'}>
													<FontAwesomeIcon
														icon={faChevronUp}
														style={{
															transition: 'transform 0.3s',
															transform: isTransitAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
														}}
													/>
												</Text>
											</AccordionItemTrigger>
										</Flex>

										{/* Accordion Content */}
										<Box
											overflow="hidden"
											transition="height 0.3s ease, opacity 0.3s ease"
											height={isTransitAccordionOpen ? 'auto' : 0} // Tinggi animasi
											opacity={isTransitAccordionOpen ? 1 : 0} // Mengatur visibilitas
										>
											<Box display="flex" flexDirection="column" gap={4} py={4}>
												{/* Checkbox Langsung */}
												<Checkbox
													isChecked={isDirectFilter} // Terhubung ke state
													onChange={handleDirectFilterChange}
													colorScheme="blue"
													cursor="pointer"
												>
													Tampilkan Tiket Langsung
												</Checkbox>

												{/* Checkbox Transit */}
												<Checkbox
													isChecked={isTransitFilter} // Terhubung ke state
													onChange={handleTransitFilterChange}
													cursor="pointer"
													colorScheme="blue"
												>
													Tampilkan Tiket Transit
												</Checkbox>
											</Box>
										</Box>
									</Box>
								</AccordionItem>
							</AccordionRoot>
						</Box>
					</VStack>
					{/* Ticket Card */}
					{isLoading ? (
						<Box width="xs" textAlign="center" mx="auto" display="flex" flexDirection="column" alignItems="center">
							<Text pb={2}>Mencari Penerbangan Terbaik</Text>
							<Text p={2}>Loading...</Text>
							<Image src={loadingImage} alt="Not Found" width={'70%'} />
						</Box>
					) : isError || tickets.length === 0 ? (
						<Box width={{ base: '100%', sm: 'md', md: 'md', lg: 'md' }} textAlign="center" mx="auto" display="flex" flexDirection="column" p={{ base: 4, sm: 6, md: 8 }}>
							<Image src={notFoundTicket} alt="Not Found" width={{ base: '80%', sm: '90%', md: '100%' }} mx="auto" />
							<Text mt={6} fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }} fontWeight="medium">
								Maaf, pencarian Anda tidak ditemukan
							</Text>
							<Text mt={2} color="#2078B8" fontSize={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl' }} fontWeight="medium">
								Coba cari perjalanan lainnya!
							</Text>
						</Box>
					) : tickets.length === 0 ? (
						<Box width={'xs'} textAlign="center" mx="auto" display="flex" flexDirection="column">
							<Text mt={6} fontSize="md" fontWeight="medium">
								Tidak ada tiket yang ditemukan.
							</Text>
							<Text color="#2078B8" fontSize="md" fontWeight="medium">
								Silakan coba pencarian lain!
							</Text>
						</Box>
					) : (
						<Box>
							{tickets.map((ticket, index) => (
								<Flex gap={10} mb={6} key={ticket.id}>
									<AccordionRoot
										key={ticket.id}
										collapsible
										borderWidth="1px"
										borderRadius="md"
										px={6}
										pt={6}
										shadow={activeAccordion === index ? 'none' : 'sm'} // Shadow saat tidak aktif
										borderColor={activeAccordion === index ? '#44B3F8' : 'transparent'} // Border biru saat aktif
										transition="all 0.3s ease"
									>
										<AccordionItem value={`ticket-${index}`}>
											<Box display="block" width="100%" pb={6} gap={{ base: 2, sm: 4, md: 6, lg: 8 }}>
												{/* Header */}
												<Flex justify={'space-between'} flexDirection={['column-reverse', 'row']} mb={1}>
													<HStack justifyContent={'start'}>
														<Flex align={'center'} gap={6}>
															<Image src={ticket.flights[0].airline.logo} alt="Airline logo" boxSize="40px" />
															<Text fontWeight="normal" fontSize={'md'}>
																{formatString(ticket.flights[0].airline.name)} - {formatString(ticket.class)}
															</Text>
														</Flex>
													</HStack>

													<AccordionItemTrigger display={'inline-block'} width={'auto'} onClick={() => handleAccordionToggle(index)} ml="auto">
														<Text cursor={'pointer'} display={'flex'} alignItems={'flex-start'}>
															<FontAwesomeIcon
																icon={faChevronUp}
																style={{
																	transition: 'transform 0.3s',
																	transform: activeAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)',
																}}
															/>
														</Text>
													</AccordionItemTrigger>
												</Flex>

												{/* Content */}
												<Flex justify="space-between" flexDirection={['column', 'row']} px={[0, 0]} gap={{ base: 2, sm: 4 }}>
													<HStack width="100%" gap={{ base: 2, sm: 4, md: 6, lg: 6 }}>
														{/* Departure Info */}
														<VStack gap={0} align={'flex-start'}>
															<Text fontSize={['sm', 'lg']} fontWeight={'bold'}>
																{new Date(ticket.departure.time).toLocaleTimeString([], {
																	hour: '2-digit',
																	minute: '2-digit',
																	hour12: false,
																	timeZone: 'UTC',
																})}
															</Text>
															<Text fontSize={['sm', 'md']}>{ticket.departure.airport.code}</Text>
														</VStack>

														{/* Panah dengan Lebar Fleksibel */}
														<VStack
															spacing={2}
															align="center"
															flex="1"
															mx={[4, 0]}
															my={[3, 0]}
															fontSize={'sm'}
															flexGrow={1} // Tambahkan ini agar memenuhi sisa ruang
														>
															<Text color={'#A8B6B7'}>{`${String(Math.floor(ticket.totalDuration / 60)).padStart(2, '0')}h ${String(ticket.totalDuration % 60).padStart(2, '0')}m`}</Text>
															<Box position="relative" width="100%" height="2px" backgroundColor="red">
																<Box
																	position="absolute"
																	top="50%"
																	right="0"
																	transform="translateY(-50%)"
																	width="0"
																	height="0"
																	borderStyle="solid"
																	borderWidth="6px 0 6px 10px" // Membentuk segitiga
																	borderColor="transparent transparent transparent red"
																/>
															</Box>
														</VStack>

														{/* Arrival Info */}
														<VStack gap={0} align={'flex-start'}>
															<Text fontSize={['sm', 'md']} fontWeight={'bold'}>
																{new Date(ticket.arrival.time).toLocaleTimeString([], {
																	hour: '2-digit',
																	minute: '2-digit',
																	hour12: false,
																	timeZone: 'UTC',
																})}
															</Text>
															<Text fontSize={['sm', 'md']}>{ticket.arrival.airport.code}</Text>
														</VStack>

														<img src={pack} alt="pack" />
													</HStack>

													{/* Price and Button */}
													<Grid gap={2} justifyItems="flex-end" mt={[4, 6]} minWidth="150px">
														<Text fontSize={['md', 'lg']} fontWeight="bold" color={ticket.discount ? 'red' : '#2078B8'} textAlign="end">
															IDR. {new Intl.NumberFormat('id-ID').format(ticket.totalPrice)}
														</Text>
														<Button
															onClick={() => handleSendSearch(ticket.id, ticket.departure.time)}
															bg={isButtonDisabled ? '#D3D3D3' : '#44B3F8'}
															px={[8, 10]}
															py={1}
															borderRadius={'md'}
															_hover={{ bg: '#2078B8' }}
															isDisabled={isButtonDisabled}
														>
															Pilih
														</Button>
													</Grid>
												</Flex>
											</Box>

											<AccordionItemContent borderTop="1px solid" borderColor="#A8B6B7">
												{/* Render setiap penerbangan dalam array flights */}
												{ticket.flights.map((flight, index) => (
													<Box pb={4} pt={6} key={`flight-${index}`}>
														<VStack align="flex-start" mb={4}>
															<Text fontSize="md" fontWeight="bold" color="#2078B8">
																Detail Penerbangan {index + 1}
															</Text>

															{/* Keberangkatan */}
															<HStack justify="space-between" align="start" w="100%" borderBottom="1px solid" borderColor="#A8B6B7" pb={6} pt={1}>
																<VStack align="start" gap={1} spacing={0}>
																	<Text fontSize="xl" fontWeight="bold">
																		{new Date(flight.departure.time).toLocaleTimeString([], {
																			hour: '2-digit',
																			minute: '2-digit',
																			hour12: false,
																			timeZone: 'UTC',
																		})}
																	</Text>
																	<Text fontSize="md">
																		{new Intl.DateTimeFormat('id-ID', {
																			day: '2-digit',
																			month: 'long',
																			year: 'numeric',
																			timeZone: 'UTC',
																		}).format(new Date(flight.departure.time))}
																	</Text>

																	<Text fontSize="md" fontWeight="semibold">
																		{flight.departure.airport.name}
																	</Text>
																</VStack>
																<Text fontSize="md" fontWeight="bold" alignSelf="start" color="#44B3F8" opacity={0.8}>
																	Keberangkatan
																</Text>
															</HStack>

															{/* Informasi Maskapai */}
															<HStack align="center" w="100%" borderBottom="1px solid" borderColor="#A8B6B7" pb={6} pt={3} gap={6}>
																<Image src={flight.airline.logo} alt="Airline logo" boxSize="40px" />
																<VStack align="start" gap={1} spacing={0}>
																	<Text fontSize="md" fontWeight="semibold">
																		{formatString(ticket.flights[0].airline.name)} - {formatString(ticket.class)}
																	</Text>
																	<Text fontSize="md" fontWeight="bold">
																		{flight.airplane}
																	</Text>
																	<Text fontSize="md" fontWeight="bold">
																		Informasi:
																	</Text>
																	<Text fontSize="md">Baggage {flight.baggage} kg</Text>
																	<Text fontSize="md">Cabin Baggage {flight.cabinBaggage} kg</Text>
																	<Text fontSize="md">{flight.class}</Text>
																</VStack>
															</HStack>

															{/* Kedatangan */}
															<HStack justify="space-between" align="start" w="100%" borderBottom="1px solid" borderColor="#A8B6B7" pb={6} pt={3}>
																<VStack align="start" gap={1} spacing={0}>
																	<Text fontSize="xl" fontWeight="bold">
																		{new Date(flight.arrival.time).toLocaleTimeString([], {
																			hour: '2-digit',
																			minute: '2-digit',
																			hour12: false,
																			timeZone: 'UTC',
																		})}
																	</Text>
																	<Text fontSize="md">
																		{new Intl.DateTimeFormat('id-ID', {
																			day: '2-digit',
																			month: 'long',
																			year: 'numeric',
																			timeZone: 'UTC',
																		}).format(new Date(flight.arrival.time))}
																	</Text>
																	<Text fontSize="md" fontWeight="semibold">
																		{flight.arrival.airport.name}
																	</Text>
																</VStack>
																<Text fontSize="md" fontWeight="bold" alignSelf="start" color="#44B3F8" opacity={0.8}>
																	Kedatangan
																</Text>
															</HStack>
														</VStack>

														{/* Tampilkan teks jika ada transit dan bukan penerbangan terakhir */}
														{index < ticket.flights.length - 1 && (
															<HStack fontSize="sm" fontWeight="semibold" mt={10} textAlign="start" gap={2} p={3} pl={5} border="1px solid #A8B6B7" borderRadius="md">
																<FontAwesomeIcon icon={faCircleInfo} color="#A8B6B7" />
																<Text color="#A8B6B7">
																	Transit di {flight.arrival.city.name}
																	{(() => {
																		const transitTime = new Date(ticket.flights[index + 1].departure.time) - new Date(flight.arrival.time);
																		const hours = Math.floor(transitTime / 3600000);
																		const minutes = Math.floor((transitTime % 3600000) / 60000);
																		return ` (${hours}h ${minutes}m)`;
																	})()}
																</Text>
															</HStack>
														)}
													</Box>
												))}
											</AccordionItemContent>
										</AccordionItem>
									</AccordionRoot>
								</Flex>
							))}
						</Box>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}

export default RouteComponent;
