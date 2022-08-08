import prisma from "$lib/prisma";

export const GET = async () => {
  const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
    include: {
      sponsorUser: true,
    }
  });
  return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { scholarshipPrograms }
	};
}

// export const POST = async(approvalStatus) => {

// };