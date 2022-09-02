import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async ({params}) => {
	const studentApplications = await prisma.studentApplication.findMany({
		where: {
			studentUserId: {
				equals: params.id
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
		body: { studentApplications }
	};
};