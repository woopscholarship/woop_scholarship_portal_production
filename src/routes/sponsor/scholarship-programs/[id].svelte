<script lang="ts">
	import { capitalizeFirstLetter } from '$root/helper/capitalizeFirstLetter';

	import Select from '$root/components/form/select.svelte';
	import ReviewScholarshipListContainer from '$root/components/sponsor/ReviewScholarshipListContainer.svelte';
	import ReviewScholarshipListItem from '$root/components/sponsor/ReviewScholarshipListItem.svelte';

	import type { ScholarshipProgram, User, PersonalInformation } from '@prisma/client';

	interface _ScholarshipProgram extends ScholarshipProgram {
		sponsorUser: _User;
	}

	interface _User extends User {
		userDetails: PersonalInformation;
	}

	export let program: _ScholarshipProgram;

	function tinymceloaded() {
		//set up the tinymceloaded variable as a function here
		// @ts-ignore
		window.tinymce.init({
			selector: 'textarea',
			plugins: 'emoticons',
			toolbar: 'emoticons'
		});
	}


	export let scholarshipListItems:{
		value: string;
		label: string;
	}[] = [
		{
			label: 'Program Name',
			value: program.name
		},
		{
			label: 'Description',
			value: program.description
		},
		{
			label: 'Posted On',
			value: String(program.postedOn)
		},
		{
			label: 'Degree Level',
			value: capitalizeFirstLetter(program.degreeLevel)
		},
		{
			label: 'Scholarship Type',
			value: capitalizeFirstLetter(program.scholarshipType)
		},
		{
			label: 'Max Applicants',
			value: String(program.maxApplicants)
		},
		{
			label: 'Address',
			value: program.address
		},
		{
			label: 'City',
			value: program.city
		},
		{
			label: 'State',
			value: program.state
		},
		{
			label: 'Country',
			value: program.country
		},
		{
			label: 'Email',
			value: program.email
		},
		{
			label: 'Phone Number',
			value: program.phoneNumber
		},
		{
			label: 'Website',
			value: program.website
		},
		{
			label: 'Status',
			value: program.status
		},
	] 

</script>

<svelte:head>
	<script
		src="https://cdn.tiny.cloud/1/xv5mx0q28wyeuvp13rpix7ddpv33n7x5t8172tlxv5syt175/tinymce/5/tinymce.min.js"
		referrerpolicy="origin"
		on:load={tinymceloaded}></script>
</svelte:head>


<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">
    <h2 class="text-2xl leading-6 font-medium text-gray-900">Scholarship Program Information</h2>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Scholarship details and application.</p>
  </div>

	<ReviewScholarshipListContainer >
		{#each scholarshipListItems as item} 
			<ReviewScholarshipListItem {...item} /> 
		{/each}

	</ReviewScholarshipListContainer>





	<form class="divide-y divide-gray-200 lg:col-span-9 w-full" action="#" method="POST">
		<!-- Profile section -->

		<div class="p-6">
			<Select name='status' label='Status'>
				<option value="OPEN">Open</option>
				<option value="CLOSED">Close</option>
			</Select>


			<div class="mt-4 space-y-3">

				<label class="text-md font-semibold" for="description">Program Description</label>
				<textarea name="description" id="description" cols="30" rows="10" value={program.description}></textarea>
			</div>
			
		</div>


		<!-- Submit Section -->
		<div class="mt-4 py-4 px-4 flex justify-end sm:px-6">
			<a href="../scholarship-programs"><button
				type="button"
				class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
				>Cancel</button
			></a>
			<button
				type="submit"
				class="ml-5 bg-primary border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
				>Update</button
			>
		</div>
	</form>
</div>


