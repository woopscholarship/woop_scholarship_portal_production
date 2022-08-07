import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

export const USERS: any[] = [];
export const SCHOLARSHIP_PROGRAM: any[] = [];
export const GRANT_PROGRAM: any[] = [];

function createRandomUser(userType: 'STUDENT' | 'SPONSOR' | undefined = undefined): any {
	const user: any = {
		id: faker.datatype.uuid(),
		email: faker.internet.email(),
		userType: userType ? userType : faker.helpers.arrayElement(['STUDENT', 'SPONSOR']),
		approvalStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED'])
	};

	if (user.userType === 'STUDENT') {
		user.userDetails = {
			create: {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				maritalStatus: faker.helpers.arrayElement(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
				gender: faker.helpers.arrayElement(['FEMALE', 'MALE']),
				dateOfBirth: faker.date.past(),
				addressOne: faker.address.streetAddress(),
				city: faker.address.cityName(),
				province: faker.address.state(),
        phoneNumber: faker.phone.number(),
				relationship: {
					create: {
						motherFirstName: faker.name.firstName(),
						motherLastName: faker.name.lastName(),
						motherOccupation: faker.name.jobTitle(),
						motherPhone: faker.phone.number(),
						fatherFirstName: faker.name.firstName(),
						fatherLastName: faker.name.lastName(),
						fatherOccupation: faker.name.jobTitle(),
						fatherPhone: faker.phone.number()
					}
				}
			}
		};
	}

	if (user.userType === 'SPONSOR') {
		user.userDetails = {
			create: {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				maritalStatus: faker.helpers.arrayElement(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']),
				gender: faker.helpers.arrayElement(['FEMALE', 'MALE']),
				dateOfBirth: faker.date.past(),
				addressOne: faker.address.streetAddress(),
				city: faker.address.cityName(),
				province: faker.address.state(),
				phoneNumber: faker.phone.number()
			}
		};

		user.organization = {
			create: {
				name: faker.company.companyName(),
				logo: faker.image.avatar(),
				description: faker.lorem.paragraph(),
				address: faker.address.streetAddress(),
				city: faker.address.cityName(),
				province: faker.address.state(),
				phoneNumber: faker.phone.number(),
				email: faker.internet.email(),
				website: faker.internet.url()
			}
		};
	}

	return user;
}

function createRandomUsers(count: number, userType: 'STUDENT' | 'SPONSOR' | undefined = undefined) {
  const users: any[] = [];

  Array.from({ length: count }).forEach(() => {
    users.push(createRandomUser(userType ? userType : undefined));
  });

  return users;
}


function createScholarshipProgram() {
	const scholarshipProgram = {
		name: faker.company.companyName() + ' Scholarship Program',
		description: faker.lorem.paragraph(),
		postedOn: faker.date.past(),
		degreeLevel: faker.helpers.arrayElement(['UNDERGRADUATE', 'GRADUATE', 'POST_GRADUATE']),
		maxApplicants: +faker.random.numeric(3),
		status: faker.helpers.arrayElement(['OPEN', 'CLOSED']),
		reviewStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']),

		address: faker.address.streetAddress(),
		city: faker.address.cityName(),
		province: faker.address.state(),
		phoneNumber: faker.phone.number(),
		email: faker.internet.email(),
		website: faker.internet.url()
	};

	return scholarshipProgram;
}

function createGrantProgram() {
	const grantProgram = {
		name: faker.company.companyName() + ' Grant Program',
		description: faker.lorem.paragraph(),
		postedOn: faker.date.past(),
		amountOffer: faker.finance.amount(1000, 10000, 0, 'PHP'),
		degreeLevel: faker.helpers.arrayElement(['UNDERGRADUATE', 'GRADUATE', 'POST_GRADUATE']),
		maxApplicants: +faker.random.numeric(3),
		status: faker.helpers.arrayElement(['OPEN', 'CLOSED']),
		reviewStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED']),
		address: faker.address.streetAddress(),
		city: faker.address.cityName(),
		province: faker.address.state(),
		phoneNumber: faker.phone.number(),
		email: faker.internet.email(),
		website: faker.internet.url()
	};
  return grantProgram;
}

function createStudentApplications(count: number) {
  const applications: any[] = [];

  Array.from({ length: count }).forEach(() => {
    applications.push({
      reason: faker.lorem.paragraph(),
      studentUser: {
        create: createRandomUser('STUDENT')
      }
    });
  });

  return applications;
};



Array.from({ length: 20 }).forEach(() => {
	USERS.push(createRandomUser());
	SCHOLARSHIP_PROGRAM.push(createScholarshipProgram());
	GRANT_PROGRAM.push(createGrantProgram());
});

async function main() {
	USERS.forEach(async (userData) => {
		const user = await prisma.user.create({
			data: userData
		});
	});

	SCHOLARSHIP_PROGRAM.forEach(async (scholarshipProgramData) => {
		const data = await prisma.scholarshipProgram.create({
			data: {
				...scholarshipProgramData,
				sponsorUser: {
					create: createRandomUser('SPONSOR')
				},
        applicants: {
          create: createStudentApplications(50),
        }
			}
		});
	});

	GRANT_PROGRAM.forEach(async (grantProgramData) => {
		const data = await prisma.grantProgram.create({
			data: {
				...grantProgramData,
				sponsorUser: {
					create: createRandomUser('SPONSOR')
				},
        applicants: {
          create: createStudentApplications(10),
        }
			}
		});
	});


}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
