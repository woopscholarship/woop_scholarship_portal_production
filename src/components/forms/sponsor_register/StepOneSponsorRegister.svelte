<script lang="ts">
	import { onMount } from 'svelte/internal';
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';

	const inputItems = [
		{
			type: 'text',
			id: 'orgName',
			name: 'orgName',
			placeholder: 'Enter Organization / Sponsor Name',
			label: 'Company / Organization Name',
			required: true
		},
		{
			type: 'textarea',
			name: 'reason',
			id: 'reason',
			placeholder: 'Enter Reason',
			label: 'Reason to Apply for Scholarships on WoopScholarship',
			required: true
		}
	];

	export let isProcessDone = false;
	export let data = {};

	onMount(() => {
		inputItems.forEach((input) => {
			document.querySelector(`#${input.id}`)?.addEventListener('change', () => {
				const orgName = (<HTMLInputElement>document.querySelector('#orgName'))!.value;
				const reason = (<HTMLInputElement>document.querySelector('#reason'))!.value;

				if(orgName !== '' && reason !== '') {

					// save to exportable component prop
					data = {
						orgName: orgName,
						reason: reason,
					}
					isProcessDone = true;
				}
			});
		});
	});
</script>

{#each inputItems as items}
	<InlineContainer>
		<Input {...items} />
	</InlineContainer>
{/each}
