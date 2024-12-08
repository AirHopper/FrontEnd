import React, { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Button, Container, Grid, Heading, Spinner, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HistoryCard from '../../components/History/HistoryCard';
import { useQuery } from '@tanstack/react-query';
import DetailCard from '../../components/History/DetailCard';
import DatePicker from '../../components/History/DatePicker';
import Search from '../../components/History/Search';
import { getHistory } from '../../services/history';

export const Route = createLazyFileRoute('/history/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedTicket, setSelectedTicket] = useState(null);
	const [selectedTicketId, setSelectedTicketId] = useState(null);

	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const {
		data: ticket,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['history'],
		queryFn: getHistory,
	});

	console.log('Tickets data:', ticket);

	if (isLoading) {
		return (
			<Box textAlign="center" py={10}>
				<Spinner size="lg" color="#44B3F8" />
				<Text mt={4}>Memuat data penerbangan...</Text>
			</Box>
		);
	}

	if (error) {
		return (
			<Box textAlign="center" py={10}>
				<Text color="red.500">Gagal memuat data penerbangan</Text>
			</Box>
		);
	}

	const handleSelectTicket = ticket => {
		setSelectedTicket(ticket);
		setSelectedTicketId(ticket.id);
	};
	console.log('Selected Ticket ID in Route:', selectedTicketId);

	const toggleDatePicker = () => {
		setIsPickerOpen(prevState => !prevState);
	};

	const toggleSearch = () => {
		setIsSearchOpen(prevState => !prevState);
	};

	return (
		<Container maxW="10/12" py={6}>
			<Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold">
				Pilih Penerbangan
			</Heading>
			<Grid templateColumns={['1fr', '14fr 2fr 1fr']} gap={4} alignItems="center">
				<Button py={6} px={8} bg="#44B3F8" borderRadius="lg" color="#FDFFFE" justifyContent="flex-start" gap={4} display="flex" flexDirection={['column', 'row']}>
					<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					Beranda
				</Button>

				{/* Tombol Filter yang membuka DatePicker */}
				<Button py={6} px={8} borderRadius={'lg'} borderColor={'#44B3F8'} bg="#FDFFFE" color={'#44B3F8'} onClick={toggleDatePicker}>
					<FontAwesomeIcon icon={faFilter} color="#44B3F8" size="2xl" m={0} p={0} /> Filter
				</Button>

				{/* Tombol yang membuka Search */}
				<Button py={6} borderRadius={'lg'} borderColor={'#44B3F8'} bg="#FDFFFE" color={'#44B3F8'} onClick={toggleSearch}>
					<FontAwesomeIcon icon={faMagnifyingGlass} color="#44B3F8" size="2xl" />
				</Button>
			</Grid>

			{/* Menampilkan Search ketika isSearchOpen true */}
			{isSearchOpen && <Search />}

			{/* Menampilkan DatePicker ketika isPickerOpen true */}
			{isPickerOpen && <DatePicker setIsPickerOpen={setIsPickerOpen} />}

			<Grid templateColumns={['1fr', '6fr 5fr']} gap={4} justifyContent={'space-between'} mt={8} mx={4}>
				<Box>
					<Text fontSize={'xl'} fontWeight={'bold'}>
						Maret 2023
					</Text>
					<Grid gap={4} pt={2}>
						<HistoryCard tickets={ticket} onSelectTicket={handleSelectTicket} selectedTicketId={selectedTicketId} />
					</Grid>
				</Box>
				{selectedTicket && <DetailCard ticket={selectedTicket} />}
			</Grid>
		</Container>
	);
}

export default RouteComponent;
