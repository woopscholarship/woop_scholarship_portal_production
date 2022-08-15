import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async () => {
	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			},
			email: {
				equals: 'Mackenzie_Kuhic1@gmail.com'
			}
		}
	});

	const scholarshipPrograms: any = await prisma.scholarshipProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		}
	});

	const grantPrograms: any = await prisma.grantProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		}
	});


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms, grantPrograms }
	};
};
