<script lang="ts">
	import { page } from '$app/stores';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';

	import type { ScholarshipProgram, GrantProgram, StudentApplication, User } from '@prisma/client';

	import Topbar from '$root/components/dashboard/topbar.svelte';
	import Banner from '$root/components/dashboard/banner.svelte';


	interface ScholarshipPrograms  extends ScholarshipProgram {
		applicants: StudentApplication[];
	}

	
	interface GrantPrograms extends GrantProgram {
		applicants: StudentApplication[];
	}


	export let scholarshipPrograms: ScholarshipPrograms[];
	export let grantPrograms: GrantPrograms[];
	export let sponsorUser: User;


	let programs = [...scholarshipPrograms, ...grantPrograms];
	let index = 0;



	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, grantPrograms.length);
	$: slice = grantPrograms.slice(start, end);
	$: lastPage = Math.max(Math.ceil(grantPrograms.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}
</script>


<Topbar
	title={'Student Applications'}
	username="Paul Bryan Reyes"
	userImageAddress={'https://i.ibb.co/fFj4t1s/IMG-6893.jpg'}
/>

<div class="flex flex-col mt-6">
	<Banner text={`Your Program has ${scholarshipPrograms[index].applicants.length} Applications`} />

	<h2 class="font-bold text-lg mb-4">Programs</h2>
	<form class="mb-4 flex gap-2" method="POST" action="sponsor/student-applications">
		<select name="program" id="program">
			{#each scholarshipPrograms as program}
				<option value={program.id}>{program.name}</option>
			{/each}
			{#each grantPrograms as program}
				<option value={program.id}>{program.name}</option>
			{/each}
		</select>
		<input type="submit" value="Filter" class="bg-primary text-white px-6 py " />
	</form>




	<DataTable table$aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			<Cell>ID</Cell>
			<Cell>Sponsor</Cell>
			<Cell>Scholarship Name</Cell>
			<Cell>Status</Cell>
			<Cell>Location</Cell>
		</Row>
	</Head>
	<Body>
		{#if grantPrograms.length === 0}
			<p class="text-center p-4 bg-red-200">NO Grant Program DATA FOUND</p>
		{:else}
			{#each slice as item (item.id)}
				<Row>
					<Cell>{item.id}</Cell>
					<Cell class="p-4">
						<div><img class="rounded" src={sponsorUser.profileImageUrl} alt="" /></div>
						<div>{sponsorUser.displayName}</div>
						<div class="text-xs text-gray-700">{sponsorUser.email}</div>
					</Cell>


					<Cell
						><a class="p-4 py-2 bg-primary text-white" href={`${$page.url.pathname}/${item.id}`}
							>Review</a
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
			{start + 1}-{end} of {grantPrograms.length}
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


</div>