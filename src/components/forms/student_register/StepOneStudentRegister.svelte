<script lang="ts">
	import { onMount } from 'svelte/internal';
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';
	import { personalInfoItems } from '$lib/component_inits/initRegisterItems';

	const inputElementIds = [
		'#firstName',
		'#middleName',
		'#lastName',
		'#gender',
		'#maritalStatus',
		'#birthDate'
	];

	export let isProcessDone = false;
	export let data = {}

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

				if (
					firstName !== '' &&
					lastName !== '' &&
					gender !== '' &&
					maritalStatus !== '' &&
					birthDate !== ''
				) {
					data = {
						firstName,
						middleName,
						lastName,
						gender,
						maritalStatus,
						birthDate,
					}

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
