import ProductService from '@/db/ProductService';

// return the average order value.
export const GET = async () => {
	const averageOrderValue = await ProductService.calculateAverageOrderValue();
	return Response.json({ averageOrderValue });
};
