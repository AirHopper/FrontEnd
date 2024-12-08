export const getHistory = async () => {
	let url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_VERSION}/tickets`;

	const response = await fetch(url, {
		method: 'GET',
	});

	const result = await response.json();
	if (!result?.success) {
		throw new Error(result?.message);
	}
	return result?.data;
};
