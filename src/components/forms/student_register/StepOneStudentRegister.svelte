<script lang="ts">
	import { onMount } from 'svelte/internal';
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';

	const personalInfoItems = [
		[
			{
				type: 'text',
				id: 'firstName',
				name: 'firstName',
				placeholder: 'Enter First Name',
				label: 'First Name',
				required: true
			},
			{
				type: 'text',
				id: 'middleName',
				name: 'middleName',
				placeholder: 'Enter Middle Name',
				label: 'Middle Name'
			}
		],
		[
			{
				type: 'text',
				id: 'lastName',
				name: 'lastName',
				placeholder: 'Enter Last Name',
				label: 'Last Name',
				required: true
			},
			{
				type: 'select',
				id: 'gender',
				name: 'gender',
				label: 'Gender',
				required: true,
				options: [
					{
						label: 'Male',
						value: 'male'
					},
					{
						label: 'Female',
						value: 'female'
					}
				]
			}
		],
		[
			{
				type: 'select',
				id: 'maritalStatus',
				name: 'maritalStatus',
				label: 'Marital Status',
				required: true,
				options: [
					{
						label: 'Single',
						value: 'Single'
					},
					{
						label: 'Married',
						value: 'Married'
					},
					{
						label: 'Divorced',
						value: 'Divorced'
					}
				]
			},
			{
				type: 'date',
				id: 'birthDate',
				name: 'birthDate',
				label: 'Birthdate',
				max: '2004-12-01',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'nationality',
				name: 'nationality',
				label: 'Nationality',
				placeholder: 'Filipino',
				required: true
			}
		]
	];

	const inputElementIds = [
		'#firstName',
		'#middleName',
		'#lastName',
		'#gender',
		'#maritalStatus',
		'#birthDate',
		'#nationality'
	];

	export let isProcessDone = false;
	export let processData: any = {};

	onMount(() => {
		// Add Event Listeners to each of the input items
		inputElementIds.forEach((inputItemId) => {
			document.querySelector(inputItemId)?.addEventListener('change', () => {
				const firstName = (<HTMLInputElement>document.querySelector('#firstName'))!.value;
				const middleName = (<HTMLInputElement>document.querySelector('#middleName'))!.value;
				const lastName = (<HTMLInputElement>document.querySelector('#lastName'))!.value;
				const gender = (<HTMLInputElement>document.querySelector('#gender'))!.value;
				const maritalStatus = (<HTMLInputElement>document.querySelector('#maritalStatus'))!.value;
				const birthDate = (<HTMLInputElement>document.querySelector('#birthDate'))!.value;
				const nationality = (<HTMLInputElement>document.querySelector('#nationality'))!.value;

				if (
					firstName !== '' &&
					lastName !== '' &&
					gender !== '' &&
					maritalStatus !== '' &&
					birthDate !== '' &&
					nationality !== ''
				) {
					processData = {
						firstName,
						middleName,
						lastName,
						gender,
						maritalStatus,
						birthDate,
						nationality
					};

					isProcessDone = true;
				}
			});
		});
	});
</script>

{#each personalInfoItems as inputItem}
	<InlineContainer>
		{#each inputItem as item}
			<Input {...item} />
		{/each}
	</InlineContainer>
{/each}
