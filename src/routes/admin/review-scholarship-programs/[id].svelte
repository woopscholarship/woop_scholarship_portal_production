<script lang="ts">
	import ReviewDetailsTable from '$root/components/admin/review/reviewDetailsTable.svelte';

	const sectionItems = [
		{
			sectionTitle: {
				title: 'User Details',
				subtitle: 'Primary account details '
			},
			items: []
		}
	];

	export let scholarshipProgram;
	console.log(scholarshipProgram);

	const profileImageUrl = '';
</script>

<ReviewDetailsTable {sectionItems} {profileImageUrl} />
