import React from 'react';
import { Box, Text, Button, HStack, VStack, Flex, Image } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const DetailCard = ({ order, onCancelBooking, onPayment }) => {
	if (!order) {
		return <Text>No order selected.</Text>;
	}

	return (
		<Box p={{ base: 2, sm: 4 }} my={6}>
			{/* Header */}
			<HStack display="flex" justifyContent="space-between" mb={2}>
				<VStack gap={0} align={'start'}>
					<Text fontSize={['md', 'lg']} fontWeight="bold">
						Detail Pesanan
					</Text>
					<Text>
						{new Date(order.bookingDate).toLocaleDateString('id-ID', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
							timeZone: 'UTC',
						})}
					</Text>
				</VStack>
				<Text bg={order.orderStatus === 'Unpaid' ? 'red.500' : order.orderStatus === 'Issued' ? 'green.400' : 'gray.400'} color="white" borderRadius="2xl" px={4} py={1} fontSize={['xs', 'sm', 'md']}>
					{order.orderStatus}
				</Text>
			</HStack>

			<Text fontSize="lg" fontWeight="bold" mb={2}>
				Detail Tiket Pergi
			</Text>
			{/* Booking Code */}
			<HStack mb={4}>
				<Text fontSize={['sm', 'lg']} fontWeight="normal">
					Booking Code:{' '}
				</Text>
				<Text as="span" fontSize={['sm', 'lg']} fontWeight="bold" color={'#2078B8'}>
					{order.id}
				</Text>
			</HStack>

			{/* Departure Flights Details */}
			{order.outboundTicket.flights.length > 0 &&
				order.outboundTicket.flights.map((flight, index) => (
					<VStack key={index} gap={4} mb={4} align="start" borderBottom="1px solid #A8B6B7" pb={4}>
						{/* Departure Details */}
						<HStack align="start" justify="space-between" width="100%">
							<Text fontSize={['sm', 'md']} fontWeight="bold">
								{new Date(flight.departure.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['xs', 'md']} fontWeight={'bold'} color={'#70CAFF'}>
								Keberangkatan
							</Text>
						</HStack>
						<VStack align="flex-start" gap={1}>
							<Text fontSize={['sm', 'md']}>
								{new Date(flight.departure.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.departure.airport.name}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.departure.terminal.name} - {flight.departure.terminal.type}
							</Text>
						</VStack>

						{/* Airline Image and Flight Info */}
						<HStack gap={4} mt={2}>
							<Image src={flight.airline.logo} alt={flight.airline.name} boxSize="50px" />
							<VStack align={'start'} gap={1}>
								<Text fontSize={['sm', 'md']} fontWeight="bold">
									{flight.airline.name}
								</Text>
								<Text fontSize={['sm', 'md']}>Pesawat: {flight.airplane}</Text>
							</VStack>
						</HStack>

						{/* Arrival Details */}
						<HStack align="start" justify="space-between" width="100%">
							<Text fontSize={['sm', 'md']} fontWeight="bold">
								{new Date(flight.arrival.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['xs', 'md']} fontWeight={'bold'} color={'#70CAFF'}>
								Kedatangan
							</Text>
						</HStack>
						<VStack align="flex-start" gap={1}>
							<Text fontSize={['sm', 'md']}>
								{new Date(flight.arrival.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.arrival.airport.name}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.arrival.terminal.name} - {flight.arrival.terminal.type}
							</Text>
						</VStack>

						{/* Tampilkan teks jika ada transit dan bukan penerbangan terakhir */}
						{index < order.outboundTicket.flights.length - 1 && (
							<HStack fontSize="sm" fontWeight="semibold" textAlign="start" gap={3} p={3} pl={5} border="1px solid #A8B6B7" borderRadius="md" width={'full'}>
								<FontAwesomeIcon icon={faCircleInfo} color="#A8B6B7" />
								<Text color="#A8B6B7">
									Transit di {flight.arrival.city.name}
									{(() => {
										// Ambil waktu transit berdasarkan arrival dan departure berikutnya
										const currentArrivalTime = new Date(flight.arrival.time); // Waktu kedatangan saat ini
										const nextDepartureTime = new Date(order.outboundTicket.flights[index + 1].departure.time); // Waktu keberangkatan penerbangan berikutnya
										const transitTime = nextDepartureTime - currentArrivalTime;

										// Konversi waktu transit ke jam dan menit
										const hours = Math.floor(transitTime / 3600000); // Konversi ms ke jam
										const minutes = Math.floor((transitTime % 3600000) / 60000); // Sisa ms ke menit

										return ` (${hours}h ${minutes}m)`;
									})()}
								</Text>
							</HStack>
						)}
					</VStack>
				))}

			{/* Return Flights Details */}
			{order.isRoundTrip &&
				order.returnTicket &&
				order.returnTicket.flights.length > 0 &&
				order.returnTicket.flights.map((flight, index) => (
					<VStack key={index} gap={4} mb={4} align="start" borderBottom="1px solid #A8B6B7" pb={4}>
						<Text fontSize={['md', 'lg']} fontWeight="bold" mb={0}>
							Detail Tiket Pulang
						</Text>
						{/* Departure Details */}
						<HStack align="start" justify="space-between" width="100%">
							<Text fontSize={['sm', 'md']} fontWeight="bold">
								{new Date(flight.departure.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['xs', 'md']} fontWeight={'bold'} color={'#70CAFF'}>
								Keberangkatan
							</Text>
						</HStack>
						<VStack align="flex-start" gap={1}>
							<Text fontSize={['sm', 'md']}>
								{new Date(flight.departure.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.departure.airport.name}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.departure.terminal.name} - {flight.departure.terminal.type}
							</Text>
						</VStack>

						{/* Airline Image and Flight Info */}
						<HStack gap={4} mt={2}>
							<Image src={flight.airline.logo} alt={flight.airline.name} boxSize="50px" />
							<VStack align={'start'} gap={1}>
								<Text fontSize={['sm', 'md']} fontWeight="bold">
									{flight.airline.name}
								</Text>
								<Text fontSize={['sm', 'md']}>Pesawat: {flight.airplane}</Text>
							</VStack>
						</HStack>

						{/* Arrival Details */}
						<HStack align="start" justify="space-between" width="100%">
							<Text fontSize={['sm', 'md']} fontWeight="bold">
								{new Date(flight.arrival.time).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['xs', 'md']} fontWeight={'bold'} color={'#70CAFF'}>
								Kedatangan
							</Text>
						</HStack>
						<VStack align="flex-start" gap={1}>
							<Text fontSize={['sm', 'md']}>
								{new Date(flight.arrival.time).toLocaleDateString('id-ID', {
									day: '2-digit',
									month: 'long',
									year: 'numeric',
									hour12: false,
									timeZone: 'UTC',
								})}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.arrival.airport.name}
							</Text>
							<Text fontSize={['sm', 'md']} fontWeight="semibold">
								{flight.arrival.terminal.name} - {flight.arrival.terminal.type}
							</Text>
						</VStack>

						{/* Tampilkan teks jika ada transit dan bukan penerbangan terakhir */}
						{index < order.returnTicket.flights.length - 1 && (
							<HStack fontSize="sm" fontWeight="semibold" textAlign="start" gap={3} p={3} pl={5} border="1px solid #A8B6B7" borderRadius="md" width={'full'}>
								<FontAwesomeIcon icon={faCircleInfo} color="#A8B6B7" />
								<Text color="#A8B6B7">
									Transit di {flight.arrival.city.name}
									{(() => {
										// Ambil waktu transit berdasarkan arrival dan departure berikutnya
										const currentArrivalTime = new Date(flight.arrival.time); // Waktu kedatangan saat ini
										const nextDepartureTime = new Date(order.returnTicket.flights[index + 1].departure.time); // Waktu keberangkatan penerbangan berikutnya
										const transitTime = nextDepartureTime - currentArrivalTime;

										// Konversi waktu transit ke jam dan menit
										const hours = Math.floor(transitTime / 3600000); // Konversi ms ke jam
										const minutes = Math.floor((transitTime % 3600000) / 60000); // Sisa ms ke menit

										return ` (${hours}h ${minutes}m)`;
									})()}
								</Text>
							</HStack>
						)}
					</VStack>
				))}

			{/* Price Breakdown */}
			<Flex mb={4} borderBottom="1px solid #A8B6B7" pb={4} gap={2} flexDirection="column">
				<Text fontSize={['md', 'lg']} fontWeight={'bold'} mb={1}>
					Rincian Harga
				</Text>
				{order.detailPrice.map((item, index) => (
					<HStack key={index} align={'start'} justify={'space-between'}>
						<Text fontSize={['sm', 'md']} fontWeight="normal">
							({item.amount}) {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
						</Text>
						<Text fontSize={['sm', 'md']}>IDR. {new Intl.NumberFormat('id-ID').format(item.totalPrice)}</Text>
					</HStack>
				))}
				<HStack align={'start'} justify={'space-between'}>
					<Text fontSize={['sm', 'md']} fontWeight="normal">
						Tax
					</Text>
					<Text fontSize={['sm', 'md']}></Text>
				</HStack>
			</Flex>

			<HStack align={'start'} justify={'space-between'}>
				<Text fontSize={['md', 'lg']} fontWeight="bold">
					Total
				</Text>
				<Text fontSize={['md', 'lg']} fontWeight={'bold'} color={'#2078B8'}>
					IDR. {new Intl.NumberFormat('id-ID').format(parseFloat(order.payment.amount))}
				</Text>
			</HStack>

			{/* Conditional Buttons */}
			{order.orderStatus === 'Unpaid' && (
				<>
					<Button colorScheme="purple" mt={8} width="100%" bg="#44B3F8" _hover={{ bg: '#2078B8', color: 'white' }} borderRadius={'lg'} py={6} onClick={onPayment}>
						Lanjut Bayar
					</Button>

					<Button colorScheme="red" mt={4} width="100%" borderRadius={'lg'} py={6} bg="gray.400" _hover={{ bg: 'red.500' }} onClick={() => onCancelBooking(order)}>
						Batalkan Pemesanan
					</Button>
				</>
			)}
			{order.orderStatus === 'Issued' ? (
				<Button colorScheme="green" mt={8} width="100%" bg="#44B3F8" _hover={{ bg: '#2078B8', color: 'white' }} borderRadius={'lg'} py={6} onClick={() => handlePrintPDF(order.pdfUrl)}>
					Cetak Tiket
				</Button>
			) : (
				<></>
			)}
		</Box>
	);
};

export default DetailCard;
