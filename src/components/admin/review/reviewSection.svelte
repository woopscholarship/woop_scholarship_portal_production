<script lang="ts">
	import ReviewSectionTitle from './reviewSectionTitle.svelte';
	import ReviewSectionItem from './reviewSectionItem.svelte';
	type ReviewItem = { label: string; value: any; type?: 'text' | 'image' | null };

	export let sectionTitle: {
		title: string;
		subtitle: string;
	};
	export let items: ReviewItem[];

</script>

<ReviewSectionTitle {...sectionTitle} />

<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
	<dl class="sm:divide-y sm:divide-gray-200">
		{#each items as item}
			<ReviewSectionItem {...item} />
		{/each}
	</dl>
</div>
