import ProductService from '@/db/ProductService';

// return the average rating of all products.
export const GET = async () => {
	const averageRating = await ProductService.calculateAverageProductRating();
	return Response.json({ averageRating });
};
