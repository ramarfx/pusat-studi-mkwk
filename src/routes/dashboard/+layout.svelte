<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// State untuk mengontrol apakah sidebar terbuka atau tertutup (opsional)
	let isSidebarOpen = $state(true);

	// Data dummy untuk navigasi sidebar
	const navItems = [
		{ name: 'Beranda', href: '/dashboard' },
		{ name: 'Materi', href: '/dashboard/course' },
		{ name: 'Pengaturan', href: '/settings' },
		{ name: 'Keluar', href: '/logout' }
	];
</script>

<div class="flex h-screen bg-gray-100">
	<Sidebar items={navItems} bind:isOpen={isSidebarOpen} />

	<div class="flex-1 ml-72 py-4 pr-5">
		{@render children()}
	</div>
</div>
