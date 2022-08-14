<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import StatusBadge from '$root/components/statusBadge.svelte';
	import { page } from '$app/stores';
	import type { ScholarshipProgram, User } from '@prisma/client';

	interface ScholarshipPrograms extends ScholarshipProgram {
		sponsorUser: User;
	}

	export let scholarshipPrograms: ScholarshipPrograms[];

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, scholarshipPrograms.length);
	$: slice = scholarshipPrograms.slice(start, end);
	$: lastPage = Math.max(Math.ceil(scholarshipPrograms.length / rowsPerPage) - 1, 0);

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
			<Cell>Sponsor</Cell>
			<Cell>Scholarship Name</Cell>
			<Cell>Status</Cell>
			<Cell>Program Type</Cell>
			<Cell>Location</Cell>
		</Row>
	</Head>
	<Body>
		{#if scholarshipPrograms.length === 0}
			<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
		{:else}
			{#each slice as item (item.id)}
				<Row>
					<Cell>{item.id}</Cell>
					<Cell class="p-4">
						<div><img class="rounded" src={item.sponsorUser.profileImageUrl} alt="" /></div>
						<div>{item.sponsorUser.displayName}</div>
						<div class="text-xs text-gray-700">{item.sponsorUser.email}</div>
					</Cell>
					<Cell>{item.name}</Cell>
					<Cell><StatusBadge status={item.reviewStatus} /></Cell>
					<Cell>{item.scholarshipType}</Cell>
					<Cell>
						{item.city}, {item.state}, {item.country}
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
			{start + 1}-{end} of {scholarshipPrograms.length}
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
