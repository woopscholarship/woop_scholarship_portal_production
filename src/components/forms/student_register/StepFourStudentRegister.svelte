<script lang="ts">
	import { onMount } from 'svelte/internal';
	import InlineContainer from '$lib/components/container/InlineContainer.svelte';
	import Input from '$lib/components/common/Input.svelte';

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
	export let data = {};

	onMount(() => {
		inputItems.forEach((input) => {
			document.querySelector(`#${input.id}`)?.addEventListener('change', () => {
				const facebookLink = (<HTMLInputElement>document.querySelector('#facebookLink'))!.value;
				// const governmentId = (<HTMLInputElement>document.querySelector('#governmentId'))!;
				const reason = (<HTMLInputElement>document.querySelector('#reason'))!.value;

				// && governmentId.value !== ''
				if (facebookLink !== '' && reason !== '') {
					data = {
						facebookLink,
						// governmentId: governmentId.files![0],
						reason: reason
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
