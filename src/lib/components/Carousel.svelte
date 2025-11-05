<script lang="ts">
	import { Carousel, CarouselIndicators, Controls } from 'flowbite-svelte';

	let { children } = $props();
	// ./imageData/+server.js has the following
	export const images = [
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/1.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/2.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/3.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/4.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/5.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/6.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/7.jpg',
			title: 'Pengantar MKWK'
		},
		{
			alt: 'Album dokumentasi',
			src: '/img/albums/8.jpg',
			title: 'Pengantar MKWK'
		}
	];
</script>

<Carousel {images} class="h-full sm:h-full xl:h-full 2xl:h-[60vh] w-full rounded-none" duration={3000}>
	<CarouselIndicators />
	<Controls />

	{@render children()}
</Carousel>
