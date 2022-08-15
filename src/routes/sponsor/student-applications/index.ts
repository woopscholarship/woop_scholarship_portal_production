import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';
import type { ScholarshipProgram, GrantProgram, StudentApplication } from '@prisma/client';

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
		},
		include: {
			applicants: true
		}
	});

	const grantPrograms: any = await prisma.grantProgram.findMany({
		where: {
			sponsorUserId: {
				equals: sponsorUser!.id
			}
		},
		include: {
			applicants: true
		}
	});

	scholarshipPrograms.forEach(async (program: any, x: number) => {
    program.applicants.forEach(async(applicant: StudentApplication, y: number) => {
      const studentDetails = await prisma.user.findFirst({
        where: {
          id: applicant.studentUserId
        }
      });
      scholarshipPrograms[x].applicants[y] = {...scholarshipPrograms[x][y], studentUser: studentDetails};
    })
	});


	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms, grantPrograms }
	};
};
