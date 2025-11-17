<script lang="ts">
	import { Datepicker, Input, Label, Select, Spinner, Textarea } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let selectedDate = $state<Date | undefined>(undefined);

	let isLoading = $state(false);

	const onsubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	};
</script>

<div class="w-full">
	<h1 class="mb-4 text-2xl font-bold">Tambah Materi MKWK</h1>

	<form method="post" use:enhance={onsubmit} enctype="multipart/form-data">
		<input type="hidden" name="deadline" value={selectedDate} />
		<div class="mb-4">
			<Label for="title">Judul Materi</Label>
			<Input type="text" name="title" placeholder="Judul Materi" required />
		</div>
		<div class="mb-4">
			<Label for="type">Jenis Tugas</Label>
			<Select name="type" placeholder="Pilih Jenis Tugas" required>
				<option value="individu">Individu</option>
				<option value="kelompok">Kelompok</option>
			</Select>
		</div>
		<div class="mb-4">
			<Label for="thumbnail"
				>Thumbnail Materi <span class="text-xs text-gray-500">(png, jpg, jpeg)</span></Label
			>
			<Input
				type="file"
				name="thumbnail"
				placeholder="Thumbnail Materi"
				accept="image/*"
				required
			/>
		</div>
		<div class="mb-4">
			<Label for="description">Deskripsi</Label>
			<Textarea name="description" placeholder="Judul Materi" class="min-h-[150px] w-full" required
			></Textarea>
		</div>
		<div class="mb-4">
			<Label for="file"
				>File Materi <span class="text-xs text-gray-500">(pdf, doc, docx, ppt, pptx)</span></Label
			>
			<Input
				type="file"
				name="file"
				placeholder="Judul Materi"
				accept=".pdf,.doc,.docx,.ppt,.pptx"
				required
			/>
		</div>
		<div class="mb-4">
			<Label for="video">Video Materi <span class="text-xs text-gray-500">(Opsional)</span></Label>
			<Input type="url" name="video" placeholder="Link video materi" />
		</div>
		<div class="mb-4 w-full md:w-1/2">
			<Label for="deadline">Deadline</Label>
			<Datepicker bind:value={selectedDate} availableFrom={new Date()} required />
		</div>

		<button type="submit" class="mb-4 cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white">
			{#if isLoading}
				<Spinner size="4" /> Loading...
			{:else}
				Tambah Materi
			{/if}
		</button>
	</form>
</div>
