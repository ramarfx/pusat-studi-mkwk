<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="h-[calc(100vh-100px)] w-full bg-[url('/img/upn-front.jpg')] bg-cover bg-center">
	<div class="h-full w-full bg-linear-to-tr from-emerald-500/60 to-black/60 py-10">
		<div class="flex h-full w-full items-center justify-center">
			<div class="h-full w-[500px] rounded bg-white p-12 shadow-2xl">
				<!-- logo -->
				<a href="/" class="flex w-full items-center justify-center gap-2">
					<img src={'/img/logo.png'} alt="logo" class="h-[100px] w-auto" />
					<div class="flex flex-col gap-0">
						<p class="leading-base text-lg font-bold text-emerald-900 md:text-5xl">SIMATA</p>
						<span class="text-xs font-semibold text-emerald-900 md:text-base"
							>Pusat Studi MKWK UPNVJ</span
						>
					</div>
				</a>

				<form action="" class="mt-10">
					<div class="mb-6">
						<Label for="username">Username</Label>
						<Input id="username" placeholder="Username" />
					</div>
					<div class="mb-6">
						<Label for="username">Password</Label>
						<Input type="password" id="username" placeholder="Password" />
					</div>

					<div class="mb-6">
						<button
							type="submit"
							class="w-full cursor-pointer rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
							>Login</button
						>
						<a href="#/" class="mt-2 block text-sm text-emerald-600 hover:underline"
							>Lupa Password?</a
						>
					</div>
				</form>

				<hr class="mb-3 border-gray-400" />

				<div class="">
					<p class="mb-2 text-base font-medium text-emerald-950">
						Beberapa Materi dapat di akses melalui Guest
					</p>
					<a
						href="/courses"
						class="w-full inline-block text-center rounded bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
						>Login sebagai Guest</a
					>
				</div>
			</div>
		</div>
	</div>
</main>
