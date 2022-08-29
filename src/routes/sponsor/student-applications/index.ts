import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

export const GET: RequestHandler = async () => {
	const currentIndex = 0;

	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			}
			// email: {
			// 	equals: 'Mackenzie_Kuhic1@gmail.com'
			// }
		}
	});

	const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		},
		include: {
			applicants: {
				include: {
					studentUser: {
						include: {
							userDetails: true
						}
					}
				}
			}
		}
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { sponsorUser, scholarshipPrograms, currentIndex }
	};
};

export const POST: RequestHandler = async ({ request }) => {
	const sponsorUser = await prisma.user.findFirst({
		where: {
			userType: {
				equals: 'SPONSOR'
			}
		}
	});

	const form = await request.formData();
	const programId = String(form.get('program'));

	let scholarshipPrograms = await prisma.scholarshipProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		},
		include: {
			applicants: {
				include: {
					studentUser: {
						include: {
							userDetails: true
						}
					}
				}
			}
		}
	});

	const currentIndex = scholarshipPrograms.findIndex((program: any) => program.id === programId);


	if(scholarshipPrograms[currentIndex].applicants.length === 0) {
		return {}
	}



	scholarshipPrograms = scholarshipPrograms.map((program: any) =>
		{
			const data = {
				...program,
				applicants: program.applicants.filter(
					(applicant: any) => applicant.studentUser.approvalStatus === 'APPROVED')
			}
			return data;
		}
	);


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { sponsorUser, scholarshipPrograms, currentIndex }
	};
};
