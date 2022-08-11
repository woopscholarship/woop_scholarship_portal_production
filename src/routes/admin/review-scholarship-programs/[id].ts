import type { RequestHandler } from '@sveltejs/kit';
import { GetScholarshipProgramDetails } from '$root/utils/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const scholarshipProgram = await GetScholarshipProgramDetails(params.id);
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			scholarshipProgram
		}
	};
};
