<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/icon.png';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	
	
	let { children, data } = $props();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar {data} />

<main class="min-h-[calc(100vh-100px)]">
	{@render children()}
</main>

<!-- Footer -->
<footer
	class="py- flex h-[100px] items-center justify-center bg-gray-100 text-center text-sm text-emerald-800"
>
	Dibuat oleh Pusat Studi MKWK UPNVJ
</footer>
