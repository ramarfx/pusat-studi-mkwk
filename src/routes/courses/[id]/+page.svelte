<script lang="ts">
	import { FileText, SquareArrowOutUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { Input } from 'flowbite-svelte';

	let { data }: PageProps = $props();
</script>

<main class="">
	<div class="h-[300px] w-full bg-[url('/img/upn-front.jpg')] bg-cover bg-center">
		<div class="h-full w-full bg-linear-to-tr from-emerald-500/50 to-black/50 px-4 py-8">
			<div class="mx-auto h-full w-full max-w-6xl">
				<div class="flex h-full w-full flex-col items-center justify-center">
					<h1 class="mb-3 text-3xl font-bold text-white">{data.course?.title}</h1>
					<p class="text-base font-semibold text-white">
						PROGRAM TRAINING of TRAINERS MATA KULIAH WAJIB KURIKULUM (MKWK) BAGI CALON DOSEN MKWK
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="mx-auto mt-2 max-w-6xl border border-gray-200 px-4 py-8">
		<h1 class="text-xl font-bold">{data.course?.title}</h1>
		<p>{data.course?.description}</p>

		<h1 class="my-2 mt-4 text-xl font-bold">Materi</h1>
		<a
			href={data.course?.file}
			class="flex items-center gap-2 text-blue-500 underline underline-offset-2"
		>
			<FileText size={16} />
			Lihat dokumen
			<SquareArrowOutUpRight size={14} />
		</a>

        <h1 class="my-2 mt-4 text-xl font-bold">Pengumpulan Tugas <span class="text-sm font-normal text-gray-500">(pdf, doc, docx, ppt, pptx)</span></h1>
        <div class="mb-4">
            <Input type="file" name="file" placeholder="Judul Materi" accept=".pdf,.doc,.docx,.ppt,.pptx" />
        </div>
        <button type="submit" class="mb-4 rounded bg-emerald-600 px-8 py-2 text-white cursor-pointer">Submit</button>
	</div>
</main>
