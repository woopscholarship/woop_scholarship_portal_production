import type { RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { v4 as uuidv4 } from 'uuid';


const structureData = (responseData: any): any => {
	const data = {
		id: responseData.id,
		email: responseData.email,
		profileImageUrl: `https://ui-avatars.com/api/?background=0fb7a6&color=fff&name=${encodeURI(responseData.firstName + ' ' + responseData.lastName)}`,
		userType: 'ADMIN',
		displayName: `${responseData.firstName} ${responseData.lastName}`,
		userDetails: {
			create: {
				firstName: responseData.firstName,
				middleName: responseData.middleName,
				lastName: responseData.lastName,
				gender: responseData.gender.toUpperCase(),
				dateOfBirth: responseData.birthDate,
				phoneNumber: responseData.phoneNumber,
        reasonForApplication: responseData.reason,
        facebookUrl: responseData.facebookLink,
        validIdUrl: responseData.validIdUrl,

				currentAddress: responseData.currentAddress,
				currentCity: responseData.currentCity,
				currentState: responseData.currentState,
				currentCountry: responseData.currentCountry,
				currentPostalCode: responseData.currentPostalCode,

				permanentAddress: responseData.currentAddress,
				permanentCity: responseData.currentCity,
				permanentState: responseData.currentState,
				permanentCountry: responseData.currentCountry,
				permanentPostalCode: responseData.currentPostalCode,
			}
		}
	};

  return data;
};

export const POST: RequestHandler = async ({ request }) => {
	const responseData = await request.json();
	const data = structureData(responseData)
	

	// check if user already exists
	const existingUser = await prisma.user.findFirst({
		where: {
			email: {
				contains: data.email
			}
		}
	});


  if (existingUser) {
     return {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
      message: 'Invalid secret key',
      body: {}
    };
  }

  // Require Secret Key
  if(responseData.secretKey !== 'rocketpassword!@#') {
    return {
      headers: { 'Content-Type': 'application/json' },
      status: 401,
      body: {message: 'Invalid secret key',}
    };
  }



	const user = await prisma.user.create({
		data: data
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		message: 'Success',
		body: { user }
	};
};
