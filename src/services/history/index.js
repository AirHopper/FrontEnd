export const getHistory = async params => {
	const queryParams = new URLSearchParams();

	if (params.startDate) queryParams.append('search[startBookingDate]', params.startDate);
	if (params.endDate) queryParams.append('search[endBookingDate]', params.endDate);
	if (params.orderId) queryParams.append('search[orderId]', params.orderId);

	const token = localStorage.getItem('token');
	const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?${queryParams.toString()}`;

	const response = await fetch(url, {
		headers: {
			authorization: `Bearer ${token}`,
		},
		method: 'GET',
	});

	// get the data if fetching succeed!
	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}

	return result?.data;
};

// service.js
export const fetchRecommendations = async (query, setIsLoading, setError, setSuggestions) => {
	setIsLoading(true);
	setError(null);
	try {
		// Check cached data in localStorage
		const cachedData = JSON.parse(localStorage.getItem('searchResults')) || {};
		if (cachedData[query]) {
			setSuggestions(cachedData[query]);
			setIsLoading(false);
			return;
		}

		// Construct the request URL
		const token = localStorage.getItem('token');
		const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders?search[orderId]=${encodeURIComponent(query)}&limit=5`;

		const response = await fetch(url, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		// Handle non-OK responses
		if (!response.ok) {
			throw new Error('Failed to fetch recommendations');
		}

		// Parse response data
		const data = await response.json();

		// Filter results and update cache
		if (Array.isArray(data.data)) {
			const filteredSuggestions = data.data.slice(0, 5);
			setSuggestions(filteredSuggestions);

			// Update cache
			const updatedCache = { ...cachedData, [query]: filteredSuggestions };
			localStorage.setItem('searchResults', JSON.stringify(updatedCache));
		} else {
			throw new Error('Invalid data format received');
		}
	} catch (err) {
		setError(err.message);
	} finally {
		setIsLoading(false); // Stop loading
	}
};

export const cancelBooking = async orderId => {
	const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/orders/${orderId}`;
	const token = localStorage.getItem('token');

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	});

	// get the data if fetching succeed!
	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}

	return result?.data;
};
