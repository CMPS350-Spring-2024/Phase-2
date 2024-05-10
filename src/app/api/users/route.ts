import ProductService from '@/db/ProductService';

export const GET = async () => {
	const totalUsers = await ProductService.calculateTotalUsers();
	return Response.json({ totalUsers });
};

