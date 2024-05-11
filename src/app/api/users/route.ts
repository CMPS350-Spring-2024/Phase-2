import UserService from '@/db/UserService';

// // return the total number of users in the database.
// export const GET = async () => {
// 	const totalUsers = await UserService.calculateTotalUsers();
// 	return Response.json({ totalUsers });
// };

export const GET = async (req: Request) => {
	try {
		const { searchParams } = new URL(req.url);
		const id = Number(searchParams.get('id')) || undefined;
		const email = searchParams.get('email') || undefined;

		if (id || email)
			return Response.json({ message: 'Returned one user from DB', data: await UserService.getUnique({ id, email }) });
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

export const POST = async (req: Request) => {
	try {
		const data = await req.json();
		return Response.json({ message: 'User added successfully', data: await UserService.addOne(data) });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst adding the user' });
	}
};
