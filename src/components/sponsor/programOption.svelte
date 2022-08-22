<script lang="ts">
	export let program: any;
	let programId: string = String(program.id);
</script>




<option
type="radio"
value={programId}
>{program.name}</option>