<script lang="ts">
	// @ts-nocheck
	import { onMount } from 'svelte/internal';
	import { phoneCodeValid } from '$root/stores/authStore';

	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';

	// Component Data
	const inputItems = [
		[
			{
				type: 'text',
				id: 'currentAddress',
				name: 'currentAddress',
				placeholder: 'Enter Address ',
				label: 'Address',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentCity',
				name: 'currentCity',
				placeholder: 'Enter City',
				label: 'City',
				required: true
			},
			{
				type: 'text',
				id: 'currentState',
				name: 'currentState',
				placeholder: 'Enter State / Province',
				label: 'Enter State / Province',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentCountry',
				name: 'currentCountry',
				placeholder: 'Enter Country',
				label: 'Country',
				required: true
			},
			{
				type: 'text',
				id: 'currentPostalCode',
				name: 'currentPostalCode',
				placeholder: 'Enter Postal Code',
				label: 'Postal Code',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'phoneNumber',
				name: 'phoneNumber',
				placeholder: '+639669257362',
				label: 'Phone Number',
				required: true
			}
		]
	];

	export let isProcessDone = false;
	export let processData = {};

	let inputElementIds = [
		'#currentAddress',
		'#currentCity',
		'#currentState',
		'#currentCountry',
		'#currentPostalCode',
		'#phoneNumber'
	];

	onMount(() => {
		inputElementIds.forEach((inputItemId) => {
			document.querySelector(inputItemId)?.addEventListener('change', () => {
				const currentAddress = (<HTMLInputElement>document.querySelector('#currentAddress'))!.value;
				const currentCity = (<HTMLInputElement>document.querySelector('#currentCity'))!.value;
				const currentState = (<HTMLInputElement>document.querySelector('#currentState'))!.value;
				const currentCountry = (<HTMLInputElement>document.querySelector('#currentCountry'))!.value;
				const currentPostalCode = (<HTMLInputElement>document.querySelector('#currentPostalCode'))!
					.value;
				const phoneNumber = (<HTMLInputElement>document.querySelector('#phoneNumber'))!.value;

				if (
					currentAddress !== '' &&
					currentCity !== '' &&
					currentState !== '' &&
					currentCountry !== '' &&
					currentPostalCode !== '' &&
					phoneNumber !== ''
				) {
					processData = {
						currentAddress,
						currentCity,
						currentState,
						currentCountry,
						currentPostalCode,
						phoneNumber
					};

					isProcessDone = true;
				}
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

<style lang="scss">
	@import '../../../styles/colors';

	.error-prompt {
		color: red;
		font-weight: 600;
		font-size: 15px;
	}
</style>
