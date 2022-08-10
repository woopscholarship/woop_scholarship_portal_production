<script lang="ts">
	import { page } from '$app/stores';
	import type { User, PersonalInformation, RelationshipInfo } from '@prisma/client';
	import ReviewSection from '$root/components/admin/review/reviewSection.svelte';

	interface UserDetails extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	export let user: User;
	export let userDetails: UserDetails;

	const sectionItems = [
		{
			sectionTitle: {
				title: 'User Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Full Name',
					value: user.displayName
				},
				{
					label: 'Email',
					value: user.email
				},
				{
					label: 'Application Date',
					value: user.registeredOn
				},
				{
					label: 'Status',
					value: user.approvalStatus
				}
			]
		},
		{
			sectionTitle: {
				title: 'Personal Information',
				subtitle: 'Personal details and application.'
			},
			items: [
				{
					label: 'First Name',
					value: userDetails.firstName
				},
				{
					label: 'Middle Name',
					value: userDetails.middleName ?? 'N/A'
				},
				{
					label: 'Last Name',
					value: userDetails.lastName
				},
				{
					label: 'Birth Date',
					value: userDetails.dateOfBirth!
				},
				{
					label: 'Marital Status',
					value: userDetails.maritalStatus
				},
				{
					label: 'Gender',
					value: userDetails.gender
				},
				{
					label: 'Degree Level',
					value: userDetails.degreeLevel!
				},
				{
					label: 'Degree Program',
					value: userDetails.degreeProgram!
				}
			]
		},

		{
			sectionTitle: {
				title: 'Contact Information',
				subtitle: 'Contact details'
			},
			items: [
				{
					label: 'Address One',
					value: userDetails.addressOne
				},
				{
					label: 'Address Two',
					value: userDetails.addressTwo ?? 'N/A'
				},
				{
					label: 'City',
					value: userDetails.city
				},
				{
					label: 'State',
					value: userDetails.state
				},
				{
					label: 'Country',
					value: userDetails.country
				},
				{
					label: 'Phone Number',
					value: userDetails.phoneNumber
				},
				{
					label: 'Email',
					value: user.email
				},
				{
					label: 'Facebook Url',
					value: userDetails.facebookUrl
				}
			]
		},
		{
			sectionTitle: {
				title: 'Parent Basic Information',
				subtitle: 'Parents basic information'
			},
			items: [
				{
					label: 'Mother First Name',
					value: userDetails.relationship.motherFirstName ?? 'N/A'
				},
				{
					label: 'Mother Last Name',
					value: userDetails.relationship.motherLastName ?? 'N/A'
				},
				{
					label: 'Mother Occupation',
					value: userDetails.relationship.motherOccupation ?? 'N/A'
				},
				{
					label: 'Mother Phone',
					value: userDetails.relationship.motherPhone ?? 'N/A'
				},
				{
					label: 'Father First Name',
					value: userDetails.relationship.fatherFirstName ?? 'N/A'
				},
				{
					label: 'Father Last Name',
					value: userDetails.relationship.fatherLastName ?? 'N/A'
				},
				{
					label: 'Father Occupation',
					value: userDetails.relationship.fatherPhone ?? 'N/A'
				},
				{
					label: 'Father Phone',
					value: userDetails.relationship.fatherOccupation ?? 'N/A'
				}
			]
		},
		{
			sectionTitle: {
				title: 'Application Details',
				subtitle: ''
			},
			items: [
				{
					label: 'Reason For Application',
					value: userDetails.reasonForApplication
				},
				{
					label: 'Valid ID / Student ID',
					value: userDetails.validIdUrl,
					type: 'image',
				},
			]
		}
	];
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
	<div>
		<img class="m-6 w-64 h-auto" src={user.profileImageUrl} alt="" />
	</div>

	{#each sectionItems as section}
		<ReviewSection {...section} />
	{/each}
</div>

<form method="POST" class="mt-4 w-1/4" action={`${$page.url.pathname}`}>
	<div>
		<label for="status" class="block font-medium text-gray-700 text-lg">Status</label>
		<select
			id="status"
			name="status"
			class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
		>
			<option value="REJECTED">Reject</option>
			<option value="APPROVED">Approve</option>
		</select>
	</div>

	<input type="submit" class="cursor-pointer mt-4 px-10 py-2 bg-primary text-white" value="SUBMIT" >
</form>
