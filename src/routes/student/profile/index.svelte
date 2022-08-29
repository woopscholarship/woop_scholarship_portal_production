<script lang="ts">
	import Container from '$root/components/common/container.svelte';
	import { Moon } from 'svelte-loading-spinners';
	import type { User, PersonalInformation, RelationshipInfo } from '@prisma/client';
	import { Icon } from 'svelte-awesome';
	import mapMarker from 'svelte-awesome/icons/mapMarker';

	import { capitalizeFirstLetter } from '$root/helper/capitalizeFirstLetter';
	import { currentUser } from '$root/stores/authStore';
	import TableItem from '$root/components/table/tableItem.svelte';
	import StudentTopBar from '$root/components/student/studentTopBar.svelte';

	interface _User extends User {
		userDetails: _PersonalInformation;
	}
	interface _PersonalInformation extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	const user: _User = <_User>$currentUser;
</script>

{#if !user && $currentUser}
	<Container type="justified">
		<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
	</Container>
{:else}
	<div class="relative mt-4 p-6 w-full bg-white rounded shadow-sm">
		<div class="flex gap-4 items-center">
			<img class="w-20 h-auto rounded-full" src={user.profileImageUrl} alt={user.displayName} />
			<div class="">
				<h2 class="text-2xl font-bold text-primary">{user.displayName}</h2>
				<p class="text-[#556482] font-semibold">
					{capitalizeFirstLetter(user.userDetails.degreeLevel)} Student
				</p>
				<p class="relative mt-1 text-gray-400 text-sm">
					<Icon class="absolute" data={mapMarker} scale={1.2} />
					<span class="ml-4"
						>{user.userDetails.addressOne}, {user.userDetails.city}, {user.userDetails.state}, {user
							.userDetails.country}</span
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
					<TableItem label="Degree Program" value={String(user.userDetails.degreeProgram)} />
					<TableItem
						label="Degree Level"
						value={capitalizeFirstLetter(String(user.userDetails.degreeLevel))}
					/>
				</dl>
			</div>
		</div>
		<div class="w-2/3 bg-white p-6 rounded shadow-sm">
			<div class="border-t border-gray-200 py-5 sm:p-0">
				<dl class="sm:divide-y sm:divide-gray-200">
					<TableItem label="Address One" value={`${user.userDetails.addressOne}`} />
					<TableItem label="Address Two" value={`${user.userDetails.addressTwo ?? 'N/A'}`} />
					<TableItem label="City" value={`${user.userDetails.city}`} />
					<TableItem label="State" value={`${user.userDetails.state}`} />
					<TableItem label="Country" value={`${user.userDetails.country}`} />
					<TableItem label="Address One" value={`${user.userDetails.addressOne}`} />
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
{/if}
