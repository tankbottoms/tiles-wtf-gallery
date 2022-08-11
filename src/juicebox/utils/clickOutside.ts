/** Dispatch event on click outside of node */
function clickOutsideDirective(node) {
	const handleClick = (event: { target: any; defaultPrevented: any }) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('clickOutside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export default clickOutsideDirective;
