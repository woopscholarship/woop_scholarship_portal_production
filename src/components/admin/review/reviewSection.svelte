<script lang="ts">
	import type { ReviewTableTitle, ReviewTableItem } from '$root/types/component';
	import ReviewSectionTitle from './reviewSectionTitle.svelte';
	import ReviewSectionItem from './reviewSectionItem.svelte';

	export let title: ReviewTableTitle;
	export let items: ReviewTableItem[];

</script>

<ReviewSectionTitle {...title} />

<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
	<dl class="sm:divide-y sm:divide-gray-200">
		{#each items as item}
			<ReviewSectionItem {...item} />
		{/each}
	</dl>
</div>
