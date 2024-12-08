import * as React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Box, Container, Grid, Heading, Text, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getTicketsListing } from '../../services/ticketsListing';
import FilterDay from '../../components/tickets/FilterDay';
import { useState, useEffect } from 'react';
import notFoundTicket from '../../assets/img/notfoundflight.png';
import loadingImage from '../../assets/img/loading.png';
import pack from '../../assets/img/pack.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleInfo, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { useBreakpointValue } from '@chakra-ui/react';
import { HStack, VStack, Image, AccordionItem, AccordionRoot, AccordionItemTrigger, AccordionItemContent, Flex } from '@chakra-ui/react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SelectFilter from '../../components/tickets/SelectFilter';
import { Checkbox } from '@/components/ui/checkbox';

export const Route = createLazyFileRoute('/tickets/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [tickets, setTickets] = useState([]);
	const [selectedDay, setSelectedDay] = useState(0);
	const [activeAccordion, setActiveAccordion] = useState(null);
	const [isFilterOpen, setFilterOpen] = useState(false);
	const [isTransitFilter, setIsTransitFilter] = useState(false);

	// Ambil parameter URL
	const urlParams = new URLSearchParams(window.location.search);
	const params = {
		departureCity: urlParams.get('departure'),
		arrivalCity: urlParams.get('arrival'),
		classType: urlParams.get('classType'),
		flightDate: urlParams.get('departureDate'),
		orderBy: urlParams.get('orderBy') || 'price_asc',
		isTransit: urlParams.get('isTransit'),
	};

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ['tickets', params],
		queryFn: async () => {
			const response = await getTicketsListing(params);
			console.log(response);
			return response;
		},
		retry: 0,
	});

	useEffect(() => {
		if (Array.isArray(data)) {
			setTickets(data);
		}
	}, [data, isSuccess, params.flightDate]);

	useEffect(() => {
		const initialIsTransit = getIsTransitFromUrl();
		setIsTransitFilter(initialIsTransit);
	}, []);

	const updateTickets = selectedDate => {
		// Perbarui data tickets berdasarkan tanggal
		getTicketsListing({ ...params, flightDate: selectedDate }).then(data => {
			setTickets(data);
		});
	};

	const handleAccordionToggle = index => {
		setActiveAccordion(prev => (prev === index ? null : index));
	};

	const handleApplyFilter = filteredData => {
		setTickets(filteredData);
	};

	const getIsTransitFromUrl = () => {
		const urlParams = new URLSearchParams(window.location.search);
		const isTransit = urlParams.get('search[isTransit]');
		return isTransit === '1';
	};

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

	const handleCheckboxChange = (isDirectChecked, isTransitChecked) => {
		console.log('Langsung:', isDirectChecked, 'Transit:', isTransitChecked);

		let updatedIsTransit = null;

		if (isDirectChecked && isTransitChecked) {
			updatedIsTransit = null;
		} else if (isTransitChecked) {
			updatedIsTransit = '1';
		} else if (isDirectChecked) {
			updatedIsTransit = '0';
		} else {
			updatedIsTransit = null;
		}

		updateUrlParams('search[isTransit]', updatedIsTransit);

		setIsTransitFilter(isTransitChecked);
		const updatedParams = { ...params };
		if (updatedIsTransit !== null) {
			updatedParams.isTransit = updatedIsTransit;
		} else {
			delete updatedParams.isTransit;
		}

		getTicketsListing(updatedParams).then(data => {
			setTickets(data);
		});
	};

	return (
		<Container maxW={{ base: '100%', md: '90%', lg: '80%' }} py={6} minH="100vh">
			<Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold" textAlign={{ base: 'start', md: 'left' }}>
				Pilih Penerbangan
			</Heading>
			<Grid templateColumns={['1fr', '4fr 1fr']} gap={4} alignItems="center">
				<Button
					py={6}
					px={8}
					bg="#44B3F8"
					borderRadius="md"
					color="#FDFFFE"
					justifyContent="flex-start"
					gap={4}
					display="flex"
					flexDirection={['column', 'row']}
					fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
					_hover={{ bg: '#2078B8', color: '#FDFFFE' }}
				>
					<FontAwesomeIcon icon={faArrowLeft} size="sm" />
					<Text display={['block', 'inline']}>
						{params.departureCity || 'Kota Asal'}
						<FontAwesomeIcon icon={faGreaterThan} size="sm" />
						{params.arrivalCity || 'Kota Tujuan'} - {params.passengerCount || '1'} Penumpang - {params.classType || 'Kelas'}
					</Text>
				</Button>

				<Button p={6} bg="#F8D24D" _hover={{ bg: '#D4B340', color: '#FDFFFE' }} borderRadius="md" color="#FDFFFE" display={{ base: 'none', md: 'flex' }} justifyContent="center" fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}>
					Ubah Pencarian
				</Button>
			</Grid>

			{/* Filter Day */}
			<FilterDay selectedDay={selectedDay} setSelectedDay={setSelectedDay} paramsDate={params.flightDate} onUpdateTickets={updateTickets} />

			{/* Select Filter */}
			<Box textAlign="right" mt={4}>
				<Button onClick={() => setFilterOpen(true)} py={2} px={9} bg={'#FDFFFE'} border="1px solid #44B3F8" _hover={{ bg: '#2078B8', color: '#FDFFFE' }} color={'#44B3F8'}>
					Filter
				</Button>{' '}
			</Box>

			{isFilterOpen && <SelectFilter isFocused={isFilterOpen} onCloseClick={() => setFilterOpen(false)} tickets={tickets} onApplyFilter={handleApplyFilter} />}

			<Grid mt={8}>
				<Grid templateColumns={['1fr', '2fr 4fr']} gap={4} alignItems="flex-start">
					<Box display="flex" width="100%" borderWidth="1px" borderRadius="md" px={6} py={4} shadow="sm" height="auto">
						<AccordionRoot collapsible>
							<AccordionItem>
								<Box display="block" width="100%">
									{/* Header */}
									<Flex justify={'space-between'} alignItems="flex-start">
										<Text fontSize={'lg'} fontWeight={'semibold'}>
											Filter Lainnya
										</Text>
										<AccordionItemTrigger display={'inline-block'} width={'auto'} onClick={() => handleAccordionToggle()}>
											<Text cursor={'pointer'} display={'flex'} alignItems={'flex-start'}>
												<FontAwesomeIcon
													icon={faChevronUp}
													style={{
														transition: 'transform 0.3s',
														transform: activeAccordion ? 'rotate(180deg)' : 'rotate(0deg)',
													}}
												/>
											</Text>
										</AccordionItemTrigger>
									</Flex>

									{/* Accordion Content */}
									<AccordionItemContent>
										<Box display="flex" flexDirection="column" gap={4} py={4}>
											<Box display="flex" flexDirection="column" gap={4} py={4}>
												{/* Checkbox Langsung */}
												<Checkbox
													isChecked={!isTransitFilter} // Langsung
													onChange={e => handleCheckboxChange(e.target.checked, isTransitFilter)}
													colorScheme="blue"
												>
													Langsung
												</Checkbox>

												{/* Checkbox Transit */}
												<Checkbox
													isChecked={isTransitFilter} // Transit
													onChange={e => handleCheckboxChange(!e.target.checked, e.target.checked)} // Perbaiki
													colorScheme="blue"
												>
													Transit
												</Checkbox>
											</Box>
										</Box>
									</AccordionItemContent>
								</Box>
							</AccordionItem>
						</AccordionRoot>
					</Box>
					{/* Ticket Card */}
					{isLoading ? (
						<Box width="xs" textAlign="center" mx="auto" display="flex" flexDirection="column" alignItems="center">
							<Text pb={2}>Mencari Penerbangan Terbaik</Text>
							<Text p={2}>Loading...</Text>
							<Image src={loadingImage} alt="Not Found" width="70%" />
						</Box>
					) : isError ? (
						<Box width={'xs'} textAlign="center" mx="auto" display="flex" flexDirection="column">
							<img src={notFoundTicket} alt="Not Found" />
							<Text mt={6} fontSize="md" fontWeight="medium">
								Maaf, pencarian Anda tidak ditemukan
							</Text>
							<Text color="#2078B8" fontSize="md" fontWeight="medium">
								Coba cari perjalanan lainnya!
							</Text>
						</Box>
					) : (
						<Box>
							{tickets.map((ticket, index) => (
								<Flex gap={10} mb={6} key={ticket.id}>
									<AccordionRoot key={ticket.id} collapsible borderWidth="1px" borderRadius="md" px={6} pt={6} shadow="sm">
										<AccordionItem value={`ticket-${index}`}>
											<Box display="block" width="100%" pb={6}>
												{/* Header */}
												<Flex justify={'space-between'} flexDirection={['column-reverse', 'row']} mb={1}>
													<HStack justifyContent={'start'}>
														<Flex align={'center'} gap={6}>
															<Image src={ticket.flights[0].airline} alt="Airline logo" boxSize="40px" />
															<Text fontWeight="normal" fontSize={'md'}>
																{ticket.flights[0].airplane}
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
												<Flex justify="space-between" flexDirection={['column', 'row']} px={[0, 0]}>
													<HStack>
														{/* Departure Info */}
														<VStack gap={0} align={'flex-start'}>
															<Text fontSize={['sm', 'lg']} fontWeight={'bold'}>
																{new Date(ticket.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
															</Text>
															<Text fontSize={['sm', 'md']}>{ticket.departure.airport.code}</Text>
														</VStack>

														{/* Duration Info */}
														<VStack align="center" mx={[4, 6]} gap={1}>
															<Text fontWeight="normal" fontSize={'md'} color={'#A8B6B7'}>
																Direct
															</Text>
															<Box fontWeight="normal" fontSize={'md'} borderBottom="2px solid red" width={['100%', '14vw']} />
															<Text color={'#A8B6B7'}>
																{Math.floor(ticket.flights[0].duration / 60)}h {ticket.flights[0].duration % 60}m
															</Text>
														</VStack>

														{/* Arrival Info */}
														<VStack gap={0} align={'flex-start'} mr={4}>
															<Text fontSize={['sm', 'md']} fontWeight={'bold'}>
																{new Date(ticket.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
															</Text>
															<Text fontSize={['sm', 'md']}>{ticket.arrival.airport.code}</Text>
														</VStack>
														<img src={pack} alt="pack" />
													</HStack>

													{/* Price and Button */}
													<Grid gap={2} justifyItems="flex-end" mt={[4, 6]}>
														<Text fontSize={['md', 'lg']} fontWeight="bold" color="#2078B8" textAlign="end">
															IDR. {new Intl.NumberFormat('id-ID').format(ticket.totalPrice)}
														</Text>

														<Button bg={'#44B3F8'} px={[6, 10]} py={1} borderRadius={'md'} _hover={{ bg: '#2078B8' }}>
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
																		})}
																	</Text>
																	<Text fontSize="md">
																		{new Intl.DateTimeFormat('id-ID', {
																			day: '2-digit',
																			month: 'long',
																			year: 'numeric',
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
																<Image src={flight.airline} alt="Airline logo" boxSize="40px" />
																<VStack align="start" gap={1} spacing={0}>
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
																		})}
																	</Text>
																	<Text fontSize="md">
																		{new Intl.DateTimeFormat('id-ID', {
																			day: '2-digit',
																			month: 'long',
																			year: 'numeric',
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
																	Berhenti untuk Ganti Pesawat di {flight.arrival.city.name}
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
