import { Box, Text, HStack, VStack, Flex, Grid, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function HistoryCard({ orders, onSelectOrder, selectedOrderId }) {
	if (!orders || orders === 0) {
		return <Text>No order data available.</Text>;
	}

	return (
		<>
			{orders.map(order => {
				if (!order || !order.id) {
					return null;
				}
				return (
					<Box
						key={order.id}
						borderWidth="1px"
						borderRadius="md"
						p={{ base: 4, sm: 6 }}
						shadow="sm"
						cursor="pointer"
						gap={4}
						borderColor={selectedOrderId === order.id ? '#44B3F8' : 'transparent'}
						onClick={() => onSelectOrder(order)} // Send order data to onSelectOrder
						justify="space-between"
					>
						<Flex justify="space-between" flexDirection={['column-reverse', 'row']}>
							<HStack spacing={4} justifyContent="start">
								<Text bg={order.orderStatus === 'Unpaid' ? 'red.500' : order.orderStatus === 'Issued' ? 'green.500' : 'gray.500'} color="white" borderRadius="2xl" px={4} py={1}>
									{order.orderStatus}
								</Text>
							</HStack>
						</Flex>
						<Text fontSize={'md'} fontWeight="bold" color="#2078B8" w="100%" py={2} mt={2}>
							Tiket Pergi
						</Text>
						<Flex justify="space-between" flexDirection={['column', 'row']} borderBottom="1px solid #A8B6B7" pb={4} align={'center'} gap={{ base: 2, sm: 4, md: 6, lg: 8 }}>
							<HStack align="start" spacing={4} py={1}>
								<Box mt={1} mr={1}>
									<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
								</Box>
								<VStack gap={1} align="flex-start">
									<Text fontSize={'md'} fontWeight="bold">
										{order.outboundTicket.departure.city.name}
									</Text>
									<Text fontSize={'sm'}>
										{new Date(order.outboundTicket.departure.time).toLocaleDateString('id-ID', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
											hour12: false,
											timeZone: 'UTC',
										})}
									</Text>
									<Text fontSize={'sm'} fontWeight="bold">
										{new Date(order.outboundTicket.departure.time).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											hour12: false,
											timeZone: 'UTC',
										})}
									</Text>
								</VStack>
							</HStack>

							{/* Panah dengan Lebar Fleksibel */}
							<VStack spacing={2} align="center" flex="1" mx={[4, 0]} my={[3, 0]} fontSize={'sm'}>
								<Text color={'#A8B6B7'}>{`${String(Math.floor(order.outboundTicket.totalDuration / 60)).padStart(2, '0')}h ${String(order.outboundTicket.totalDuration % 60).padStart(2, '0')}m`}</Text>
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

							<HStack align="start" spacing={4} py={1}>
								<Box mt={1} mr={1}>
									<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
								</Box>
								<VStack gap={1} align="flex-start">
									<Text fontSize={'md'} fontWeight="bold">
										{order.outboundTicket.arrival.city.name}
									</Text>
									<Text fontSize={'sm'}>
										{new Date(order.outboundTicket.arrival.time).toLocaleDateString('id-ID', {
											day: '2-digit',
											month: 'long',
											year: 'numeric',
											hour12: false,
											timeZone: 'UTC',
										})}
									</Text>
									<Text fontSize={'sm'} fontWeight="bold">
										{new Date(order.outboundTicket.arrival.time).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
											hour12: false,
											timeZone: 'UTC',
										})}
									</Text>
								</VStack>
							</HStack>
						</Flex>

						{order.returnTicket && (
							<>
								<Text fontSize={'md'} fontWeight="bold" color="#2078B8" w="100%" py={2} mt={2}>
									Tiket Pulang
								</Text>
								<Flex justify="space-between" flexDirection={['column', 'row']} borderBottom="1px solid #A8B6B7" pb={4} align={'center'} gap={{ base: 2, sm: 4, md: 6, lg: 8 }}>
									<HStack align="start" spacing={4} py={1}>
										<Box mt={1} mr={1}>
											<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
										</Box>
										<VStack gap={1} align="flex-start">
											<Text fontSize={'md'} fontWeight="bold">
												{order.returnTicket.departure.city.name}
											</Text>
											<Text fontSize={'sm'}>
												{new Date(order.returnTicket.departure.time).toLocaleDateString('id-ID', {
													day: '2-digit',
													month: 'long',
													year: 'numeric',
													hour12: false,
													timeZone: 'UTC',
												})}
											</Text>
											<Text fontSize={'sm'} fontWeight="bold">
												{new Date(order.returnTicket.departure.time).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
													hour12: false,
													timeZone: 'UTC',
												})}
											</Text>
										</VStack>
									</HStack>

									{/* Panah dengan Lebar Fleksibel */}
									<VStack spacing={2} align="center" flex="1" mx={[4, 0]} my={[3, 0]} fontSize={'sm'}>
										<Text color={'#A8B6B7'}>{`${String(Math.floor(order.returnTicket.totalDuration / 60)).padStart(2, '0')}h ${String(order.returnTicket.totalDuration % 60).padStart(2, '0')}m`}</Text>
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

									<HStack align="start" spacing={4} py={1}>
										<Box mt={1} mr={1}>
											<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
										</Box>
										<VStack gap={1} align="flex-start">
											<Text fontSize={'md'} fontWeight="bold">
												{order.returnTicket.arrival.city.name}
											</Text>
											<Text fontSize={'sm'}>
												{new Date(order.returnTicket.arrival.time).toLocaleDateString('id-ID', {
													day: '2-digit',
													month: 'long',
													year: 'numeric',
													hour12: false,
													timeZone: 'UTC',
												})}
											</Text>
											<Text fontSize={'sm'} fontWeight="bold">
												{new Date(order.returnTicket.arrival.time).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
													hour12: false,
													timeZone: 'UTC',
												})}
											</Text>
										</VStack>
									</HStack>
								</Flex>
							</>
						)}

						<Grid templateColumns={['1fr', '2fr 1fr 2fr']} alignItems="center" gap={4} pt={4}>
							<VStack align="flex-start" gap={0}>
								<Text textAlign="left" fontSize={'sm'} fontWeight="bold">
									Booking Kode:
								</Text>
								<Text fontSize={'sm'}>{order.id}</Text>
							</VStack>

							<VStack align="flex-start" gap={0}>
								<Text textAlign="left" fontSize={'sm'} fontWeight="bold">
									Class:
								</Text>
								<Text textAlign="center" fontSize="sm" style={{ whiteSpace: 'nowrap' }}>
									{order?.outboundTicket?.class?.replace(/_/g, ' ')}
								</Text>
							</VStack>

							<Text fontSize={'md'} fontWeight="bold" color="#2078B8" textAlign="right">
								IDR. {new Intl.NumberFormat('id-ID').format(order.payment.amount)}
							</Text>
						</Grid>
					</Box>
				);
			})}
		</>
	);
}

export default HistoryCard;
