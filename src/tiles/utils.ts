function getMatrixString(SVGMatrix) {
	return `matrix(${SVGMatrix.a},${SVGMatrix.b},${SVGMatrix.c},${SVGMatrix.d},${SVGMatrix.e},${SVGMatrix.f})`;
}

export function getTileAnimationStyleString(tileComponent) {
	console.log(tileComponent);
	const numberOfG = 29;
	// Pick, randomly, numbers from 0 to numberOfG to spin
	const nSpinPieces = Array.from({ length: 7 }, () => Math.floor(Math.random() * numberOfG));

	const pieces = tileComponent.querySelectorAll('g > g > g');

	let styles = `
					@keyframes fade {
						0% {
							opacity: 1;
						}
						50% {
							opacity: 0.1;
						}
						100% {
							opacity: 1;
						}
					}
				`;

	pieces.forEach((piece, index) => {
		const randomSeconds = Math.random() + 2 * 15;

		const styleClass = `piece${index}`;
		let classValue = `
				animation: fade ${randomSeconds}s ease-in-out ${Math.random() * 20}s infinite
				`;

		if (nSpinPieces.includes(index)) {
			const randomSpinSeconds = Math.random() * 2 + 5;
			classValue = `animation: spin${index} ${randomSpinSeconds}s ease-in-out ${
				Math.random() * 10
			}s infinite, fade ${randomSeconds}s ease-in-out ${Math.random() * 15}s infinite`;
			// Knowing the piece has a single transform of matrix(...)
			// we can get the matrix and create the animation with it
			const SVGMatrix = piece.transform.baseVal.getItem(0).matrix;
			const matrixString = getMatrixString(SVGMatrix);
			const reverse = Math.random() > 0.5;

			const keyframes = `
					@keyframes spin${index} {
						0% {
							transform: ${matrixString} rotate(${reverse ? 360 : 0}deg);
						}
						100% {
							transform: ${matrixString} rotate(${reverse ? 0 : 360}deg);
						}
					}
				`;

			styles += keyframes;
		}

		piece.classList.add(styleClass);
		styles += `.${styleClass}{${classValue}}`;
	});
	return styles;
}
