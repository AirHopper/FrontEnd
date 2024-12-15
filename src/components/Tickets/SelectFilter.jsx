import { useState } from 'react';
import { Box, Text, Stack, HStack, List, Separator } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { CloseButton } from '../ui/close-button';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectFilter = ({ onCloseClick, onApplyFilter }) => {
	const [selectedItem, setSelectedItem] = useState(null); // State untuk item yang dipilih

	// Data list filter
	const filterOptions = [
		{ key: 'harga-termurah', label: 'Harga', subLabel: 'Termurah', orderBy: 'price_asc' },
		{ key: 'durasi-terpendek', label: 'Durasi', subLabel: 'Terpendek', orderBy: 'duration_asc' },
		{ key: 'keberangkatan-awal', label: 'Keberangkatan', subLabel: 'Paling Awal', orderBy: 'departure_soon' },
		{ key: 'keberangkatan-akhir', label: 'Keberangkatan', subLabel: 'Paling Akhir', orderBy: 'departure_late' },
		{ key: 'kedatangan-awal', label: 'Kedatangan', subLabel: 'Paling Awal', orderBy: 'arrival_soon' },
		{ key: 'kedatangan-akhir', label: 'Kedatangan', subLabel: 'Paling Akhir', orderBy: 'arrival_late' },
	];

	// Event handler untuk tombol Pilih
	const handleFilter = () => {
		if (selectedItem === null) return;

		const selectedKey = filterOptions[selectedItem]?.orderBy;

		// Update URL dengan parameter filter
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set('orderBy', selectedKey);
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		window.history.replaceState({}, '', newUrl);

		// Panggil fungsi untuk menerapkan filter
		onApplyFilter(selectedKey); // Kirim hasil ke komponen utama
		onCloseClick(); // Tutup komponen setelah filter
	};

	return (
		<Box position="fixed" inset="0" zIndex="9999">
			{/* Overlay */}
			<Box position="fixed" inset="0" bg="blackAlpha.600" zIndex="9998" onClick={onCloseClick} />

			{/* Modal */}
			<Box
				position="fixed"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="white"
				w={{ base: '90vw', md: '60vw', lg: '40vw' }} // Lebar responsif
				shadow="lg"
				borderRadius="xl"
				transition="all 0.3s ease"
				zIndex="9999"
			>
				<HStack px={5} justifyContent="end" borderBottomWidth="1px">
					<CloseButton onClick={onCloseClick} size="xl" borderRadius={0} />
				</HStack>

				<List.Root as={Stack} listStyle="none" cursor={'pointer'} gap={0}>
					{filterOptions.map((option, index) => (
						<List.Item
							key={index}
							px={5}
							_hover={{ bgColor: '#2078B8', color: 'white' }}
							bgColor={selectedItem === index ? '#2078B8' : 'transparent'}
							color={selectedItem === index ? 'white' : 'black'}
							onClick={() => setSelectedItem(index)} // Set item yang dipilih
						>
							<HStack px={2} justifyContent="space-between" alignItems="center">
								<Text py={3} fontSize={{ base: 'md', md: 'lg' }} fontWeight="bold">
									{option.label}{' '}
									<Text as="span" fontWeight="medium">
										- {option.subLabel}
									</Text>
								</Text>
								{selectedItem === index && <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: '20px', color: '#73CA5C' }} />}
							</HStack>
							<Separator />
						</List.Item>
					))}
				</List.Root>

				<HStack justifyContent="end" px={5}>
					<Button bgColor="#44b3f8" _hover={{ bgColor: '#2078b8' }} my={4} px={10} py={5} borderRadius="lg" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} onClick={handleFilter}>
						Pilih
					</Button>
				</HStack>
			</Box>
		</Box>
	);
};

export default SelectFilter;
