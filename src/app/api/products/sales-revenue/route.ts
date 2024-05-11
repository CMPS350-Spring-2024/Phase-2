import ProductService from '@/db/ProductService';

// return the total sales revenue within a specific date range.
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);
	const startDate = Number(searchParams.get('startDate')) || 0;
	const endDate = Number(searchParams.get('endDate')) || 0;

	const totalRevenue = await ProductService.calculateTotalSalesRevenueByDateRange(new Date(startDate), new Date(endDate));
	return Response.json({ totalRevenue });
};
