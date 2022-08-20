<script lang="ts">
	import { page } from '$app/stores';
	import ReviewSection from '$root/components/admin/review/reviewSection.svelte';
	import type { TableData } from '$root/types/component';
	import { Moon } from 'svelte-loading-spinners';

	export let profileImageUrl: string;
	export let tableData: TableData[] = [];
</script>

{#if !tableData && !profileImageUrl}
	<Moon size="60" color="#0fb7a6" unit="px" duration="1s" />
{:else}
	<div class="bg-white shadow overflow-hidden sm:rounded-lg">
		<div>
			<img class="m-6 w-64 h-auto" src={profileImageUrl} alt="" />
		</div>

		{#each tableData as data}
			<ReviewSection {...data} />
		{/each}
	</div>
{/if}

<!-- APPROVAL FORM -->
<form method="POST" class="mt-4 w-1/4" action={`${$page.url.pathname}`}>
	<div>
		<label for="status" class="block font-medium text-gray-700 text-lg">Status</label>
		<select
			id="status"
			name="status"
			class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border"
		>
			<option value="REJECTED">Reject</option>
			<option value="APPROVED">Approve</option>
		</select>
	</div>

	<input
		type="submit"
		class="cursor-pointer mt-4 px-10 py-2 bg-primary text-white"
		value="SUBMIT"
	/>
</form>
