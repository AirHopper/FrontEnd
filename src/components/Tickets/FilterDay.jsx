import React, { useEffect } from 'react';
import { Button, Flex, Grid, Text, Box } from '@chakra-ui/react';

import { toast } from 'react-toastify'; // Make sure to install react-toastify

const FilterDay = ({ selectedDay, setSelectedDay, paramsDate, onUpdateTickets, flightDate, setIsButtonDisabled }) => {
	const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

	// Format paramsDate to 'YYYY-MM-DD'
	const formattedParamsDate = paramsDate ? new Date(paramsDate).toISOString().split('T')[0] : null;
	const formattedFlightDate = flightDate ? new Date(flightDate).toISOString().split('T')[0] : null;

	const reqDate = formattedParamsDate && !isNaN(new Date(formattedParamsDate)) ? new Date(formattedParamsDate) : new Date();

	const generateDates = (startDate, count = 7, offset = 2) => {
		const start = new Date(startDate);
		start.setDate(start.getDate() - offset);

		return Array.from({ length: count + offset }, (_, i) => {
			const date = new Date(start);
			date.setDate(start.getDate() + i);
			return date;
		});
	};

	const dates = generateDates(reqDate, 7, 2);

	useEffect(() => {
		const initialSelectedDay = dates.findIndex(date => date.toDateString() === reqDate.toDateString());
		if (initialSelectedDay !== -1) {
			setSelectedDay(initialSelectedDay);
		}
	}, [reqDate, dates, setSelectedDay]);

	useEffect(() => {
		if (formattedParamsDate && formattedFlightDate && formattedParamsDate < formattedFlightDate) {
			toast.warn('Tanggal pulang harus setelah tanggal pergi!');
			setIsButtonDisabled(true); // Mengubah isButtonDisabled menjadi true
		} else {
			setIsButtonDisabled(false); // Mengubah isButtonDisabled menjadi false
		}
	}, [formattedParamsDate, formattedFlightDate, setIsButtonDisabled]);

	const handleDayClick = index => {
		const selectedDate = new Date(dates[index]).toISOString().split('T')[0];

		// Update URL
		const newUrl = new URL(window.location);
		newUrl.searchParams.set('departureDate', selectedDate);
		window.history.pushState({}, '', newUrl);

		// Trigger fetch
		onUpdateTickets(selectedDate);
		setSelectedDay(index);
	};

	const offsetIndex = Math.max(0, Math.min(selectedDay - 1, dates.length - 7));

	return (
		<Box overflowX={['scroll', 'scroll', 'hidden']} width="100%">
			<Grid templateColumns={['repeat(7, minmax(100px, 1fr))', 'repeat(7, minmax(100px, 1fr))', 'repeat(7, 1fr)']} gap={4} display="grid" justifyContent={['start', 'start', 'space-between']} pt={4} overflowX={['scroll', 'scroll', 'unset']}>
				{dates.slice(offsetIndex, offsetIndex + 7).map((date, index) => (
					<Button
						key={index}
						bg={index + offsetIndex === selectedDay ? '#44B3F8' : 'transparent'}
						color={index + offsetIndex === selectedDay ? '#FDFFFE' : 'black'}
						borderRadius="md"
						textAlign="center"
						border="1px solid #A8B6B7"
						_hover={{ bg: '#2078B8', color: '#FDFFFE' }}
						onClick={() => handleDayClick(index + offsetIndex)}
						py={5}
						fontSize="md"
						flexShrink={0}
						width={['100px', '120px', 'auto']}
					>
						<Flex direction="column" align="center" justify="center" width="100%" px={2} gap={0}>
							<Text fontSize="md" fontWeight="semibold">
								{days[(date.getDay() + 6) % 7]}
							</Text>
							<Text fontSize="sm" fontWeight="normal">
								{date.toLocaleDateString('id-ID', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})}
							</Text>
						</Flex>
					</Button>
				))}
			</Grid>
		</Box>
	);
};

export default FilterDay;
