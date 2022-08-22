<script lang="ts">
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
	

	
	
	export let scholarshipPrograms: _ScholarshipProgram[];

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



	function truncate(str: string, n: number){
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

</script>

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
