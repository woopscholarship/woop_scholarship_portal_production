import type { RequestHandler } from '@sveltejs/kit';
import { grant } from '$root/utils/prisma';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async () => {
	const grantPrograms = await grant.getAllPrograms()

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { grantPrograms }
	};
}

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED' | 'PENDING'>String(form.get('status'));

	const grantPrograms = await prisma.grantProgram.findMany({
		where: {
			reviewStatus: {
				equals: status
			}
		},
		include: {
			sponsorUser: true
		}
	})


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { grantPrograms }
	};
}