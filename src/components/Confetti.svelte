<script lang="ts">
	import confetti from 'canvas-confetti';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isMounted = false;

	onMount(async () => {
		isMounted = true;
		if (true) {
			await startConfetti();
		} else {
			history.back();
		}

		return () => {
			isMounted = false;
			confetti.reset();
		};
	});

	async function startConfetti() {
		const end = Date.now() + 3000;
		(function frame() {
			if (!isMounted) return confetti.reset();
			confetti({
				particleCount: 5,
				startVelocity: 50,
				angle: 60,
				spread: 175,
				origin: { x: 0 }
			});

			confetti({
				particleCount: 5,
				startVelocity: 50,
				angle: 120,
				spread: 175,
				origin: { x: 1 }
			});

			if (Date.now() < end) {
				requestAnimationFrame(frame);
			}
		})();
	}

	$: if (isMounted) {
		let first = true;
		page.subscribe(() => {
			if (!first) window.location.reload();
			first = false;
		});
	}
</script>

<style lang="scss">
	.wrap {
		padding: 0 0;
		padding-bottom: 1.875rem;
	}

	@media (max-width: 767px) {
		.wrap {
			padding: 2.188rem 0;
		}
	}
</style>
