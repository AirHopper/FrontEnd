import { Box, Text, Button, HStack, VStack, Flex } from '@chakra-ui/react';
import logo from '../../assets/img/Image.png';

const DetailCard = ({ ticket }) => {
	if (!ticket) {
		return <Text>No ticket selected.</Text>;
	}

	return (
		<Box p={4} my={6}>
			{/* Header */}
			<Box display="flex" justifyContent="space-between" mb={4}>
				<Text fontSize={'lg'} fontWeight={'bold'}>
					Detail Pesanan
				</Text>
				<Text bg="green.400" color="white" borderRadius="2xl" px={4} py={1}>
					Issued
				</Text>
			</Box>

			{/* Booking Code */}
			<HStack mb={4}>
				<Text fontSize="lg" fontWeight="normal">
					Booking Code:{' '}
				</Text>
				<Text as="span" fontSize={'lg'} fontWeight="bold" color={'#2078B8'}>
					{'67igh23497'}
				</Text>
			</HStack>

			{/* Departure Details */}
			<HStack align={'start'} justify={'space-between'} mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
				<VStack gap={0} align="flex-start">
					<Text fontSize={'md'} fontWeight="bold">
						{new Date(ticket.departure.time).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
					<Text fontSize={'md'}>
						{new Date(ticket.departure.time).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{ticket.departure.airport.name}
					</Text>
				</VStack>
				<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
					Keberangkatan
				</Text>
			</HStack>

			{/* Information */}
			<HStack mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
				<Box pr={2}>
					<img src={logo} alt="Not Found" width={34} />
				</Box>
				<VStack align="start" gap={1}>
					<Text fontSize={'md'} fontWeight="bold" pb={3}>
						{ticket.airplane}
					</Text>
					<Text fontSize={'md'} fontWeight={'bold'}>
						Informasi :
					</Text>
					<Text fontSize={'md'} color={'#2078B8'}>
						Penumpang 1: Mr. Harry Potter
					</Text>
					<Text fontSize={'md'}>ID: 1234567</Text>
					<Text fontSize={'md'} color={'#2078B8'}>
						Penumpang 2: Miss Hermione
					</Text>
					<Text fontSize={'md'}>ID: 789658</Text>
				</VStack>
			</HStack>

			{/* Arrival Details */}

			<HStack align={'start'} justify={'space-between'} mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
				<VStack gap={0} align="flex-start">
					<Text fontSize={'md'} fontWeight="bold">
						{new Date(ticket.arrival.time).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
					<Text fontSize={'md'}>
						{new Date(ticket.arrival.time).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{ticket.arrival.airport.name}
					</Text>
				</VStack>
				<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
					Kedatangan
				</Text>
			</HStack>

			{/* Price Breakdown */}
			<Flex mb={4} borderBottom="1px solid #A8B6B7" pb={4} gap={2} flexDirection="column">
				<Text size="lg" fontWeight={'bold'} mb={1}>
					Rincian Harga
				</Text>
				<HStack align={'start'} justify={'space-between'}>
					<Text fontSize={'md'} fontWeight="normal">
						2 Adults
					</Text>
					<Text fontSize={'sm'}>IDR. {new Intl.NumberFormat('id-ID').format(ticket.price)}</Text>
				</HStack>
				<HStack align={'start'} justify={'space-between'}>
					<Text fontSize={'md'} fontWeight="normal">
						1 Baby
					</Text>
					<Text fontSize={'sm'}>IDR. {new Intl.NumberFormat('id-ID').format(ticket.price)}</Text>
				</HStack>
				<HStack align={'start'} justify={'space-between'}>
					<Text fontSize={'md'} fontWeight="normal">
						Tax
					</Text>
					<Text fontSize={'sm'}>IDR. {new Intl.NumberFormat('id-ID').format(ticket.price)}</Text>
				</HStack>
			</Flex>

			<HStack align={'start'} justify={'space-between'}>
				<Text fontSize={'lg'} fontWeight="bold">
					Total
				</Text>
				<Text fontSize={'xl'} fontWeight={'bold'} color={'#2078B8'}>
					IDR. {new Intl.NumberFormat('id-ID').format(ticket.totalPrice)}
				</Text>
			</HStack>

			{/* Print Ticket Button */}
			<Button colorScheme="purple" mt={6} width="100%" bg="#44B3F8" _hover={{ bg: '#2078B8', color: 'white' }} borderRadius={'lg'} py={6}>
				Cetak Tiket
			</Button>
		</Box>
	);
};

export default DetailCard;
