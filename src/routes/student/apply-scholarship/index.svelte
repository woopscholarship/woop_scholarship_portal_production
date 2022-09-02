<script lang="ts">
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { page } from '$app/stores';

	export let scholarshipPrograms: any;

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

<!-- <StudentTopBar title='Apply Scholarship' userImageAddress={$currentUser.profileImageUrl} /> -->

{#if scholarshipPrograms}
	<DataTable $aria-label="Todo list" style="width: 100%;">
		<Head>
			<Row>
				<Cell>Name</Cell>
				<Cell>Location</Cell>
				<Cell>Applicant Count</Cell>
				<Cell />
			</Row>
		</Head>
		<Body>
			{#if scholarshipPrograms.length === 0}
				<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
			{:else}
				{#each slice as item (item.id)}
					<Row >
						<Cell>{item.name}</Cell>

						<Cell> <p class="mt-2 flex items-center text-sm text-gray-500">
							<!-- Heroicon name: solid/location-marker -->
							<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
							</svg>
							{item.city}, {item.state}, {item.country}
						</p></Cell>

						<Cell>{item.applicants.length} / {item.maxApplicants}</Cell>

						<Cell />
						<Cell />

						<Cell />
						<Cell />
						<Cell />

						<Cell
							><a class="p-4 py-2 bg-primary text-white" href={`${$page.url.pathname}/${item.id}`}
								>View</a
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
{/if}
