import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({params}) => {
	const studentApplication = await prisma.studentApplication.findFirst({
		where: {
			id: {
				equals: params.aid
			},
		},
		include: {
			scholarshipProgram: {
				include: {
					sponsorUser: true
				}
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { studentApplication }
	};
};