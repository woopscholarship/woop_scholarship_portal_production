<script lang="ts">
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';
	import { onMount } from 'svelte/internal';

	const inputItems = [
		[
			{
				type: 'text',
				id: 'motherFirstName',
				name: 'motherFirstName',
				placeholder: 'Enter Mother First Name',
				label: 'Mother First Name'
			},
			{
				type: 'text',
				id: 'fatherFirstName',
				name: 'fatherFirstName',
				placeholder: 'Enter Fathers First Name',
				label: 'Father First Name'
			}
		],
		[
			{
				type: 'text',
				id: 'motherLastName',
				name: 'motherLastName',
				placeholder: 'Enter Mother Last Name',
				label: 'Mother Last Name'
			},
			{
				type: 'text',
				id: 'fatherLastName',
				name: 'fatherLastName',
				placeholder: 'Enter Father Last Name',
				label: 'Father Last Name'
			}
		],
		[
			{
				type: 'text',
				id: 'motherOccupation',
				name: 'motherOccupation',
				placeholder: 'Enter Mother Occupation',
				label: 'Mother Occupation'
			},
			{
				type: 'text',
				id: 'fatherOccupation',
				name: 'fatherOccupation',
				placeholder: 'Enter Father Occupation',
				label: 'Father Occupation'
			}
		],
		[
			{
				type: 'text',
				id: 'motherPhone',
				name: 'motherPhone',
				placeholder: 'Enter Mother Contact Number',
				label: 'Mother Contact Number'
			},
			{
				type: 'text',
				id: 'fatherPhone',
				name: 'fatherPhone',
				placeholder: 'Enter Father Phone Number',
				label: 'Father Contact Number'
			}
		]
	];

	export let processData = {};

	onMount(() => {
		const inputElementIds = [
			'#motherFirstName',
			'#motherLastName',
			'#motherOccupation',
			'#motherPhone',
			'#fatherFirstName',
			'#fatherLastName',
			'#fatherOccupation',
			'#fatherPhone'
		];

		inputElementIds.forEach((id) => {
			document.querySelector(id)?.addEventListener('change', () => {
				const motherFirstName = (<HTMLInputElement>document.querySelector('#motherFirstName'))!
					.value;
				const motherLastName = (<HTMLInputElement>document.querySelector('#motherLastName'))!.value;
				const motherOccupation = (<HTMLInputElement>document.querySelector('#motherOccupation'))!
					.value;
				const motherPhone = (<HTMLInputElement>document.querySelector('#motherPhone'))!.value;
				const fatherFirstName = (<HTMLInputElement>document.querySelector('#fatherFirstName'))!
					.value;
				const fatherLastName = (<HTMLInputElement>document.querySelector('#fatherLastName'))!.value;
				const fatherOccupation = (<HTMLInputElement>document.querySelector('#fatherOccupation'))!
					.value;
				const fatherPhone = (<HTMLInputElement>document.querySelector('#fatherPhone'))!.value;

				processData = {
					motherFirstName,
					motherLastName,
					motherOccupation,
					motherPhone,
					fatherFirstName,
					fatherLastName,
					fatherOccupation,
					fatherPhone
				};
			});
		});
	});
</script>

{#each inputItems as inputItem}
	<InlineContainer>
		{#each inputItem as item}
			<Input {...item} />
		{/each}
	</InlineContainer>
{/each}
