<script lang="ts">
	export let name: string;
	export let label: string;
	export let type: string;
	export let placeholder: string;
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
	<div class="mt-1">
		<input
			{type}
			{name}
			id={name}
			class="shadow-sm focus:outline-primary focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
			{placeholder}
		/>
	</div>
</div>
