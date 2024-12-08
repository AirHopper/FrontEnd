export const getTickets = async params => {
	const queryParams = new URLSearchParams();

	if (params.limit) queryParams.append('limit', params.limit);
	if (params.page) queryParams.append('page', params.page);
	if (params.departureCity) queryParams.append('search[departureCity]', params.departureCity);
	if (params.arrivalCity) queryParams.append('search[arrivalCity]', params.arrivalCity);
	if (params.classType) queryParams.append('search[classType]', params.classType);
	if (params.continent) queryParams.append('search[continent]', params.continent);
	if (params.flightDate) queryParams.append('search[flightDate]', params.flightDate);
	if (params.orderBy) queryParams.append('orderBy', params.orderBy);
	if (params.isTransit) queryParams.append('search[isTransit]', params.isTransit);

	const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/tickets?${queryParams.toString()}`;

	try {
		const response = await fetch(url, { method: 'GET' });
		const result = await response.json();

		if (!result?.success) {
			throw new Error(result?.message);
		}

		return result?.data;
	} catch (error) {
		console.error('Error fetching tickets:', error.message);
		throw error;
	}
};
