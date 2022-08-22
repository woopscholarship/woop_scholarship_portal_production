<script lang="ts">
	import { capitalizeFirstLetter } from '$root/helper/capitalizeFirstLetter';
	import ReviewStudentTableContainer from '$root/components/sponsor/ReviewStudentTableContainer.svelte';
	import ReviewStudentTableItem from '$root/components/sponsor/ReviewStudentTableItem.svelte';
	import type {
		StudentApplication,
		User,
		PersonalInformation,
		RelationshipInfo
	} from '@prisma/client';

	interface _StudentApplication extends StudentApplication {
		studentUser: _User;
	}

	interface _User extends User {
		userDetails: _PersonalInformation;
	}

	interface _PersonalInformation extends PersonalInformation {
		relationship: RelationshipInfo;
	}
	export let student: _StudentApplication;

	const { studentUser } = student;
	const { userDetails } = studentUser;
	const { relationship } = userDetails;

	console.log(student);

</script>

<img
	class="w-full h-60 object-fill "
	src="https://i.ibb.co/zftT3jh/photo-1553095066-5014bc7b7f2d.jpg"
	alt=""
/>

<div class="relative z-40 bg-red mb-48">
	<div class="absolute -top-20 left-10 z-40 bg-white rounded shadow-md">
		<img class="m-2 h-52 w-48 object-cover" src={studentUser.profileImageUrl} alt="" />
	</div>

	<div class="absolute left-72 top-6">
		<h2 class="text-2xl font-bold">{studentUser.displayName}</h2>
		<p class="text-lg font-bold text-primary">{capitalizeFirstLetter(userDetails.degreeLevel)}</p>
		<p class="mt-4">Date Applied: {student.appliedOn}</p>
	</div>
</div>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg p-10">
	<div class="px-4 py-5 sm:px-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900">Reasons For Application</h3>
		<p class="mt-2 text-sm text-gray-500">{student.reason}</p>
	</div>

	<div class="flex flex-wrap">
		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='First Name' value={userDetails.firstName} />
			<ReviewStudentTableItem label='Middle Name' value={userDetails.middleName ?? 'N/A'} />
			<ReviewStudentTableItem label='Last Name' value={userDetails.lastName} />
			<ReviewStudentTableItem label='Gender' value={capitalizeFirstLetter(userDetails.gender)} />
			<ReviewStudentTableItem label='Marital Status' value={capitalizeFirstLetter(userDetails.maritalStatus)} />
			<ReviewStudentTableItem label='Birth Date' value={String(userDetails.dateOfBirth)} />
			<ReviewStudentTableItem label='Degree Level' value={capitalizeFirstLetter(userDetails.degreeLevel) ?? 'N/A'} />
			<ReviewStudentTableItem label='Degree Program' value={userDetails.degreeProgram ?? 'N/A'} />
		</ReviewStudentTableContainer>


		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Email' value={studentUser.email} />
			<ReviewStudentTableItem label='Phone Number' value={userDetails.phoneNumber} />
			<ReviewStudentTableItem label='Address One' value={userDetails.addressOne} />
			<ReviewStudentTableItem label='Address Two' value={userDetails.addressTwo ?? 'N/A'} />
			<ReviewStudentTableItem label='City' value={userDetails.city} />
			<ReviewStudentTableItem label='State' value={userDetails.state} />
			<ReviewStudentTableItem label='Country' value={userDetails.country} />
			<ReviewStudentTableItem label='Facebook URL' value={userDetails.facebookUrl ?? 'N/A'} />
		</ReviewStudentTableContainer>
	</div>

	<div class="px-4 py-5 sm:px-6 mt-10">
		<h3 class="text-lg leading-6 font-medium text-gray-900">Student Relationships</h3>
	</div>


	<div class="flex flex-wrap mt-4">
		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Mother First Name' value={relationship.motherFirstName ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Last Name' value={relationship.motherLastName ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Occupation' value={relationship.motherOccupation ?? 'N/A'} />
			<ReviewStudentTableItem label='Mother Phone' value={relationship.motherPhone ?? 'N/A'} />
		</ReviewStudentTableContainer>


		<!-- SECTION -->
		<ReviewStudentTableContainer>
			<ReviewStudentTableItem label='Father First Name' value={relationship.fatherFirstName ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Last Name' value={relationship.fatherLastName ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Occupation' value={relationship.fatherOccupation ?? 'N/A'} />
			<ReviewStudentTableItem label='Father Phone' value={relationship.fatherPhone ?? 'N/A'} />
		</ReviewStudentTableContainer>
	</div>
</div>
