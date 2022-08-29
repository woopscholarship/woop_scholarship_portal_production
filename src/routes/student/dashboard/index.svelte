<script lang='ts'>
	import { currentUser } from '$root/stores/authStore';
	import StudentTopBar from '$root/components/student/studentTopBar.svelte';
</script>

<StudentTopBar title='Dashboard' userImageAddress={$currentUser.profileImageUrl} />
