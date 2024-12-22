import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Input, HStack, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CloseButton } from '@/components/ui/close-button';
import { fetchRecommendations } from '../../services/history';

const Search = ({ setIsSearchOpen, onSearch, orderId }) => {
	const [orderIdState, setOrderIdState] = useState(orderId || '');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [recentSearches, setRecentSearches] = useState([]);

	const [debouncedOrderId, setDebouncedOrderId] = useState(orderIdState);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedOrderId(orderIdState);
		}, 500);

		return () => clearTimeout(timer);
	}, [orderIdState]);

	// Fetch recommendations from the backend
	useEffect(() => {
		if (debouncedOrderId) {
			fetchRecommendations(debouncedOrderId, setIsLoading, setError, setSuggestions);
		} else {
			setSuggestions([]);
		}
	}, [debouncedOrderId]);

	// SImpan recent searches to localStorage
	const saveRecentSearches = newSearch => {
		let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

		if (!searches.includes(newSearch)) {
			searches.unshift(newSearch);
		}

		searches = searches.slice(0, 5);

		localStorage.setItem('recentSearches', JSON.stringify(searches));
		setRecentSearches(searches);
	};

	useEffect(() => {
		const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
		setRecentSearches(storedSearches);
	}, []);

	const handleRecentSearch = search => {
		setOrderIdState(search);
		onSearch(search);
		saveRecentSearches(search);
		setIsSearchOpen(true);
	};

	const handleDeleteSearch = search => {
		let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
		searches = searches.filter(item => item !== search);

		localStorage.setItem('recentSearches', JSON.stringify(searches));
		setRecentSearches(searches);
	};

	const handleSelectSuggestion = suggestion => {
		setOrderIdState(suggestion.id);
		onSearch(suggestion.id);
		saveRecentSearches(suggestion.id);
		setIsSearchOpen(true);
	};

	const saveInputValue = () => {
		localStorage.setItem('savedOrderId', orderIdState);
	};

	useEffect(() => {
		const savedValue = localStorage.getItem('savedOrderId');
		if (savedValue) {
			setOrderIdState(savedValue);
		}
	}, []);

	const handleKeyPress = event => {
		if (event.key === 'Enter') {
			onSearch(orderIdState);
		}
	};

	const handleInputChange = e => {
		setOrderIdState(e.target.value);
	};

	return (
		<>
			{/* Overlay */}
			<Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" zIndex="9" />

			{/* Search Box */}
			<Box position="fixed" top={{ base: '60vh', sm: '50vh' }} left="50%" transform="translate(-50%, -50%)" width={{ base: '80vw', sm: '70vw', md: '50vw', lg: '40vw' }} p="6" px={2} bg="white" shadow="lg" borderRadius="md" zIndex="10">
				<HStack px={5} mt={2} mb={1}>
					<Flex align="center" border="1px solid" borderColor="gray.300" borderRadius="md" px={{ base: 0, md: 2 }} bg="white" width="100%">
						<FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '10px', fontSize: '20px', color: 'gray.200' }} />
						<Input value={orderIdState} onChange={handleInputChange} onKeyPress={handleKeyPress} variant="unstyled" placeholder="No. Booking" py={0} focusBorderColor="transparent" />
					</Flex>
					{/* Close Button */}
					<CloseButton
						onClick={() => {
							saveInputValue();
							setIsSearchOpen(false);
						}}
					/>
				</HStack>
				<VStack align={'start'}>
					{/* Menampilkan error jika ada */}
					{error && <Text color="red.500">{error}</Text>}
					{/* Menampilkan saran dari backend */}
					{suggestions.length > 0 && (
						<VStack pt={2} px={5} width="100%">
							{suggestions.map(suggestion => (
								<HStack key={suggestion.id} justifyContent="space-between" width="100%" borderBottom="1px solid #E2E8F0">
									<Text py={2} cursor="pointer" color="blue.500" onClick={() => handleSelectSuggestion(suggestion)}>
										{suggestion.id}
									</Text>
								</HStack>
							))}
						</VStack>
					)}

					{/* Display recent searches */}
					{recentSearches.length > 0 && (
						<VStack align="start" pt={{ base: 2 }} px={{ base: 4, md: 5 }} width="100%">
							<HStack justifyContent="space-between" width="100%">
								<Text fontWeight="semibold" color="gray.800" fontSize={{ base: 'sm', md: 'lg' }} mt={2}>
									Pencarian Terkini
								</Text>
								<Text
									cursor="pointer"
									color="red.500"
									fontSize={{ base: 'sm', md: 'md' }}
									fontWeight="bold"
									onClick={() => {
										// Clear recent searches
										localStorage.removeItem('recentSearches');
										setRecentSearches([]);
									}}
								>
									Hapus
								</Text>
							</HStack>
							{recentSearches.map(search => (
								<HStack key={search} justifyContent="space-between" width="100%" borderBottom="1px solid #E2E8F0" pb={1}>
									<Text cursor="pointer" onClick={() => handleRecentSearch(search)} color="blue.500" fontSize={{ base: 'sm', md: 'md' }}>
										{search}
									</Text>
									<CloseButton size="sm" onClick={() => handleDeleteSearch(search)} aria-label="Hapus pencarian ini" />
								</HStack>
							))}
						</VStack>
					)}
				</VStack>
			</Box>
		</>
	);
};

export default Search;
