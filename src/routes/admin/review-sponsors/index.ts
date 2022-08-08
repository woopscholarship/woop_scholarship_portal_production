import prisma from "$lib/prisma";

export const GET = async () => {
  const students = await prisma.user.findMany({
    where: {
      userType: 'SPONSOR'
    },
    include: {
      userDetails: true
    }
  });
  return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { students }
	};
}

// export const POST = async(approvalStatus) => {

// };