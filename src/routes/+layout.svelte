<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/icon.png';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import { fade, slide } from 'svelte/transition';
	import { setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { navigating } from '$app/stores';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Loader from '$lib/components/Loader.svelte';

	let { children, data } = $props();

	setContext('currentUser', data.user);

	// Source - https://stackoverflow.com/a
	// Posted by tbdrz
	// Retrieved 2025-11-09, License - CC BY-SA 4.0

	let showLoader = $state(false);

	$effect(() => {
		if ($navigating) {
			const interval = setInterval(() => {
				showLoader = true;
			}, 300);

			return () => {
				showLoader = false;
				clearInterval(interval);
			};
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if showLoader}
	<div class="fixed z-9999 flex h-screen w-screen items-center justify-center flex-col bg-linear-to-br from-emerald-500 to-yellow-200">
		<Loader />
		<p class="mt-2 text-xl font-bold text-emerald-900">Loading...</p>
	</div>
{/if}

<Navbar {data} />

<main class="min-h-[calc(100vh-100px)]" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
	{@render children()}
</main>

<!-- Footer -->
<footer
	class="py- flex h-[100px] items-center justify-center bg-gray-100 text-center text-sm text-emerald-800"
>
	Dibuat oleh Pusat Studi MKWK UPNVJ
</footer>
