import React from 'react';
import { Box, Text, Button, HStack, VStack, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'react-toastify';

const DetailCard = ({ order }) => {
	const navigate = useNavigate();

	if (!order) {
		return <Text>No order selected.</Text>;
	}

	const handlePayment = () => {
		if (order?.id) {
			navigate({
				to: '/payment',
				state: { orderId: order.id },
			});
		} else {
			toast.error('Token pembayaran tidak tersedia.');
		}
	};

	return (
		<Box p={4} my={6}>
			{/* Header */}
			<Box display="flex" justifyContent="space-between" mb={4}>
				<Text fontSize={'lg'} fontWeight={'bold'}>
					Detail Pesanan
				</Text>
				<Text bg={order.orderStatus === 'Unpaid' ? 'red.500' : order.orderStatus === 'Issued' ? 'green.400' : 'gray.400'} color="white" borderRadius="2xl" px={4} py={1}>
					{order.orderStatus}
				</Text>
			</Box>
			<Text fontSize="lg" fontWeight="bold" mb={2}>
				Detail Tiket Pergi
			</Text>
			{/* Booking Code */}
			<HStack mb={4}>
				<Text fontSize="lg" fontWeight="normal">
					Booking Code:{' '}
				</Text>
				<Text as="span" fontSize={'lg'} fontWeight="bold" color={'#2078B8'}>
					{order.id}
				</Text>
			</HStack>

			{/* Departure Details */}
			<HStack align={'start'} justify={'space-between'} mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
				<VStack gap={0} align="flex-start">
					<Text fontSize={'md'} fontWeight="bold">
						{new Date(order.outboundTicket.departure.time).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
					<Text fontSize={'md'}>
						{new Date(order.outboundTicket.departure.time).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{order.outboundTicket.departure.airport.name}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{order.outboundTicket.flights[0].departure.terminal.name} - {order.outboundTicket.flights[0].departure.terminal.type}
					</Text>
				</VStack>
				<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
					Keberangkatan
				</Text>
			</HStack>

			{/* Gambar Airline dan Pesawat */}
			<HStack gap={4}>
				<Image src={order.outboundTicket.flights[0].airline.logo} alt={order.outboundTicket.flights[0].airline.name} boxSize="50px" />
				<VStack align={'start'} mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
					<VStack align="flex-start">
						<Text fontSize="md" fontWeight="bold">
							{order.outboundTicket.flights[0].airline.name}
						</Text>
						<Text fontSize="md">Pesawat: {order.outboundTicket.flights[0].airplane}</Text>
					</VStack>
					{/* Passengers Information */}
					<VStack align="flex-start" mb={4}>
						<Text fontSize="lg" fontWeight="bold">
							Informasi Penumpang
						</Text>
						{order.passengers.map((passenger, index) => (
							<VStack align={'start'} key={index} fontSize="md">
								<Text>
									Penumpang {index + 1}: {passenger.title} {passenger.name} {passenger.familyName}
								</Text>
								<Text>ID: {passenger.identifierNumber}</Text>
							</VStack>
						))}
					</VStack>
				</VStack>
			</HStack>

			{/* Arrival Details */}
			<HStack align={'start'} justify={'space-between'} mb={4} borderBottom="1px solid #A8B6B7" pb={4}>
				<VStack gap={0} align="flex-start">
					<Text fontSize={'md'} fontWeight="bold">
						{new Date(order.outboundTicket.arrival.time).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
					<Text fontSize={'md'}>
						{new Date(order.outboundTicket.arrival.time).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{order.outboundTicket.arrival.airport.name}
					</Text>
					<Text fontSize={'md'} fontWeight="normal">
						{order.outboundTicket.flights[0].arrival.terminal.name} - {order.outboundTicket.flights[0].arrival.terminal.type}
					</Text>
				</VStack>
				<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
					Kedatangan
				</Text>
			</HStack>

			{/* Render Return Ticket Details only if isRoundTrip is true */}
			{order.isRoundTrip && order.returnTicket && (
				<Box borderBottom="1px solid #A8B6B7" pb={4} mb={4}>
					<Text fontSize="lg" fontWeight="bold" mb={2}>
						Detail Tiket Pulang
					</Text>
					<HStack align={'start'} justify={'space-between'} mb={4}>
						<VStack gap={0} align="flex-start">
							<Text fontSize={'md'} fontWeight="bold">
								{new Date(order.returnTicket.departure.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</Text>
							<Text fontSize={'md'}>
								{new Date(order.returnTicket.departure.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
								})}
							</Text>
							<Text fontSize={'md'} fontWeight="normal">
								{order.returnTicket.departure.airport.name}
							</Text>
							<Text fontSize={'md'} fontWeight="normal">
								{order.returnTicket.flights[0].departure.terminal.name} - {order.returnTicket.flights[0].departure.terminal.type}
							</Text>
						</VStack>
						<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
							Keberangkatan
						</Text>
					</HStack>

					<HStack align={'start'} justify={'space-between'} mb={4}>
						<VStack gap={0} align="flex-start">
							<Text fontSize={'md'} fontWeight="bold">
								{new Date(order.returnTicket.arrival.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</Text>
							<Text fontSize={'md'}>
								{new Date(order.returnTicket.arrival.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
								})}
							</Text>
							<Text fontSize={'md'} fontWeight="normal">
								{order.returnTicket.arrival.airport.name}
							</Text>
							<Text fontSize={'md'} fontWeight="normal">
								{order.returnTicket.flights[0].arrival.terminal.name} - {order.returnTicket.flights[0].arrival.terminal.type}
							</Text>
						</VStack>
						<Text fontSize={'sm'} fontWeight={'bold'} color={'#70CAFF'}>
							Kedatangan
						</Text>
					</HStack>
				</Box>
			)}

			{/* Price Breakdown */}
			<Flex mb={4} borderBottom="1px solid #A8B6B7" pb={4} gap={2} flexDirection="column">
				<Text size="lg" fontWeight={'bold'} mb={1}>
					Rincian Harga
				</Text>
				{order.detailPrice.map((item, index) => (
					<HStack key={index} align={'start'} justify={'space-between'}>
						<Text fontSize={'md'} fontWeight="normal">
							({item.amount}) {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
						</Text>
						<Text fontSize={'sm'}>IDR. {new Intl.NumberFormat('id-ID').format(item.totalPrice)}</Text>
					</HStack>
				))}
				<HStack align={'start'} justify={'space-between'}>
					<Text fontSize={'md'} fontWeight="normal">
						Tax
					</Text>
					<Text fontSize={'sm'}>IDR. {new Intl.NumberFormat('id-ID').format(order.detailPrice.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0))}</Text>
				</HStack>
			</Flex>

			<HStack align={'start'} justify={'space-between'}>
				<Text fontSize={'lg'} fontWeight="bold">
					Total
				</Text>
				<Text fontSize={'xl'} fontWeight={'bold'} color={'#2078B8'}>
					IDR. {new Intl.NumberFormat('id-ID').format(parseFloat(order.payment.amount))}
				</Text>
			</HStack>

			{/* Conditional Buttons */}
			{order.orderStatus === 'Unpaid' && (
				<Button colorScheme="purple" mt={8} width="100%" bg="#44B3F8" _hover={{ bg: '#2078B8', color: 'white' }} borderRadius={'lg'} py={6} onClick={handlePayment}>
					Lanjut Bayar
				</Button>
			)}
			{order.orderStatus === 'Unpaid' && (
				<Button colorScheme="red" mt={4} width="100%" borderRadius={'lg'} py={6} bg="gray.400" _hover={{ bg: 'red.500' }}>
					Batalkan Pemesanan
				</Button>
			)}
			{order.orderStatus === 'Issued' && (
				<Button colorScheme="green" mt={8} width="100%" bg="#44B3F8" _hover={{ bg: '#2078B8', color: 'white' }} borderRadius={'lg'} py={6}>
					Cetak Tiket
				</Button>
			)}
			{order.orderStatus === 'Cancelled' ? null : null}
		</Box>
	);
};

export default DetailCard;
