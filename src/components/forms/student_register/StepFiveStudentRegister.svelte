<script lang="ts">
	import { onMount } from 'svelte/internal';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';
	import Input from '$root/components/common/Input.svelte';

	let inputItems = [
		{
			type: 'text',
			id: 'facebookLink',
			name: 'facebookLink',
			placeholder: 'Enter Facebook Link',
			label: 'Facebook Link',
			required: true
		},
		// {
		// 	type: 'file',
		// 	id: 'governmentId',
		// 	name: 'governmentId',
		// 	label: 'Government ID',
		// 	required: true
		// },
		{
			type: 'textarea',
			id: 'reason',
			name: 'reason',
			label: 'Reason to Apply for Scholarships on WoopScholarship',
			placeholder: 'Enter Reason',
			required: true
		}
	];

	export let isProcessDone = false;
	export let processData: any = {};

	const inputElementIds = ['#facebookLink', '#reason'];

	onMount(() => {
		inputElementIds.forEach((id) => {
			document.querySelector(id)?.addEventListener('change', () => {
				const facebookLink = (<HTMLInputElement>document.querySelector('#facebookLink'))!.value;
				const reason = (<HTMLInputElement>document.querySelector('#reason'))!.value;
				if (facebookLink !== '' && reason !== '') {
					processData = {
						facebookLink,
						reason
					};

					isProcessDone = true;
				}
			});
		});
	});
</script>

{#each inputItems as item}
	<Input {...item} />
{/each}
