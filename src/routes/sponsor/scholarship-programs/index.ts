import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async () => {
	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			},
		}
	});

	const scholarshipPrograms: any = await prisma.scholarshipProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		},
		include: {
			applicants: true
		}
	});


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
};
