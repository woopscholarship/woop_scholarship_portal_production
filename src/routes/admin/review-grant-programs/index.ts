import type { RequestHandler } from '@sveltejs/kit';
import { GetScholarshipPrograms } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	const scholarshipPrograms = await GetScholarshipPrograms()
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
}