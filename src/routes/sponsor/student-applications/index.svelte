<script lang="ts">
	import Topbar from '$root/components/dashboard/topbar.svelte';
	import Banner from '$root/components/dashboard/banner.svelte';
</script>

<Topbar
	title={'Student Applications'}
	username="Paul Bryan Reyes"
	userImageAddress={'https://i.ibb.co/fFj4t1s/IMG-6893.jpg'}
/>
<Banner text="Your Program has 25 Applications" />

<div class="flex gap-6 mt-6">
	<div class="w-1/3 bg-red-100 p-8 rounded">
		<h2 class="font-bold text-lg mb-10">Programs</h2>

		<div>
			<div class="bg-blue-200 flex p-4 gap-16 border-y border-black">
				<p class="font-semibold">Program Name</p>
				<p class="font-semibold">Type</p>
			</div>
		</div>

		<div class="w-full">
			<a href="#"><p class="m-0 bg-active hover:bg-active transition-colors p-5 py rounded text-dark">LGU Pagadian</p></a>
      <a href="#"><p class="m-0 p-5 hover:bg-active transition-colors py rounded text-dark">LGU Pagadian</p></a>
      <a href="#"><p class="m-0 p-5 py hover:bg-active transition-colors rounded text-dark">LGU Pagadian</p></a>
		</div>
	</div>

	<div class="w-2/3 bg-red-100 p-8 rounded">Table</div>
</div>
