import ProductService from '@/db/ProductService';

// return the total sales revenue within a specific date range.
export const GET_SALES_REVENUE = async (req: Request) => {
	const { startDate, endDate } = req.query;
	const totalRevenue = await ProductService.calculateTotalSalesRevenueByDateRange(new Date(startDate), new Date(endDate));
	return Response.json({ totalRevenue });
};

