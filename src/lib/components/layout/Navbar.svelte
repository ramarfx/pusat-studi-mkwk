<script lang="ts">
	import { asset } from '$app/paths';
	import { Home, Layers, Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let mobileOpen = false;

	const toggleMobile = () => (mobileOpen = !mobileOpen);

	const links = [
		{ href: '#/', label: 'Beranda', icon: Home },
		{ href: '#/courses', label: 'Materi', icon: Layers }
	];
</script>

<header class="sticky top-0 z-50 border-b border-emerald-100 bg-white">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<!-- Logo -->
		<a href="#/" class="flex items-center gap-2">
			<img src={asset('/img/logo.png')} alt="logo" class="h-10 w-auto" />
			<span class="text-lg font-semibold text-emerald-900">Pusat Studi MKWK UPNVJ</span>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-1 text-sm md:flex">
			{#each links as { href, label, icon: Icon }}
				<a
					href={href}
					class="flex items-center gap-2 rounded-md px-3 py-2 transition-colors
						{href === '#/' ? 'bg-emerald-600 text-white' : 'text-emerald-800 hover:bg-emerald-100'}"
				>
					<Icon size={16} />
					<p>{label}</p>
				</a>
			{/each}
		</nav>

		<!-- Mobile menu button -->
		<button
			class="md:hidden rounded-md p-2 hover:bg-emerald-100 transition"
			on:click={toggleMobile}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	<!-- Mobile dropdown -->
	<div
		class={`md:hidden transition-all duration-300 overflow-hidden bg-emerald-50 border-t border-emerald-200 ${
			mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
		}`}
	>
		<ul class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
			{#each links as { href, label, icon: Icon }}
				<li>
					<a
						href={href}
						class="flex items-center gap-3 rounded-md px-3 py-2 text-emerald-900 hover:bg-emerald-100 transition"
						on:click={() => (mobileOpen = false)}
					>
						<Icon size={18} />
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</header>
