<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { OrganizationInfo, User, PersonalInformation, RelationshipInfo } from '@prisma/client';

	interface UserDetails extends PersonalInformation {
		relationship: RelationshipInfo;
	}

	export let user: User;
	export let userDetails: UserDetails;
	export let organization: OrganizationInfo;


	const tableData = [
		{
			title: {
				title: 'Sponsor Information',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Sponsor Name',
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
			title: {
				title: 'Address',
				subtitle: 'Address'
			},
			items: [
				{
					label: 'Address',
					value: userDetails.permanentAddress
				},
				{
					label: 'City',
					value: userDetails.permanentCity
				},
				{
					label: 'State',
					value: userDetails.permanentState
				},
				{
					label: 'Country',
					value: userDetails.permanentCountry
				},
				{
					label: 'Country',
					value: userDetails.permanentPostalCode
				},
			]
		},
		{
			title: {
				title: 'Contact Details',
				subtitle: 'Contact Details'
			},
			items: [
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
					value: userDetails.facebookUrl ?? 'N/A'
				}
			]
		},
		{
			title: {
				title: 'Reason For Application',
				subtitle: 'Application details'
			},
			items: [
				{
					label: 'Reason For Application',
					value: userDetails.reasonForApplication
				}
			]
		}
	];

	const profileImageUrl = user.profileImageUrl;
</script>

<ReviewDetailsTable {tableData} {profileImageUrl} />

