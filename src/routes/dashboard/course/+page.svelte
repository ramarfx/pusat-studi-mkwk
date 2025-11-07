<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="w-full">
	<h1 class="mb-4 text-2xl font-bold">Materi MKWK</h1>

	<div class="flex justify-end">
		<a href="/dashboard/course/create" class="mb-4 rounded bg-emerald-600 px-4 py-2 text-white"
			>Tambah Materi</a
		>
	</div>
	<Table striped={true}>
		<TableHead>
			<TableHeadCell>No.</TableHeadCell>
			<TableHeadCell>Judul</TableHeadCell>
			<TableHeadCell>File</TableHeadCell>
			<TableHeadCell>Aksi</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each data.courses as course, i}
				<TableBodyRow>
					<TableBodyCell>{i + 1}</TableBodyCell>
					<TableBodyCell>{course.title}</TableBodyCell>
					<TableBodyCell>
						<a href={course.file} target="_blank" class="text-blue-500">Lihat file</a>
					</TableBodyCell>
					<TableBodyCell>Edit | Hapus</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
