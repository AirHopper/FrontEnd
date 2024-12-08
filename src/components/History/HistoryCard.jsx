import { Box, Text, HStack, VStack, Flex, Grid } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function HistoryCard({ tickets, onSelectTicket, selectedTicketId }) {
	console.log('tickets prop in HistoryCard:', tickets);

	if (!tickets || !Array.isArray(tickets)) {
		return <Text>No ticket data available.</Text>;
	}

	return (
		<>
			{tickets.map(ticket => (
				<Box key={ticket.id} borderWidth="1px" borderRadius="md" p={6} shadow="sm" cursor="pointer" gap={4} borderColor={selectedTicketId === ticket.id ? '#44B3F8' : 'transparent'} onClick={() => onSelectTicket(ticket)}>
					{console.log(`Ticket ID: ${ticket.id}, Selected Ticket ID: ${selectedTicketId}`)}
					<Flex justify="space-between" flexDirection={['column-reverse', 'row']}>
						<HStack spacing={4} justifyContent="start">
							<Text bg="green.400" color="white" borderRadius="2xl" px={4} py={1}>
								Issued
							</Text>
						</HStack>
					</Flex>

					<Flex justify="space-between" flexDirection={['column', 'row']} borderBottom="1px solid #A8B6B7" py={4} align={'center'}>
						<HStack align="start" spacing={4}>
							<Box mt={1} mr={1}>
								<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
							</Box>
							<VStack gap={1} align="flex-start">
								<Text fontSize={'md'} fontWeight="bold">
									{ticket.departure.city.name}
								</Text>
								<Text fontSize={'sm'}>
									{new Date(ticket.departure.time).toLocaleDateString('id-ID', {
										day: '2-digit',
										month: 'long',
										year: 'numeric',
									})}
								</Text>
								<Text fontSize={'sm'} fontWeight="bold">
									{new Date(ticket.departure.time).toLocaleTimeString([], {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</Text>
							</VStack>
						</HStack>

						<VStack spacing={2} align="center" mx={[4, 0]} fontSize={'sm'}>
							{`${Math.floor((new Date(ticket.arrival.time) - new Date(ticket.departure.time)) / 60000 / 60)}h ${((new Date(ticket.arrival.time) - new Date(ticket.departure.time)) / 60000) % 60}m`}
							<Box borderBottom="2px solid red" width={['100%', '10vw']} />
						</VStack>

						<HStack align="start" spacing={4}>
							<Box mt={1} mr={1}>
								<FontAwesomeIcon icon={faLocationDot} color="#A8B6B7" size="xl" />
							</Box>
							<VStack gap={1} align="flex-start">
								<Text fontSize={'md'} fontWeight="bold">
									{ticket.arrival.city.name}
								</Text>
								<Text fontSize={'sm'}>
									{new Date(ticket.arrival.time).toLocaleDateString('id-ID', {
										day: '2-digit',
										month: 'long',
										year: 'numeric',
									})}
								</Text>
								<Text fontSize={'sm'} fontWeight="bold">
									{new Date(ticket.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
								</Text>
							</VStack>
						</HStack>
					</Flex>

					<Grid templateColumns={['1fr', '2fr 1fr 2fr']} alignItems="center" gap={4} pt={4}>
						<VStack align="flex-start" gap={0}>
							<Text textAlign="left" fontSize={'sm'} fontWeight="bold">
								Booking Kode:
							</Text>
							<Text fontSize={'sm'}>13o75hsf</Text>
						</VStack>

						<VStack align="flex-start" gap={0}>
							<Text textAlign="left" fontSize={'sm'} fontWeight="bold">
								Class:
							</Text>
							<Text fontSize={'sm'}>{ticket.class}</Text>
						</VStack>

						<Text fontSize={'md'} fontWeight="bold" color="#2078B8" textAlign="right">
							IDR. {new Intl.NumberFormat('id-ID').format(ticket.totalPrice)}
						</Text>
					</Grid>
				</Box>
			))}
		</>
	);
}

export default HistoryCard;
