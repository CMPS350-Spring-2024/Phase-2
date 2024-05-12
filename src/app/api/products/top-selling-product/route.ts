import ProductService from '@/db/ProductService';

// return the top selling products.
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const limit = Number(searchParams.get('limit')) || 0;

	return Response.json({
		message: 'Returned product count from DB',
		data: await ProductService.getTopSellingProducts(limit),
	});
};
