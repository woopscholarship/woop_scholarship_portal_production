<script lang="ts">
	import { onMount } from 'svelte/internal';

	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';

	export let scholarshipPrograms: any[];
	$: studentsLength = 0;

	onMount(() => {
		studentsLength = scholarshipPrograms.length;
		console.log(scholarshipPrograms[0]);
	});

	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, scholarshipPrograms.length);
	$: slice = scholarshipPrograms.slice(start, end);
	$: lastPage = Math.max(Math.ceil(scholarshipPrograms.length / rowsPerPage) - 1, 0);
</script>

{#if studentsLength > 0}
	<DataTable table$aria-label="Todo list" style="width: 100%;">
		<Head>
			<Row>
				<Cell class="text-left ">Student</Cell>
				<Cell class="text-left ">Applying For</Cell>
				<Cell class="text-left ">Approval Status</Cell>
				<Cell />
			</Row>
		</Head>
		<Body>
			{#each slice as data (data.id)}
				<Row>
					<Cell class="text-left">
						{data.studentUser.displayName}
						<br />
						<span class="text-xs text-gray-600">{data.studentUser.email}</span>
					</Cell>

					<Cell class="text-left"
						>{data.grantProgram ? data.grantProgram.name : data.scholarshipProgram.name}</Cell
					>
					<Cell class="text-left">
						{#if data.grantProgram}
							{#if data.grantProgram.reviewStatus === 'PENDING'}
								<span
									class="bg-orange-100 px-4 py-2 text-xs rounded-lg text-orange-600 font-semibold"
									>Pending</span
								>
							{:else if data.grantProgram.reviewStatus === 'APPROVED'}
								<span class="bg-green-100 px-4 py-2 text-xs rounded-lg text-green-600 font-semibold"
									>Approved</span
								>
							{:else}
								<span class="bg-red-100 px-4 py-2 text-xs rounded-lg text-red-600 font-semibold"
									>Rejected</span
								>
							{/if}
						{/if}

						{#if data.scholarshipProgram}
							{#if data.scholarshipProgram.reviewStatus === 'PENDING'}
								<span
									class="bg-orange-100 px-4 py-2 text-xs rounded-lg text-orange-600 font-semibold"
									>Pending</span
								>
							{:else if data.scholarshipProgram.reviewStatus === 'APPROVED'}
								<span class="bg-green-100 px-4 py-2 text-xs rounded-lg text-green-600 font-semibold"
									>Approved</span
								>
							{:else}
								<span class="bg-red-100 px-4 py-2 text-xs rounded-lg text-red-600 font-semibold"
									>Rejected</span
								>
							{/if}
						{/if}
					</Cell>

					<Cell class="text-center "
						><a href={`review-student-applicants/${data.id}`}
							><button class="px-4 py-2">Review</button></a
						></Cell
					>
				</Row>
			{/each}
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

		<form action="">
			<h2>Filter</h2>
			<label for="">Approval Status</label>
			<select name="" id="">
				<option value="" />
			</select>
		</form>
	</DataTable>
{:else}
	Loading...
{/if}
