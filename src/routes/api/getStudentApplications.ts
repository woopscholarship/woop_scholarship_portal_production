import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';


export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  
  const sponsorUser = await prisma.user.findFirst({
    where: {
      email: {
        contains: data.email,
      },
      userType: {
				equals: 'SPONSOR'
			},
    },
  })



	const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
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
		message: 'Success',
		body: { scholarshipPrograms }
	};
};