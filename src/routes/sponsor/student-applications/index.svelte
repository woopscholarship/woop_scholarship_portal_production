<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import StatusBadge from '$root/components/statusBadge.svelte';
	import { page } from '$app/stores';

	import Topbar from '$root/components/dashboard/topbar.svelte';
	import Banner from '$root/components/dashboard/banner.svelte';
	import type { ScholarshipProgram, GrantProgram, StudentApplication } from '@prisma/client';

	interface _ScholarshipProgram extends ScholarshipProgram {
		applicants: StudentApplication[];
	}

	interface _GrantProgram extends GrantProgram {
		applicants: StudentApplication[];
	}

	export let scholarshipPrograms: _ScholarshipProgram[];
	export let grantPrograms: _GrantProgram[];

	let applicants: StudentApplication[];

	$: {
		applicants = scholarshipPrograms[0].applicants;

		console.log(applicants)
	}

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, applicants.length);
	$: slice = applicants.slice(start, end);
	$: lastPage = Math.max(Math.ceil(applicants.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}



</script>

<Topbar
	title={'Student Applications'}
	username="Paul Bryan Reyes"
	userImageAddress={'https://i.ibb.co/fFj4t1s/IMG-6893.jpg'}
/>

<Banner text="Your Program has 25 Applications" />

<div class="flex flex-col mt-6">
	<h2 class="font-bold text-lg mb-4">Programs</h2>
	<form class="mb-4 flex gap-2" method="POST" action="/student-applications">
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
				<Cell>Applied On</Cell>
				<Cell />
			</Row>
		</Head>
		<Body>
			{#if applicants.length === 0}
				<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
			{:else}
				{#each slice as item (item.id)}
					<Row>
						<Cell>{item.id}</Cell>
						<Cell>{item.appliedOn}</Cell>
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
				{start + 1}-{end} of {applicants.length}
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
