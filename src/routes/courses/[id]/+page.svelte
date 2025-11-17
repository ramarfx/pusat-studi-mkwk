<script lang="ts">
	import { Check, Edit, FileText, SquareArrowOutUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { data }: PageProps = $props();

	let formModal = $state(false);
	let error = $state('');

	let isLoading = $state(false);
	const onsubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ update }) => {
			await update({ invalidateAll: true, reset: true });
			isLoading = false;
		};
	};

	let rows = $derived([
		{
			header: 'Status Tugas',
			value: data.isSubmitted ? 'Sudah dikumpulkan' : 'Belum dikumpulkan',
			highlight: data.isSubmitted
		},
		{
			header: 'Status Penilaian',
			value: 'Belum dinilai',
			highlight: false
		},
		{
			header: 'Batas pengumpulan',
			value: data.course.deadline
				? data.course.deadline.toLocaleString('id-ID', {
						dateStyle: 'medium',
						timeStyle: 'short'
					})
				: '-',
			highlight: false
		},
		{
			header: 'Tanggal pengumpulan',
			value: data.isSubmitted
				? data.userSubmission?.created_at?.toLocaleString('id-ID', {
						dateStyle: 'medium',
						timeStyle: 'short'
					})
				: '-',
			highlight: false
		}
	]);
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

		<div class="overflow-hidden border border-gray-300">
			{#each rows as row (row.header)}
				<div
					class="grid grid-cols-1 border-b border-gray-200 last:border-b-0 md:grid-cols-[200px_1fr]"
				>
					<div class="bg-gray-50 p-3 font-medium text-gray-700">
						{row.header}
					</div>

					<div
						class="p-3 {row.highlight
							? 'bg-green-100 font-semibold text-green-800'
							: 'text-gray-900'}"
					>
						{row.value}
					</div>
				</div>
			{/each}

			<div class="grid grid-cols-1 md:grid-cols-[200px_1fr]">
				<div class="bg-gray-50 p-3 font-medium text-gray-700">File submissions</div>

				<div class="p-3">
					{#if data.isSubmitted}
						<a
							href={data.userSubmission?.file_url}
							class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
						>
							<span class="text-lg">📄</span>
							<span class="truncate">Lihat file saya</span>
							<span class="text-sm text-gray-500"></span>
						</a>

						<button
							onclick={() => (formModal = true)}
							class="mt-4 flex cursor-pointer items-center gap-4 rounded bg-emerald-600 px-4 py-2 text-white"
						>
							<Edit size={16} />
							{isLoading ? 'Loading...' : 'Edit Tugas'}
						</button>
					{:else}
						<form
							method="post"
							action="?/create"
							use:enhance={onsubmit}
							enctype="multipart/form-data"
						>
							<Input
								type="file"
								name="file"
								placeholder="Judul Materi"
								accept=".pdf,.doc,.docx,.ppt,.pptx"
							/>
							<button
								type="submit"
								name="action"
								value="create"
								class="mt-2 cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white"
								>{isLoading ? 'Loading...' : 'Submit Tugas'}</button
							>
						</form>
					{/if}
				</div>
			</div>
		</div>

		<!-- modal -->
		{#if data.isSubmitted && data.userSubmission}
			<Modal form bind:open={formModal} size="xs">
				<div class="flex flex-col space-y-6">
					<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Tugas</h3>
					{#if error}
						<Label color="red">{error}</Label>
					{/if}
					<form
						method="post"
						action="?/update"
						use:enhance={onsubmit}
						enctype="multipart/form-data"
						onsubmit={() => (formModal = false)}
					>
						<Input type="hidden" name="id" value={data.userSubmission.id} />
						<Input
							type="file"
							name="file"
							placeholder="Judul Materi"
							accept=".pdf,.doc,.docx,.ppt,.pptx"
							class="mb-4"
						/>

						<button
							type="submit"
							name="action"
							value="update"
							class="mb-4 w-full cursor-pointer rounded bg-emerald-600 px-4 py-2 text-center text-white"
							>Edit Tugas</button
						>
					</form>
				</div>
			</Modal>
		{/if}
	</div>
</main>
