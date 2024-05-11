import ProductService from '@/db/ProductService';

// return the top selling products.
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const limit = Number(searchParams.get('limit')) || 0;
	const topSellingProducts = await ProductService.getTopSellingProducts(limit);
	return Response.json({ topSellingProducts });
};
