import React, { useState } from 'react';
import { Box, Text, Flex, Input, Stack, HStack, List, Separator } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { CloseButton } from '../ui/close-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
	const [isVisible, setIsVisible] = useState(true);

	const handleClose = () => {
		setIsVisible(false);
	};

	if (!isVisible) return null;
	return (
		<>
			<Box position="fixed" top={0} left={0} width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" zIndex="9" onClick={handleClose} />
			<Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" width="40vw" p="6" bg="white" shadow="lg" borderRadius="md" transition="all 0.3s ease" zIndex="10">
				<HStack px={5}>
					<Flex align="center" border="1px solid" borderColor="gray.300" borderRadius="md" px={2} py={1} bg="white">
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							style={{
								marginLeft: '10px',
								fontSize: '20px',
								color: 'gray.200',
							}}
						/>
						{/* Input field */}
						<Input variant="unstyled" placeholder="Search" width="25vw" pl={2} py={0} focusBorderColor="transparent" />
					</Flex>
					{/* Close Button */}
					<CloseButton onClick={handleClose} />
				</HStack>

				<List.Root as={Stack} listStyle="none">
					{/* Contoh Hasil Pencarian */}
					<List.Item _hover={{ bgColor: 'gray.300' }} px={5} mt={2}>
						<HStack justifyContent="space-between" alignItems="center">
							<Text py={2} cursor="default">
								Surabaya (SUB)
							</Text>
						</HStack>
						<Separator />
					</List.Item>
					<List.Item _hover={{ bgColor: 'gray.300' }} px={5} mt={2}>
						<HStack justifyContent="space-between" alignItems="center">
							<Text py={2} cursor="default">
								Jakarta (JKT)
							</Text>
						</HStack>
						<Separator />
					</List.Item>

					{/* Placeholder jika tidak ada hasil */}
					<Stack alignItems="center" mt={5}>
						<Text>Tidak ditemukan lokasi yang cocok</Text>
						<Text color="#44b3f8" mt={-2}>
							Coba cari lokasi lainnya
						</Text>
					</Stack>
				</List.Root>

				{/* History Pencarian */}
				<HStack justifyContent="space-between" mt={2} mb={2} px={5}>
					<Text fontWeight="semibold" fontSize="lg">
						Pencarian Terkini
					</Text>
					<Button fontWeight="semibold" variant="plain" color="red" pr={3}>
						Hapus
					</Button>
				</HStack>

				<List.Root as={Stack} gap="3" listStyle="none">
					<List.Item _hover={{ bgColor: 'gray.300' }} px={5}>
						<HStack justifyContent="space-between" alignItems="center">
							<Text mb={1} w="100%" cursor="default">
								Bali (DPS)
							</Text>
							<CloseButton variant="ghost" size="md" colorPalette="gray" borderRadius={0} />
						</HStack>
						<Separator />
					</List.Item>
					<List.Item _hover={{ bgColor: 'gray.300' }} px={5}>
						<HStack justifyContent="space-between" alignItems="center">
							<Text mb={1} w="100%" cursor="default">
								Makassar (UPG)
							</Text>
							<CloseButton variant="ghost" size="md" colorPalette="gray" borderRadius={0} />
						</HStack>
						<Separator />
					</List.Item>
				</List.Root>
			</Box>
		</>
	);
};

export default Search;
