<script lang="ts">
	import UserTableView from "$root/components/admin/userTableView.svelte";
	import type { User } from '@prisma/client';
	export let users: User[];
</script>

<UserTableView {users} />