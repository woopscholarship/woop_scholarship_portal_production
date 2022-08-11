import prisma from '$root/lib/prisma';
import type { User, PersonalInformation, OrganizationInfo } from '@prisma/client';

export type UserDetails = {
	user: User;
	userDetails: PersonalInformation;
	organization?: OrganizationInfo;
};

// Get All Users By User Type
export const GetUsers = async (userType: 'ADMIN' | 'SPONSOR' | 'STUDENT') => {
	const users = await prisma.user.findMany({
		where: {
			userType: userType,
			approvalStatus: 'PENDING'
		}
	});
	return users;
};

// Get Scholarship Programs And Grants
export const GetScholarshipPrograms = async (
	reviewStatus: 'APPROVED' | 'REJECTED' | 'PENDING' = 'PENDING',
	email?: string
) => {
	if (email) {
		const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
			where: {
				reviewStatus: {
					equals: reviewStatus
				}
			},
			include: {
				sponsorUser: true
			}
		});
	}

	const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
		where: {
			reviewStatus: {
				equals: reviewStatus
			}
		},
		include: {
			sponsorUser: true
		}
	});

	return scholarshipPrograms;
};

export const GetScholarshipProgramDetails = async (id: string) => {
	const scholarshipPrograms = await prisma.scholarshipProgram.findFirst({
		where: {
			id: {
				equals: +id
			}
		},
		include: {
			sponsorUser: true
		}
	});

	return scholarshipPrograms;
};

export const GetGrantPrograms = async () => {
	const grantPrograms = await prisma.grantProgram.findMany({
		include: {
			sponsorUser: true
		}
	});

	return grantPrograms;
};

// Get User Details By ID
export const GetUserDetails = async (userId: string): Promise<UserDetails> => {
	const user = <User>await prisma.user.findFirst({
		where: { id: userId }
	});

	console.log('user', user);

	const userDetails = <PersonalInformation>await prisma.personalInformation.findFirst({
		where: { userId: userId },
		include: { relationship: true }
	});

	// Get Additional Sponsor Details if User is a Sponsor
	if (user.userType === 'SPONSOR') {
		// Get Organization Details
		const organization = <OrganizationInfo>await prisma.organizationInfo.findFirst({
			where: {
				sponsorUserId: userId
			}
		});

		return {
			user,
			userDetails,
			organization
		};
	}

	// DEFAULT RETURN
	return {
		user,
		userDetails
	};
};

export const UpdateUserStatus = async (userId: string, status: 'APPROVED' | 'REJECTED') => {
	const user = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			approvalStatus: status
		}
	});

	return user;
};

export const filterUserTable = async (
	userType: 'ADMIN' | 'SPONSOR' | 'STUDENT',
	status: 'PENDING' | 'REJECTED' | 'APPROVED',
	date: string,
	email: string
) => {
	// When Email is inputted search by ignoring approval status
	if (email !== '') {
		const users = await prisma.user.findMany({
			where: {
				userType: {
					equals: userType
				},
				email: {
					contains: email
				}
			}
		});
		return users;
	}

	// default search
	const users = await prisma.user.findMany({
		where: {
			userType: {
				equals: userType
			},
			approvalStatus: {
				equals: status
			}
		}
	});

	return users;
};
