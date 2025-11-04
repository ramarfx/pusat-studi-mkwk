<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	const cards = [
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		},
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		},
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		},
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		},
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		},
		{
			image: '/img/upn-front.jpg',
			title: 'Pengantar MKWK',
			description: 'Pengantar MKWK UPNVJ',
			href: '#/'
		}
	];
</script>

<main class="mx-auto max-w-6xl px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold">Materi MKWK</h1>

	<div class="grid grid-cols-1 justify-between gap-4 md:grid-cols-3">
		{#each cards as card}
			<Card {...card} />
		{/each}
	</div>
</main>
