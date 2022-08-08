<script>
	import { onMount } from 'svelte/internal';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	const activeSidebarStyle = 'bg-indigo-50 group flex items-center px-3 py-2 text-sm font-medium border-l-4"'
	const defaultSidebarStyle = 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium border-l-4'

</script>

<div transition:fade class="flex border w-screen min-h-screen">
	<!-- This example requires Tailwind CSS v2.0+ -->
	<div class="flex flex-col flex-grow w-[20%] pt-5 pb-4 bg-white ">
		<div class="flex items-center flex-shrink-0 px-4 space-y-5">
			<img
				src="https://woopscholarship.com/wp-content/uploads/2022/06/logotype-wcolor-1.jpg"
				alt="woop Scholarship"
				class="w-32 h-auto"
				loading="lazy"
			/>
		</div>
		<div class="mt-5 flex-grow flex flex-col">
			<nav class="flex-1 bg-white space-y-1" aria-label="Sidebar">
				<!-- Current: "bg-indigo-50 border-indigo-600 text-indigo-600", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900" -->
				<a
					href="review-students"
					class={$page.url.pathname.includes('review-students') ? activeSidebarStyle : defaultSidebarStyle}
					sveltekit:prefetch

				>
					<!-- <svg
						class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg> -->
					Review Students
				</a>

				<a
					href="review-sponsors"
					class={$page.url.pathname.includes('review-sponsors') ? activeSidebarStyle : defaultSidebarStyle}
					sveltekit:prefetch

				>
					<!-- <svg
						class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
						/>
					</svg> -->
					Review Sponsors
				</a>

				<a
					href="review-scholarship-programs"
					class={$page.url.pathname.includes('review-scholarship-programs') ? activeSidebarStyle : defaultSidebarStyle}
					sveltekit:prefetch

				>
					<!-- Heroicon name: outline/folder -->
					<!-- <svg
						class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
						/>
					</svg> -->
					Review Scholarship Programs
				</a>

				<a
					href="review-student-applicants"
					class={$page.url.pathname.includes('review-student-applicants') ? activeSidebarStyle : defaultSidebarStyle}
					sveltekit:prefetch
				>
					<!-- Heroicon name: outline/calendar -->
					<!-- <svg
						class="text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg> -->
					Review Student Applicants
				</a>
			</nav>

			<p class="px-8 py-4"><a class="text-red-500 font-semibold" href="../login">Logout</a></p>
		</div>
	</div>

	<main class="min-h-screen w-[80%] border p-12 ">
		<slot />
	</main>
</div>
