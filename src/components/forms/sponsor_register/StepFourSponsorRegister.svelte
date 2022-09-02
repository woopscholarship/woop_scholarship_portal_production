<script lang="ts">
	import InlineContainer from '$root/components/container/InlineContainer.svelte';
</script>


<InlineContainer>
	<!-- Calendly inline widget begin -->
	<div
		class="calendly-inline-widget"
		data-url="https://calendly.com/paulreyesdigital/30min"
		style="min-width:100%;height:30rem;"
	/>
	<script
		type="text/javascript"
		src="https://assets.calendly.com/assets/external/widget.js"
		async></script>
	<!-- Calendly inline widget end -->
</InlineContainer>
