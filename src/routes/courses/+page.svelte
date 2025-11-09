<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { X } from '@lucide/svelte';
	import { Select } from 'flowbite-svelte';
	import { derived, writable } from 'svelte/store';

	const { data } = $props();
	const search = writable('');
	const typeFilter = writable('all');

	const cards = data.courses;

	const filteredCards = derived([search, typeFilter], ([$search, $typeFilter]) => {
		const q = $search.toLowerCase().trim();

		return cards.filter((card) => {
			const matchesSearch =
				card.title.toLowerCase().includes(q) || card.description.toLowerCase().includes(q);
			const matchesType = $typeFilter === 'all' ? true : card.type === $typeFilter;

			return matchesSearch && matchesType;
		});
	});
</script>

<main class="mx-auto max-w-6xl px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold">Materi MKWK</h1>

	<!-- search -->
	<div class="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
		<input
			type="text"
			name="search"
			bind:value={$search}
			class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
			placeholder="Cari Materi"
		/>

		<Select bind:value={$typeFilter} class="w-full md:w-48">
			<option value="all">Semua Jenis</option>
			<option value="individu">Individu</option>
			<option value="kelompok">Kelompok</option>
		</Select>
	</div>

	{#if $filteredCards.length > 0}
		<div class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
			{#each $filteredCards as card}
				<Card {...card} href={`/courses/${card.id}`} />
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-16 text-center text-gray-500">
			<X class="mb-5" />
			<p class="text-lg font-medium">Tidak ada hasil yang ditemukan</p>
			<p class="mt-1 text-sm text-gray-400">Coba kata kunci lain, ya.</p>
		</div>
	{/if}
</main>
