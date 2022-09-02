<script lang="ts">
	import Container from '$root/components/common/container.svelte';
	import { Moon } from 'svelte-loading-spinners';
	import type { User, PersonalInformation, RelationshipInfo } from '@prisma/client';
	import { Icon } from 'svelte-awesome';
	import mapMarker from 'svelte-awesome/icons/mapMarker';
	import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

	import { capitalizeFirstLetter } from '$root/helper/capitalizeFirstLetter';
	import TableItem from '$root/components/table/tableItem.svelte';
	import StudentTopBar from '$root/components/student/studentTopBar.svelte';

	interface _User extends User {
		userDetails: _PersonalInformation;
	}
	interface _PersonalInformation extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	let user: _User;

	async function getUserData(): Promise<any> {
		const auth = getAuth();
		const currentUser = auth.currentUser;

		if (currentUser) {
			const response = await fetch('/api/getUserData/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: currentUser!.email
				})
			});

			const user = await response.json();

			return user;
		}
	}

	const promise = getUserData();
</script>

{#await promise}
	<div class="flex justify-center items-center w-screen h-screen">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</div>
{:then { user }}

<div class="relative mt-4 p-6 w-full bg-white rounded shadow-sm">
	<div class="flex gap-4 items-center">
		<img class="w-20 h-auto rounded-full" src={user.profileImageUrl} alt={user.displayName} />
		<div class="">
			<h2 class="text-2xl font-bold text-primary">{user.displayName}</h2>
			<p class="text-[#556482] font-semibold">
				<!-- {capitalizeFirstLetter(user.userDetails.degreeLevel)} Student -->
			</p>
			<p class="relative mt-1 text-gray-400 text-sm">
				<Icon class="absolute" data={mapMarker} scale={1.2} />
				<span class="ml-4"
					>{user.userDetails.currentAddress}, {user.userDetails.currentCity}, {user.userDetails.currentState}, {user
						.userDetails.currentCountry}, {user.userDetails.currentPostalCode}</span
				>
			</p>
		</div>
	</div>
</div>

<div class="flex gap-4 mt-4 ">
	<div class="w-1/3  bg-white p-6 rounded shadow-sm">
		<h3 class="text-xl font-semibold">Account Details</h3>

		<div class="border-t border-gray-200 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				<TableItem
					label="Full Name"
					value={`${user.userDetails.firstName} ${user.userDetails.lastName}`}
				/>
				<TableItem label="Email" value={user.email} />
				<TableItem label="Phone" value={user.userDetails.phoneNumber} />
				<TableItem label="Gender" value={capitalizeFirstLetter(user.userDetails.gender)} />
				<TableItem
					label="Marital Status"
					value={capitalizeFirstLetter(String(user.userDetails.maritalStatus))}
				/>
				<TableItem label="Date Of Birth" value={String(user.userDetails.dateOfBirth)} />
				<TableItem label="Current School Address" value={String(user.userDetails.academicInformation.schoolAddress)} />
				<TableItem label="Current Degree Program" value={String(user.userDetails.academicInformation.currentSchool)} />
				<TableItem label="Current Education Level" value={String(user.userDetails.academicInformation.currentEducationLevel)} />
				<TableItem label="Current Degree Program" value={String(user.userDetails.academicInformation.currentCourse)} />

				<TableItem label="Previous School Address" value={String(user.userDetails.academicInformation.previousAddress)} />
				<TableItem label="Previous Degree Program" value={String(user.userDetails.academicInformation.previousSchool)} />
				<TableItem label="Previous Education Level" value={String(user.userDetails.academicInformation.previousEducationLevel)} />
				<TableItem label="Desired Degree Program" value={String(user.userDetails.academicInformation.desiredCourse)} />
			</dl>
		</div>
	</div>
	<div class="w-2/3 bg-white p-6 rounded shadow-sm">
		<div class="border-t border-gray-200 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				<TableItem label="Current Address" value={`${user.userDetails.currentAddress}`} />
				<TableItem label="Current City" value={`${user.userDetails.currentCity}`} />
				<TableItem label="Current State" value={`${user.userDetails.currentState}`} />
				<TableItem label="Current Country" value={`${user.userDetails.currentCountry}`} />
				<TableItem label="Current Postal Code" value={`${user.userDetails.currentPostalCode}`} />


				<TableItem label="Permanent Address" value={`${user.userDetails.permanentAddress}`} />
				<TableItem label="Permanent City" value={`${user.userDetails.permanentCity}`} />
				<TableItem label="Permanent State" value={`${user.userDetails.permanentState}`} />
				<TableItem label="Permanent Country" value={`${user.userDetails.permanentCountry}`} />
				<TableItem label="Permanent Postal Code" value={`${user.userDetails.permanentPostalCode}`} />

				<TableItem
					label="Reason For Application"
					value={`${user.userDetails.reasonForApplication}`}
				/>


				<TableItem label="Government Id" value="" type="custom">
					<img src={user.userDetails.validIdUrl} alt={user.displayName} />
				</TableItem>
			</dl>
		</div>
	</div>
</div>

<div class="flex gap-4 mt-4 bg-white p-6 rounded shadow-sm">
	<div class="w-1/2 border-t border-gray-200 py-5 sm:p-0">
		<dl class="sm:divide-y sm:divide-gray-200">
			<TableItem label="Mother First Name" value={`${user.userDetails.relationship.motherFirstName}`} />
			<TableItem label="Mother Last Name" value={`${user.userDetails.relationship.motherLastName}`} />
			<TableItem label="Mother Occupation" value={`${user.userDetails.relationship.motherOccupation}`} />
			<TableItem label="Mother Phone" value={`${user.userDetails.relationship.motherPhone}`} />
		</dl>
	</div>
	<div class="w-1/2 border-t border-gray-200 py-5 sm:p-0">
		<dl class="sm:divide-y sm:divide-gray-200">
			<TableItem label="Father First Name" value={`${user.userDetails.relationship.fatherLastName}`} />
			<TableItem label="Father Last Name" value={`${user.userDetails.relationship.fatherOccupation}`} />
			<TableItem label="Father Occupation" value={`${user.userDetails.relationship.fatherOccupation}`} />
			<TableItem label="Father Phone" value={`${user.userDetails.relationship.fatherPhone}`} />
		</dl>
	</div>
</div>
{/await}
