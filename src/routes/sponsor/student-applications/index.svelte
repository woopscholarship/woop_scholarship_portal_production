<script lang="ts">
	import ProgramOption from '$root/components/sponsor/programOption.svelte';
	import { page } from '$app/stores';
	import DataTable, { Head, Body, Row, Cell, Pagination } from '@smui/data-table';
	import Select, { Option } from '@smui/select';
	import IconButton from '@smui/icon-button';
	import { Label } from '@smui/common';
	import Loader from '$root/components/common/loader.svelte';

	import type {
		ScholarshipProgram,
		StudentApplication,
		User,
		PersonalInformation
	} from '@prisma/client';

	import Topbar from '$root/components/dashboard/topbar.svelte';
	import Banner from '$root/components/dashboard/banner.svelte';

	interface _ScholarshipProgram extends ScholarshipProgram {
		applicants: any;
	}

	interface _StudentApplication extends StudentApplication {
		studentUser: _User;
	}

	interface _User extends User {
		userDetails: PersonalInformation;
	}

	export let scholarshipPrograms: _ScholarshipProgram[];
	export let currentIndex: number;

	let programs = [...scholarshipPrograms];
	let applicants: _StudentApplication[] = programs[currentIndex].applicants;

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

<Banner text={`Your Program has ${programs[currentIndex].applicants.length} Applications`} />

{#if !applicants}
	<Loader />
{:else}
	<div class="flex mt-6 gap-4 ">
		<form
			class="flex flex-col gap-4 w-1/4 overflow-hidden p-4 bg-white mb-4 shadow-sm"
			method="POST"
			action={$page.url.pathname}
		>
			<h2 class="font-bold text-lg mb-4">Programs</h2>

			<select class="border p-1 py-2" name="program" id="program">
				{#each scholarshipPrograms as program}
					<ProgramOption {program} />
				{/each}
			</select>

			<input
				type="submit"
				value="Filter"
				class="bg-primary text-white px-6 py-2 rounded hover:cursor-pointer"
			/>
		</form>

		<DataTable table$aria-label="Todo list" class="w-3/4">
			<Head>
				<Row>
					<Cell>Student Name</Cell>
					<Cell>Email</Cell>
					<Cell>Application Date</Cell>
					<Cell />
				</Row>
			</Head>

			{#if programs[currentIndex].applicants.length === 0}
				<p class="text-center p-4 ">No Student Applicants Found</p>
			{:else}
				<Body>
					{#each slice as applicant (applicant.id)}
						<Row>
							<Cell>
								<div class="flex items-center gap-4">
									<img
										src={applicant.studentUser.profileImageUrl}
										alt={applicant.studentUser.displayName}
										class="w-10 h-10 rounded-full"
									/>
									{applicant.studentUser.displayName}
								</div>
							</Cell>
							<Cell>{applicant.studentUser.email}</Cell>
							<Cell>{applicant.appliedOn}</Cell>
							<Cell class="text-center"
								><a
									href={`${$page.url.pathname}/${applicant.id}`}
									class="text-white font-light bg-primary px-4 py-2 rounded">View Student</a
								></Cell
							>
						</Row>
					{/each}
				</Body>
			{/if}

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
	</div>
{/if}
