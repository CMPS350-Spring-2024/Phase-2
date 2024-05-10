import ProductService from '@/db/ProductService';

// return the top selling products.
export const GET_TOP_SELLING_PRODUCTS = async (req: Request) => {
	const { limit } = req.query;
	const topSellingProducts = await ProductService.getTopSellingProducts(Number(limit));
	return Response.json({ topSellingProducts });
};

