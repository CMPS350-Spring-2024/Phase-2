import ProductService from '@/db/ProductService';

// return the total number of orders.
export const GET = async () => {
	const totalOrders = await ProductService.getTotalNumberOfOrders();
	return Response.json({ totalOrders });
};
