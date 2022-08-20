<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';
	import type { ReviewTableItem } from '$root/types/component';
	export let profileImageUrl: string;
	export let tableData: ReviewTableItem[];
</script>

<ReviewDetailsTable {tableData} {profileImageUrl} />
