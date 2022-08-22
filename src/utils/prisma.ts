import prisma from '$root/lib/prisma';
import type { User, PersonalInformation, OrganizationInfo } from '@prisma/client';
import type { UserDetails } from '$root/types/data';
import type { ReviewStatus, UserType } from '$root/types/enum';

export const scholarship = {
	/**
	 * Gets all the scholarship programs
	 * @returns The scholarship programs
	 */
	async getAllPrograms() {
		const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
			include: {
				sponsorUser: true
			}
		});

		return scholarshipPrograms;
	},

	/**
	 * Gets the scholarship program with the given id
	 * @param id  The id of the scholarship program
	 * @returns The scholarship program
	 */
	async getProgramDetails(id: string) {
		const scholarshipPrograms = await prisma.scholarshipProgram.findFirst({
			where: {
				id: {
					equals: id
				}
			},
			include: {
				sponsorUser: true
			}
		});
		return scholarshipPrograms;
	},

	/**
	 * Gets the scholarship program with the given sponsor id
	 * @param sponsorId The id of the sponsor
	 * @returns The scholarship program
	 */
	async getProgramBySponsor(sponsorId: string) {
		const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
			where: {
				sponsorUserId: {
					equals: sponsorId
				}
			},
			include: {
				applicants: true
			}
		});

		return scholarshipPrograms;
	},

	/**
	 * Updates the scholarship program with the given id with the given status
	 *
	 * @param id  The id of the scholarship program
	 * @param status  The status of the scholarship program
	 *
	 * @returns The scholarship program
	 */
	async updateApprovalStatus(id: string, status: ReviewStatus): Promise<void> {
		await prisma.scholarshipProgram.update({
			where: {
				id: {
					equals: id
				}
			},
			data: {
				reviewStatus: status
			}
		});
	},

	/**
	 * Filters the scholarship programs by the given status
	 * @param status The status of the scholarship program
	 * @returns The scholarship programs
	 */
	async filterScholarships(status: ReviewStatus) {
		const scholarshipPrograms = await prisma.scholarshipProgram.findMany({
			where: {
				reviewStatus: {
					equals: status
				}
			},
			include: {
				sponsorUser: true
			}
		});

		return scholarshipPrograms;
	}
};

export const user = {
	/**
	 * Gets All Users from the database
	 * @param userType - The type of user to get
	 * @returns All users of the specified type
	 */
	async getAllUsers(userType: UserType): Promise<User[]> {
		const users = await prisma.user.findMany({
			where: {
				userType: userType,
				approvalStatus: 'PENDING'
			}
		});
		return users;
	},

	/**
	 * Gets the user details for the user with the given id.
	 * @param id - The id of the user to get the details for.
	 * @returns The user details for the user with the given id.
	 */
	async getUserDetails(id: string): Promise<UserDetails> {
		const user = <User>await prisma.user.findFirst({
			where: { id: id }
		});

		console.log('user', user);

		const userDetails = <PersonalInformation>await prisma.personalInformation.findFirst({
			where: { userId: id },
			include: { relationship: true }
		});

		// Get Additional Sponsor Details if User is a Sponsor
		if (user.userType === 'SPONSOR') {
			// Get Organization Details
			const organization = <OrganizationInfo>await prisma.organizationInfo.findFirst({
				where: {
					sponsorUserId: id
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
	},

	/**
	 * Updates the approval status of the user
	 * @param id - User id to update
	 * @param status - Approval status to update to
	 */
	async updateUserStatus(id: string, status: ReviewStatus): Promise<void> {
		await prisma.user.update({
			where: {
				id: id
			},
			data: {
				approvalStatus: status
			}
		});
	},

	/**
	 * Filters the users based on the search query
	 *
	 * @param userType - User Type to filter by
	 * @param status - Status to filter by
	 * @param email - email query to filter by
	 *
	 * @returns Returns an array of filtered users that match the search query
	 */
	async filterUsers(userType: UserType, status: ReviewStatus, email?: string): Promise<User[]> {
		let query: any = {
			where: {
				userType: {
					equals: userType
				},

				// Ignore Apprioval Status When Email is Specified
				approvalStatus: {
					equals: status
				}
			}
		};

		if (email) {
			// Ignore Approval Status When Email is Specified
			query = {
				where: {
					userType: {
						equals: userType
					},
					email: {
						contains: email
					}
				}
			};
		}

		const users = await prisma.user.findMany(query);

		return users;
	}
};

export const studentApplication = {
	/**
	 * Gets all student applications
	 * @returns All student applications
	 */
	async getAllApplications() {
		const studentApplications = await prisma.studentApplication.findMany({
			include: {
				studentUser: true
			}
		});

		return studentApplications;
	},

	/**
	 * Gets the details of a student application
	 * @param id - The id of the student application
	 * @returns The student application details
	 */
	async getApplicationDetails(id: string) {
		const studentApplication = await prisma.studentApplication.findFirst({
			where: {
				id: {
					equals: id
				}
			},
			include: {
				studentUser: true
			}
		});

		return studentApplication;
	},

	async updateApplicationStatus(id: string, status: ReviewStatus): Promise<void> {
		await prisma.studentApplication.update({
			where: {
				id: id
			},
			data: {
				status: status
			}
		});
	},

	/**
	 * Gets all student applications
	 * @param status - Status to filter by
	 * @returns All student applications
	 */
	async filterApplications(status: ReviewStatus) {
		const studentApplications = await prisma.studentApplication.findMany({
			where: {
				status: {
					equals: status
				}
			},
			include: {
				studentUser: true
			}
		});

		return studentApplications;
	}
};
