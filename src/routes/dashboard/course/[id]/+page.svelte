<script lang="ts">
	import { Check, Edit, FileText, SquareArrowOutUpRight } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

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
</script>

<main class="">
	<div class="h-[250px] w-full bg-[url('/img/upn-front.jpg')] bg-cover bg-center">
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

	<div class="mx-auto mt-2 w-full border border-gray-200 bg-white px-4 py-8">
		<h1 class="mb-5 text-xl font-bold">Pengumpulan Tugas</h1>

		<Table striped={true}>
			<TableHead>
				<TableHeadCell>No.</TableHeadCell>
				<TableHeadCell>Nama</TableHeadCell>
				<TableHeadCell>Waktu pengumpulan</TableHeadCell>
				<TableHeadCell>File tugas</TableHeadCell>
			</TableHead>
			<TableBody>
				{#if data.submissions.length > 0}
					{#each data.submissions as submission, i}
						<TableBodyRow class="group border-0 bg-white">
							<TableBodyCell>{i + 1}</TableBodyCell>
							<TableBodyCell>{submission.user?.name}</TableBodyCell>
							
							<TableBodyCell
								>{new Date(submission.created_at).toLocaleString('id', {
									dateStyle: 'medium',
									timeStyle: 'short',
									timeZone: 'Asia/Jakarta',
									hour12: true
								})}</TableBodyCell
							>
							<TableBodyCell>
								<a href={submission.file_url} target="_blank" class="text-blue-500">Lihat file</a>
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				{:else}
					<TableBodyCell colspan={3} class="text-center"
						>Belum ada tugas yang dikumpulkan</TableBodyCell
					>
				{/if}
			</TableBody>
		</Table>
	</div>
</main>
