<script lang="ts">
	import Input from '$root/components/common/Input.svelte';
	import InlineContainer from '$root/components/container/InlineContainer.svelte';
	import { onMount } from 'svelte/internal';

	const inputItems = [
		[
			{
				type: 'text',
				id: 'currentSchoolAddress',
				name: 'currentSchoolAddress',
				placeholder: 'Enter Current School Address',
				label: 'Current School Address',
				required: true
			},
			{
				type: 'text',
				id: 'previousSchoolAddress',
				name: 'previousSchoolAddress',
				placeholder: 'Enter Previous School Address',
				label: 'Previous School Address',
				required: true
			}
		],
		[
			{
				type: 'text',
				id: 'currentSchool',
				name: 'currentSchool',
				placeholder: 'Enter School Name',
				label: 'Current School Name',
				required: true
			},
			{
				type: 'text',
				id: 'previousSchoolAttended',
				name: 'previousSchoolAttended',
				placeholder: 'Enter Previous School Name',
				label: 'Previous School Name',
				required: true
			}
		],
		[
			{
				type: 'select',
				id: 'currentEducationLevel',
				name: 'currentEducationLevel',
				label: 'Current Education Level',
				required: true,
				options: [
					{
						label: 'Associate',
						value: 'ASSOCIATE'
					},
					{
						label: 'Bachelors',
						value: 'BACHELORS'
					},
					{
						label: 'Masters',
						value: 'MASTERS'
					},
					{
						label: 'Doctoral',
						value: 'DOCTORAL'
					}
				]
			},
			{
				type: 'select',
				id: 'previousEducationLevel',
				name: 'previousEducationLevel',
				label: 'Previous Education Level',
				options: [
					{
						label: 'Associate',
						value: 'ASSOCIATE'
					},
					{
						label: 'Bachelors',
						value: 'BACHELORS'
					},
					{
						label: 'Masters',
						value: 'MASTERS'
					},
					{
						label: 'Doctoral',
						value: 'DOCTORAL'
					}
				]
			}
		],
		[
			{
				type: 'text',
				id: 'currentCourse',
				name: 'currentCourse',
				placeholder: 'Enter Current Course',
				label: 'Current Course',
				required: true
			},
			{
				type: 'text',
				id: 'desiredCourse',
				name: 'desiredCourse',
				placeholder: 'Enter Desired Course',
				label: 'Desired Course',
				required: true
			}
		]
	];

	export let isProcessDone: boolean = false;
	export let processData: any = {};

	onMount(() => {
		const inputElementIds = [
			'#currentSchoolAddress',
			'#currentSchool',
			'#currentEducationLevel',
			'#currentCourse',
			'#previousSchoolAddress',
			'#previousSchoolAttended',
			'#previousEducationLevel',
			'#desiredCourse'
		];

		inputElementIds.forEach((id) => {
			document.querySelector(id)?.addEventListener('change', () => {
				const currentSchoolAddress = (<HTMLInputElement>(
					document.querySelector('#currentSchoolAddress')
				))!.value;
				const currentSchool = (<HTMLInputElement>document.querySelector('#currentSchool'))!.value;
				const currentEducationLevel = (<HTMLInputElement>(
					document.querySelector('#currentEducationLevel')
				))!.value;
				const currentCourse = (<HTMLInputElement>document.querySelector('#currentCourse'))!.value;
				const previousSchoolAddress = (<HTMLInputElement>(
					document.querySelector('#previousSchoolAddress')
				))!.value;
				const previousSchoolAttended = (<HTMLInputElement>(
					document.querySelector('#previousSchoolAttended')
				))!.value;
				const previousEducationLevel = (<HTMLInputElement>(
					document.querySelector('#previousEducationLevel')
				))!.value;
				const desiredCourse = (<HTMLInputElement>document.querySelector('#desiredCourse'))!.value;

				if (
					currentSchoolAddress !== '' &&
					currentSchool !== '' &&
					currentEducationLevel !== '' &&
					currentCourse !== '' &&
					previousSchoolAddress !== '' &&
					previousSchoolAttended !== '' &&
					previousEducationLevel !== '' &&
					desiredCourse !== ''
				) {
					processData = {
						currentSchoolAddress,
						currentSchool,
						currentEducationLevel,
						currentCourse,
						previousSchoolAddress,
						previousSchoolAttended,
						previousEducationLevel,
						desiredCourse
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
