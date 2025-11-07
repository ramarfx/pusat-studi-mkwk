<script lang="ts">
	import { page } from '$app/stores';

	export let items: { name: string; href: string }[] = [];
	export let isOpen: boolean;

	const sidebarWidth = 'w-64';
	const activeClass = 'bg-emerald-500 text-white shadow-lg';
	const inactiveClass = 'text-gray-600 hover:bg-emerald-100 hover:text-emerald-700';
</script>

<aside
	class="
		inset-y-0 left-0 transform transition duration-200 ease-in-out md:fixed md:translate-x-0
		{sidebarWidth} fixed top-0 z-30 bg-white
		{isOpen ? 'translate-x-0' : '-translate-x-full'}
	"
>
	<div class="flex h-16 items-center justify-center border-b border-gray-200">
		<h2 class="text-2xl font-extrabold text-emerald-600">MKWK UPNVJ</h2>
	</div>

	<nav class="space-y-2 p-4">
		{#each items as item}
			<a
				href={item.href}
				class="flex items-center space-x-3 rounded-lg p-3 font-semibold transition-colors duration-150 ease-in-out
					{$page.url.pathname === item.href ? activeClass : inactiveClass}"
			>
				<span>{item.name}</span>
			</a>
		{/each}
	</nav>
</aside>
