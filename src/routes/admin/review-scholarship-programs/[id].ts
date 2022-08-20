import type { RequestHandler } from '@sveltejs/kit';
import {
	scholarship
} from '$root/utils/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const scholarshipProgram = await scholarship.getProgramDetails(params.id);
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			scholarshipProgram
		}
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));
	await scholarship.updateApprovalStatus(Number(params.id), status);
	return {};
};
