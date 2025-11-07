<script lang="ts">
	export let title: string;
	export let description: string;
	export let href: string = '#';
</script>

<a
	{href}
	class="group w-full cursor-pointer overflow-hidden rounded-2xl border border-emerald-100 bg-white text-left transition hover:border-emerald-300 hover:shadow-lg"
>
	<div class="p-2 md:p-5">
		<!-- Gambar -->
		<div class="h-20 overflow-hidden rounded-xl md:h-[150px]">
			<img
				src={'/img/upn-front.jpg'}
				alt={title}
				class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
			/>
		</div>

		<!-- Judul -->
		<h3 class="mt-3 text-base font-semibold text-emerald-900 group-hover:text-emerald-700">
			{title}
		</h3>

		<!-- Deskripsi -->
		<p class="mt-1 text-xs text-emerald-800/80">
			{description}
		</p>

		<!-- Garis bawah -->
		<div class={`mt-2 h-1 bg-linear-to-r from-emerald-300 via-yellow-300 to-emerald-300`}></div>
	</div>
</a>
