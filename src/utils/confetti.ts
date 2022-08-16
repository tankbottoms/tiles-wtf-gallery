import confetti from 'canvas-confetti';

export function startConfetti() {
	const end = Date.now() + 3000;
	(function frame() {
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
	return () => confetti.reset();
}
