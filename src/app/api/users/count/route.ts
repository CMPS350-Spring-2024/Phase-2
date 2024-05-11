import UserService from '@/db/UserService';

export const GET = async () => {
	try {
		return Response.json({
			message: 'Returned user count from DB',
			data: await UserService.getCount(),
		});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) return Response.json({ message: error.message });
		return Response.json({ message: 'An unknown error occurred whilst fetching the number of users' });
	}
};
