<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import StatusBadge from '$root/components/statusBadge.svelte';
	import { page } from '$app/stores';
	import type { StudentApplication, User } from '@prisma/client';

	interface StudentApplications extends StudentApplication {
		studentUser: User;
	}

	export let studentApplications: StudentApplications[];

	console.log(studentApplications);

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, studentApplications.length);
	$: slice = studentApplications.slice(start, end);
	$: lastPage = Math.max(Math.ceil(studentApplications.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
		currentPage = lastPage;
	}
</script>

<h2 class="text-gray-700 text-lg font-semibold">Filter</h2>
<form method="POST" class="flex item-center justify-center my-4 gap-4" action={$page.url.pathname}>
	<select
		id="status"
		name="status"
		class="flex-1 w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
	>
		<option value="APPROVED" selected>APPROVED</option>
		<option value="PENDING">PENDING</option>
		<option value="REJECTED">REJECTED</option>
	</select>

	<input
		type="submit"
		class="flex-2  ursor-pointer h-auto px-10 py-2 bg-primary text-white "
		value="FILTER"
	/>
</form>

<DataTable table$aria-label="Todo list" style="width: 100%;">
	<Head>
		<Row>
			<Cell>ID</Cell>
			<Cell>Student Applicant</Cell>
			<Cell>Type</Cell>
			<Cell>Application Date</Cell>
			<Cell>Status</Cell>
			<Cell />
		</Row>
	</Head>
	<Body>
		{#if studentApplications.length === 0}
			<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
		{:else}
			{#each slice as item (item.id)}
				<Row>
					<Cell>{item.id}</Cell>
					<Cell class="flex items-center gap-4">
						<div>
							<img src={item.studentUser.profileImageUrl} alt={item.studentUser.displayName} />
						</div>
						<div class="flex flex-col">
							<span>{item.studentUser.displayName}</span>
							<span>{item.studentUser.email}</span>
						</div>
					</Cell>
					<Cell>{item.scholarshipProgramId ? 'Scholarship' : 'Grant'}</Cell>
					<Cell>{item.appliedOn}</Cell>
					<Cell><StatusBadge status={item.status} /></Cell>
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
			{start + 1}-{end} of {studentApplications.length}
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
