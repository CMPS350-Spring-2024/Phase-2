import ProductService from '@/db/ProductService';

// return the top selling products.
export const GET = async () => {
	const allProducts = await ProductService.getTop3SellingProducts();
	return Response.json(allProducts);
};
