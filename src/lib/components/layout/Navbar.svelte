<script lang="ts">
	import { page } from '$app/stores';
	import { asset } from '$app/paths';
	import { Home, Icon, Layers, LayoutDashboard, LogOut, Menu, User, X } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	let mobileOpen = $state(false);

	const toggleMobile = () => (mobileOpen = !mobileOpen);

	const links = [
		{ href: '/', label: 'Beranda', icon: Home },
		{ href: '/courses', label: 'Materi', icon: Layers },
		{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: true }
	];
</script>

<header class="sticky top-0 z-50 border-b border-emerald-100 bg-white">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2">
			<img src={asset('/img/logo-upn.png')} alt="logo" class="h-10 w-auto" />
			<div class="flex flex-col gap-0">
				<p class="text-lg leading-5 font-bold text-emerald-900 md:text-2xl">SISMATA</p>
				<span class="text-xs font-semibold text-emerald-900">Sistem Informasi Studi Mata Kuliah Wajib Kurikulum</span>
			</div>
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-1 text-sm md:flex">
			{#each  links.filter(link => !link.adminOnly || data.user?.is_admin) as { href, label, icon: Icon }}
				<a
					{href}
					class="flex items-center gap-2 rounded-md px-3 py-2 transition-colors
						{$page.url.pathname === href
						? 'bg-emerald-600 text-white'
						: 'text-emerald-800 hover:bg-emerald-100'}"
				>
					<Icon size={16} />
					<p>{label}</p>
				</a>
			{/each}

			{#if data.user}
				<p class="ml-4 text-emerald-800">Halo, {data.user?.username}</p>

				<!-- svelte-ignore a11y_consider_explicit_label -->
				<form action="/auth/logout" method="post">
					<button
						type="submit"
						class="ml-4 flex items-center gap-2 rounded-md bg-red-600 px-6 py-2 text-white transition-colors"
					>
						<LogOut size={16} class="text-white" />
						Logout
					</button>
				</form>
			{:else}
				<a
					href={'/auth/login'}
					class="ml-4 flex items-center gap-2 rounded-md border border-amber-600 px-3
						py-2 text-amber-600 transition-colors"
				>
					<User size={16} class="text-amber-600"></User>
					<p>Login</p>
				</a>
			{/if}
		</nav>

		<!-- Mobile menu button -->
		<button
			class="cursor-pointer rounded-md p-2 transition hover:bg-emerald-100 md:hidden"
			onclick={toggleMobile}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	<!-- Mobile dropdown -->
	{#if mobileOpen}
		<div
			transition:slide={{ duration: 300 }}
			class="border-t border-emerald-200 bg-emerald-50 md:hidden"
		>
			<ul class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
				{#each links as { href, label, icon: Icon }}
					<li>
						<a
							{href}
							class="flex items-center gap-3 rounded-md px-3 py-2 text-emerald-900 transition hover:bg-emerald-100"
							onclick={() => (mobileOpen = false)}
						>
							<Icon size={18} />
							{label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>
