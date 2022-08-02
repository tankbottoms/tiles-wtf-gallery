<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { i18n } from 'lingui_core/esm/index.js';
	import Store from '$utils/Store';
	export let config;
	const store = new Store(i18n);

	$: {
		store.set(i18n);
	}

	i18n.on('change', () => store.set(i18n));
	setContext('i18n', { subscribe: store.subscribe });
</script>

<!-- Inspiration taken by: https://github.com/hyperlab/svelte-lingui -->

<!-- TODO svelte complains that the component "is not a valid SSR component"
    regardless of adapter.

    When resolved, use intl;

    <Intl config={{
        locale: "en",
        catalogs: {
            en: {
            messages: {
                "Hello world": "Hello world"
            }
            },
            es: {
            messages: {
                "Hello world": "Hola mundo",
                "Hello {name}": "Hola {name}"
            }
            }
        }
        }}>
        <Trans> </Trans>
        or
        <Trans message="" props={} />
    </Intl>
  -->

<slot />
