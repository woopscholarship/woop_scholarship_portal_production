import type { RequestHandler } from '@sveltejs/kit';
import {
	GetScholarshipProgramDetails,
	UpdateScholarshipProgramApprovalStatus
} from '$root/utils/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const grantProgram = await GetScholarshipProgramDetails(params.id);
	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			grantProgram
		}
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));
	await UpdateScholarshipProgramApprovalStatus(Number(params.id), status);
	return {};
};
