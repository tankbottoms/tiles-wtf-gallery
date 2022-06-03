<script lang="ts">
	import { darkMode } from '$stores';
	import ConnectButton from './ConnectButton.svelte';
	import DarkmodeToggle from './DarkmodeToggle.svelte';
	import Icon from './Icon.svelte';
	import LanguageSelectDropdown from './LanguageSelectDropdown.svelte';
	import { getContext } from 'svelte';
	import type { I18n } from 'lingui_core/esm';
	import type Store from '$jbx/utils/Store';
	import Trans from './Trans.svelte';
	import Collapse from './Collapse.svelte';
	import ResourceDropdown from './ResourceDropdown.svelte';

	const i18n = getContext('i18n') as Store<I18n>;
</script>

<header>
	<nav>
		<a href="/" style="display: inline-block;">
			<img
				src={$darkMode ? '/images/juice_logo-od.png' : '/images/juice_logo-ol.png'}
				alt="Juicebox logo"
				style="height: 40px;"
			/>
		</a>
		<a href="/projects"><Trans>Projects</Trans></a>		
		<a href="#faq"><Trans>FAQ</Trans></a>
		<a href="https://discord.gg/6jXrJSyDFf" target="_blank"><Trans>Discord</Trans></a>
		<ResourceDropdown />
	</nav>
	<div class="right-nav">
		<Collapse>
			<span class="centered">
				<Icon name="global" />
			</span>
			{$i18n.locale?.toUpperCase() || 'EN'}
			<div slot="content">
				<LanguageSelectDropdown opended={true} />
			</div>
		</Collapse>
		<DarkmodeToggle />
		<ConnectButton />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--background-l0);
		height: 64px;
		padding: 0 50px;
		color: var(--text-primary);
	}

	nav {
		flex: 1 1 0%;
		gap: 24px;
		line-height: 64px;
		display: flex;
	}

	nav a {
		cursor: pointer;
		align-items: center;
		font-weight: 600;
		color: var(--text-primary);
		padding: 0px 10px;
	}

	nav a:first-of-type {
		padding: 0px;
	}

	.centered {
		line-height: 0;
		margin-right: 10px;
	}

	.right-nav {
		display: flex;
		gap: 17px;
		align-items: center;
	}
	@media (max-width: 767px) {
		header {
			display: none !important;
		}
	}
</style>
