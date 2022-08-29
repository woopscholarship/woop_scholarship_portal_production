import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async () => {
	const scholarshipPrograms: any = await prisma.scholarshipProgram.findMany({
		where: {
			reviewStatus: {
        equals: 'APPROVED',
      }
		},
		include: {
			sponsorUser: true,
			applicants: true,
		},
	});


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
};
