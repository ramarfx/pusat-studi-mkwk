<script lang="ts">
	import type { COURSE_TYPE } from "$lib/server/db/schema";

	export let title: string;
	export let description: string;
	export let href: string = '#';
	export let thumbnail: string;
	export let type: COURSE_TYPE
</script>

<a
	{href}
	class="group w-full cursor-pointer overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left transition hover:border-emerald-300 hover:shadow-lg"
>
	<div class="p-2 md:p-5">
		<!-- Gambar -->
		<div class="h-20 overflow-hidden rounded-xl md:h-[150px]">
			<img
				src={thumbnail ?? '/img/upn-front.png'}
				alt={title}
				class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
			/>
		</div>

		<!-- Judul -->
		<h3 class="mt-3 text-base font-semibold text-emerald-900 group-hover:text-emerald-700">
			{title}
		</h3>

		<!-- Deskripsi -->
		<p class="mt-1 text-xs text-emerald-800/80 truncate">
			{description}
		</p>

		<!-- Garis bawah -->
		<div class={`mt-2 h-1 bg-linear-to-r from-emerald-300 via-yellow-300 to-emerald-300`}></div>
	</div>
</a>
