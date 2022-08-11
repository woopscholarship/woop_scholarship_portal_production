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

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));

	const scholarshipPrograms = await GetScholarshipPrograms(status);


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
};
