import type { RequestHandler } from '@sveltejs/kit';
import { grant } from '$root/utils/prisma';

import type { ReviewTable } from '$root/types/component';
import type { GrantPrograms } from '$root/types/data';

function getTableItems(grantProgram: GrantPrograms): ReviewTable[] {
	const tableItems: TableData[] = [
		{
			title: {
				title: 'Sponsorship Details',
				subtitle: 'Primary account details '
			},
			items: [
				{
					label: 'Name',
					value: grantProgram.name
				},
				{
					label: 'Email',
					value: grantProgram.email
				},
				{
					label: 'Description',
					value: grantProgram.description
				},
				{
					label: 'Degree Level',
					value: grantProgram.degreeLevel
				},
				{
					label: 'Max Applicants',
					value: grantProgram.maxApplicants
				},
				{
					label: 'Address',
					value: grantProgram.address
				},
				{
					label: 'City',
					value: grantProgram.city
				},
				{
					label: 'State',
					value: grantProgram.state
				},
				{
					label: 'Country',
					value: grantProgram.country
				},
				{
					label: 'Email',
					value: grantProgram.email
				},
				{
					label: 'Phone Number',
					value: grantProgram.phoneNumber
				},
				{
					label: 'Website',
					value: grantProgram.website
				},
				{
					label: 'Review Status',
					value: grantProgram.reviewStatus
				}
			]
		},
		{
			title: {
				title: 'Sponsor Details',
				subtitle: 'Scholarship Program Details'
			},
			items: [
				{
					label: 'Name',
					value: grantProgram.sponsorUser.displayName
				},
				{
					label: 'Email',
					value: grantProgram.sponsorUser.email
				},
				{
					label: 'Registered On',
					value: grantProgram.sponsorUser.registeredOn
				}
			]
		}
	];

	return tableItems;
}

export const GET: RequestHandler = async ({ params }) => {
	const grantProgram = await grant.getProgramDetail(params.id);

	const tableData = getTableItems(<GrantPrograms>grantProgram);
	const profileImageUrl = grantProgram!.sponsorUser!.profileImageUrl;

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: {
			tableData,
			profileImageUrl,
		}
	};
};

export const POST: RequestHandler = async ({ params, request }) => {
	const form = await request.formData();
	const status = <'APPROVED' | 'REJECTED'>String(form.get('status'));
	await grant.updateApprovalStatus(Number(params.id), status);
	return {};
};
