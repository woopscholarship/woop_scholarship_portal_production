<script lang="ts">
	import { page } from '$app/stores';
	import ReviewSection from '$root/components/admin/review/reviewSection.svelte';

	interface SectionTitle {
			title: string;
			subtitle: string;
		}

	interface SectionItems {
			label: string;
			value: any;
			type?: 'text' | 'image' | any;
	}

	interface Section {
		sectionTitle: SectionTitle;
		items: SectionItems[];
	}

	export let profileImageUrl: string;
	export let sectionItems: Section[] = [];
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
	<div>
		<img class="m-6 w-64 h-auto" src={profileImageUrl} alt="" />
	</div>

	{#each sectionItems as section}
		<ReviewSection {...section} />
	{/each}
</div>

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
