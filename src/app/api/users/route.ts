import ProductService from '@/db/ProductService';

// return the total number of users in the database.
export const GET = async () => {
	const totalUsers = await ProductService.calculateTotalUsers();
	return Response.json({ totalUsers });
};

