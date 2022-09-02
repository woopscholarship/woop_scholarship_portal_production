import type { RequestHandler } from '@sveltejs/kit';
import { scholarship } from '$root/utils/prisma';

export const GET: RequestHandler = async () => {
	const scholarshipPrograms = await scholarship.getAllPrograms();
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));
	const query = String(form.get('query'));

	console.log(query)

	const scholarshipPrograms = await scholarship.filterScholarships(status, query);


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
};
