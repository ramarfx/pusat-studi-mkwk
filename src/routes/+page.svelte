<script>
	import Card from '$lib/components/Card.svelte';
	import Carousel from '$lib/components/Carousel.svelte';

	let { data } = $props();
</script>

<!-- jumbotron -->
<section class="h-[40vh] w-full md:h-[60vh]">
	<div class="relative h-full w-full">
		<Carousel>
			<div
				class="z-20 flex h-full w-full flex-col items-center gap-10 bg-linear-to-tr from-emerald-500/50 to-black/50"
			>
				<div class="mt-4 mb-20">
					<h1 class="text-center text-4xl font-bold text-emerald-50 md:text-8xl">
						PUSAT <br /> MKWK UPNVJ
					</h1>
				</div>

				<a
					href={data.user ? '/courses' : '/auth/login'}
					class="cursor-pointer bg-yellow-500 px-16 py-2 text-lg font-bold text-white shadow hover:bg-emerald-600"
				>
					Mulai</a
				>
			</div>
		</Carousel>
	</div>
	<div class="h-2 bg-linear-to-r from-emerald-300 via-yellow-300 to-emerald-300"></div>
</section>

<!-- Cards -->
<section class="mx-auto mt-10 w-full max-w-6xl px-4 pb-10">
	<div class="mb-5 flex items-center justify-between">
		<h5 class="text-2xl font-bold">Materi terkini</h5>
	</div>

	<div class="grid grid-cols-2 justify-between gap-4 md:grid-cols-3">
		{#each data.courses as course}
			<Card
				title={course.title}
				description={course.description}
				href={`/courses/${course.id}`}
				thumbnail={course.thumbnail ?? ''}
				type={course.type}
			/>
		{/each}
	</div>
</section>
