import UserService from '@/db/UserService';

// // return the total number of users in the database.
// export const GET = async () => {
// 	const totalUsers = await ProductService.calculateTotalUsers();
// 	return Response.json({ totalUsers });
// };

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get('id')) || undefined;

		if (id) return Response.json({ message: 'Returned one user from DB', data: await UserService.getUnique(id) });
		return Response.json({
			message: 'Returned many users from DB',
			data: await UserService.getMany(),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the users' });
	}
};
