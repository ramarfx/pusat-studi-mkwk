<script lang="ts">
	import { Input, Label, Textarea } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
</script>

<div class="w-full">
	<h1 class="mb-4 text-2xl font-bold">Update Materi MKWK</h1>

	<form method="post" use:enhance enctype="multipart/form-data">
		<input type="hidden" name="id" value={data.course?.id} />
		<div class="mb-4">
			<Label for="title">Judul Materi</Label>
			<Input type="text" name="title" value={data.course?.title} placeholder="Judul Materi" />
		</div>
		<div class="mb-4">
			<Label for="description">Deskripsi (abaikan jika tidak ingin diubah)</Label>
			<Textarea
				name="description"
				value={data.course?.description}
				placeholder="Judul Materi"
				class="w-full"
			></Textarea>
		</div>
		<div class="mb-4">
			<Label for="file">File Materi</Label>
			<Input
				type="file"
				name="file"
				placeholder="Judul Materi"
				accept=".pdf,.doc,.docx,.ppt,.pptx"
			/>
		</div>

		<button type="submit" class="mb-4 cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white"
			>Update Materi</button
		>
	</form>
</div>
