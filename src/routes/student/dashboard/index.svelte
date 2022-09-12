<script lang='ts'>
	import { currentUser } from '$root/stores/authStore';
	import StudentTopBar from '$root/components/student/studentTopBar.svelte';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import StatusBadge from '$root/components/statusBadge.svelte';
	import { page } from '$app/stores';

	import type { ScholarshipProgram, StudentApplication } from '@prisma/client';


	interface _ScholarshipProgram extends ScholarshipProgram {
		applicants: StudentApplication[];
	}
	
	export let scholarshipPrograms: _ScholarshipProgram[] = [];

	let programs = [...scholarshipPrograms];

	console.log(scholarshipPrograms[0]);

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, programs.length);
	$: slice = programs.slice(start, end);
	$: lastPage = Math.max(Math.ceil(programs.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}
</script>


<!--Top Section-->
<StudentTopBar title='Dashboard' userImageAddress={$currentUser.profileImageUrl} />
<div class="relative mt-4 p-6 w-full bg-white rounded shadow-sm">
	<div class="flex flex-row grid gap-x-8 gap-y-4 grid-cols-3">
		<div class="basis-1/2">
	<h2 class="text-2xl font-bold text-primary text-[#162F52]">Hi, </h2>
	<br>
	<p>Welcome to your Dashboard, here you can track and see your scholarship application.</p>
	<br>
	<a href="https://woopscholarship.com/">Apply Scholarship</a>
		<div>
			
		</div>
		</div>
		<div class="basis-1/4"></div>
		<div class="basis-1/4 bg-[#0fb7a6] rounded grid p-3">
			<h2 class="text-2xl font-bold text-white">Scholarship Application</h2>
			<p class="text-white">You have applied 700 Scholarships.</p>
			<a href="https://woopscholarship.com/" class="font-semibold text-white">View Scholarship</a>
		</div>
	</div>

<!--Scholarship Application Section (Middle Part)-->	
</div>
<div class="relative mt-4 p-6 w-full bg-white rounded shadow-sm"><!--Scholarship Application Div for Color-->
	<div class="flex flex-row grid gap-x-8 gap-y-4 grid-cols-5">
		<div class="basis-1/6">
			<h3 class="text-center bg-[#0fb7a6] rounded grid p-2 text-m font-bold text-white">Scholarship Application</h3><!--Text-->
		</div>
	</div>
	
	<div class="border-t border-gray-200 py-5 sm:p-0">
	<table class="table-fixed border-separate border-spacing-8 text-left"><!--Table View-->
		<thead>
			<tr>
				<th class="basis-1/4">Name</th>
				<th class="basis-1/4">Location</th>
				<th class="basis-1/4">Type</th>
				<th class="basis-1/4"></th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>Saint Columban College</td>
				<td>Pagadian City</td>
				<td>Scholarship</td>
				<td class="basis-1/4 bg-[#0fb7a6] rounded grid p-3">View</td>
			</tr>
		</tbody>
	</table>
	
	<br>
	</div>
	<h3 class="text-xl font-bold text-primary text-[#162F52]"><a href="https://woopscholarship.com/" class="text-xl font-bold text-primary text-[#162F52]">View all Applied Scholarships</a></h3>

</div>


<DataTable $aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			<Cell>Name</Cell>
			<Cell>Description</Cell>
			<Cell>Applicants</Cell>
			<Cell>Scholarship For</Cell>
			<Cell>Status</Cell>
			<Cell />
		</Row>
	</Head>
	<Body>
		{#if programs.length === 0}
			<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
		{:else}
			{#each slice as item (item.id)}
				<Row>
					<Cell>{item.name}</Cell>
					<Cell>{@html truncate(item.description, 40)}</Cell>
					<Cell>{item.applicants.length} / {item.maxApplicants}</Cell>
					<Cell>{item.degreeLevel}</Cell>
					<Cell><StatusBadge status={item.status} /></Cell>
					<Cell
						><a class="p-4 py-2 bg-primary text-white" href={`${$page.url.pathname}/${item.id}`}
							>Edit</a
						></Cell
					>
				</Row>
			{/each}
		{/if}
	</Body>

	<Pagination slot="paginate">
		<svelte:fragment slot="rowsPerPage">
			<Label>Rows Per Page</Label>
			<Select variant="outlined" bind:value={rowsPerPage} noLabel>
				<Option value={10}>10</Option>
				<Option value={25}>25</Option>
				<Option value={100}>100</Option>
			</Select>
		</svelte:fragment>
		<svelte:fragment slot="total">
			{start + 1}-{end} of {programs.length}
		</svelte:fragment>

		<IconButton
			class="material-icons"
			action="first-page"
			title="First page"
			on:click={() => (currentPage = 0)}
			disabled={currentPage === 0}>first_page</IconButton
		>
		<IconButton
			class="material-icons"
			action="prev-page"
			title="Prev page"
			on:click={() => currentPage--}
			disabled={currentPage === 0}>chevron_left</IconButton
		>
		<IconButton
			class="material-icons"
			action="next-page"
			title="Next page"
			on:click={() => currentPage++}
			disabled={currentPage === lastPage}>chevron_right</IconButton
		>
		<IconButton
			class="material-icons"
			action="last-page"
			title="Last page"
			on:click={() => (currentPage = lastPage)}
			disabled={currentPage === lastPage}>last_page</IconButton
		>
	</Pagination>
</DataTable>
