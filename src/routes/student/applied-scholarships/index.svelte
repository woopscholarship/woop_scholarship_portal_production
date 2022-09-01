<script lang="ts">
	import { goto } from '$app/navigation';
	import StatusBadge from '$root/components/statusBadge.svelte';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import { page } from '$app/stores';
	import { onMount } from 'svelte/internal';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { isLoggedIn, accountType, userId } from '$root/stores/authStore';



	let currentUser: any;
	export let studentApplications: any;

	onMount(async () => {
		const auth = getAuth();
		currentUser = auth.currentUser;

		if (!currentUser) {
			goto('/login');
		}

		onAuthStateChanged(auth, (user) => {
			if (!user) {
				isLoggedIn.update(() => false);
				accountType.update(() => '');
				userId.update(() => '');
				goto('/login');
			}
		});
	});


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

{#if studentApplications}
	<DataTable $aria-label="Todo list" style="width: 100%;">
		<Head>
			<Row>
				<Cell>Program Name</Cell>
				<Cell>Application Date</Cell>
				<Cell>Status</Cell>
			</Row>
		</Head>
		<Body>
			{#if studentApplications.length === 0}
				<p class="text-center p-4 bg-red-200">NO SCHOLARSHIP DATA FOUND</p>
			{:else}
				{#each slice as item (item.id)}
					{#if item.scholarshipProgramId !== null}
						<Row>
							<Cell>{item.scholarshipProgram.name}</Cell>
							<Cell>{item.appliedOn}</Cell>
							<Cell><StatusBadge status={item.status}/></Cell>
							<Cell><a class="p-4 py-2 bg-primary text-white" href={`${$page.url.pathname}/${item.id}`}
								>View</a
							></Cell>
						</Row>
					{/if}
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
{/if}
