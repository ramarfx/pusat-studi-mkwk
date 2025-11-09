<script lang="ts">
	import { Check, Edit, FileText, SquareArrowOutUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();

	let formModal = $state(false);
	let error = $state('');

	function onaction({ action, data }: { action: string; data: FormData }) {
		error = '';
		// Check the data validity, return false to prevent dialog closing; anything else to proceed
		if (action === 'login' && (data.get('password') as string)?.length < 4) {
			error = 'Password must have at least 4 characters';
			return false;
		}
	}
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
			Lihat dokumen materi
			<SquareArrowOutUpRight size={14} />
		</a>

		<h1 class="my-2 mt-4 text-xl font-bold">
			Pengumpulan Tugas <span class="text-sm font-normal text-gray-500"
				>(pdf, doc, docx, ppt, pptx)</span
			>
		</h1>
		{#if data.user.submissions.some((sub) => sub.course_id === data.course.id)}
			<p class="flex items-center text-green-500">
				<Check size={16} />
				Anda telah mengumpulkan tugas ini
			</p>
			<a
				href={data.user.submissions.find((sub) => sub.course_id === data.course.id)?.file_url}
				class="flex items-center gap-2 text-blue-500 underline underline-offset-2"
			>
				<FileText size={16} />
				Lihat dokumen anda
				<SquareArrowOutUpRight size={14} />
			</a>

			<button
				onclick={() => (formModal = true)}
				class="mt-4 flex cursor-pointer items-center gap-4 rounded bg-emerald-600 px-4 py-2 text-white"
			>
				<Edit size={16} /> Edit Tugas
			</button>
		{:else}
			<form method="post" use:enhance enctype="multipart/form-data">
				<Input
					type="file"
					name="file"
					placeholder="Judul Materi"
					accept=".pdf,.doc,.docx,.ppt,.pptx"
				/>
				<button
					type="submit"
					class="mb-4 cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white"
					>Tambah Tugas</button
				>
			</form>
		{/if}
	</div>

	<!-- modal -->
	<Modal form bind:open={formModal} size="xs" {onaction}>
		<div class="flex flex-col space-y-6">
			<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Tugas</h3>
			{#if error}
				<Label color="red">{error}</Label>
			{/if}
			<form method="post" use:enhance enctype="multipart/form-data">
				<Input
					type="file"
					name="file"
					placeholder="Judul Materi"
					accept=".pdf,.doc,.docx,.ppt,.pptx"
					class="mb-4"
				/>

				<button
					type="submit"
					class="mb-4 cursor-pointer w-full text-center rounded bg-emerald-600 px-4 py-2 text-white"
					>Edit Tugas</button
				>
			</form>
		</div>
	</Modal>
</main>
