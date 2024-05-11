import SeriesService from '@/db/SeriesService';

export const GET = async () => {
	try {
		return Response.json(await SeriesService.getMany());
	} catch (error) {
		if (error instanceof Error) return Response.json({ error: error.message });
		return Response.json({ error: 'An unknown error occurred whilst fetching the series' });
	}
};
