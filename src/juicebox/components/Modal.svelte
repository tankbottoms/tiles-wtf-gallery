<!--
Borrowed from https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.20.1
with minor utility function addons.
Date: 2022-05-01
v1.3.0
-->
<script context="module">
	import { modal } from '$stores';
	/**
	 * Create a Svelte component with props bound to it.
	 * @type {(component: Component, props: Record<string, any>) => Component}
	 * @example modal.set(bind(AddSplitModal, { message: "Hello" }));
	 */
	export function bind(Component, props = {}) {
		const NewComponent = function ModalComponent(options) {
			// set name of self to passed in Component name
			self.name = Component.name;
			return new Component({
				...options,
				props: {
					...props,
					...options.props
				}
			});
		};
		Object.defineProperty(NewComponent, 'name', { value: Component.name });
		// NewComponent.name = Component.name;
		return NewComponent;
	}

	/**
	 * Open modal
	 * @type {component: Component => void}
	 */
	export function openModal(component) {
		modal.set(component);
	}

	/**
	 * Open modal
	 * @type {component: Component => void}
	 */
	export function closeModal() {
		modal.set(null);
	}
</script>

<script>
	import { onDestroy, onMount, setContext as baseSetContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import CloseButton from './CloseButton.svelte';

	const dispatch = createEventDispatcher();

	/**
	 * Svelte component to be shown as the modal
	 * @type {Component | null}
	 */
	export let show = null;

	/**
	 * Svelte context key to reference the simple modal context
	 * @type {string}
	 */
	export let key = 'MODAL';

	/**
	 * Accessibility label of the modal
	 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-label
	 * @type {string | null}
	 */
	export let ariaLabel = null;

	/**
	 * Element ID holding the accessibility label of the modal
	 * @see https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
	 * @type {string | null}
	 */
	export let ariaLabelledBy = null;

	/**
	 * Whether to show a close button or not
	 * @type {Component | boolean}
	 */
	export let closeButton = true;

	/**
	 * Whether to close the modal on hitting the escape key or not
	 * @type {boolean}
	 */
	export let closeOnEsc = true;

	/**
	 * Whether to close the modal upon an outside mouse click or not
	 * @type {boolean}
	 */
	export let closeOnOuterClick = true;

	/**
	 * CSS for styling the background element
	 * @type {Record<string, string | number>}
	 */
	export let styleBg = {};

	/**
	 * CSS for styling the window wrapper element
	 * @type {Record<string, string | number>}
	 */
	export let styleWindowWrap = {};

	/**
	 * CSS for styling the window element
	 * @type {Record<string, string | number>}
	 */
	export let styleWindow = {};

	/**
	 * CSS for styling the content element
	 * @type {Record<string, string | number>}
	 */
	export let styleContent = {};

	/**
	 * CSS for styling the close element
	 * @type {Record<string, string | number>}
	 */
	export let styleCloseButton = {};

	/**
	 * Class name for the background element
	 * @type {string | null}
	 */
	export let classBg = null;

	/**
	 * Class name for window wrapper element
	 * @type {string | null}
	 */
	export let classWindowWrap = null;

	/**
	 * Class name for window element
	 * @type {string | null}
	 */
	export let classWindow = null;

	/**
	 * Class name for content element
	 * @type {string | null}
	 */
	export let classContent = null;

	/**
	 * Class name for close element
	 * @type {string | null}
	 */
	export let classCloseButton = null;

	/**
	 * Do not apply default styles to the modal
	 * @type {boolean}
	 */
	export let unstyled = false;

	/**
	 * @type {(key: any, context: any) => void}
	 */
	export let setContext = baseSetContext;

	/**
	 * Transition function for the background element
	 * @see https://svelte.dev/docs#transition_fn
	 * @type {(node: Element, parameters: BlurParams) => TransitionConfig}
	 */
	export let transitionBg = fade;

	/**
	 * Parameters for the background element transition
	 * @type {BlurParams}
	 */
	export let transitionBgProps = { duration: 250 };

	/**
	 * Transition function for the window element
	 * @see https://svelte.dev/docs#transition_fn
	 * @type {(node: Element, parameters: BlurParams) => TransitionConfig}
	 */
	export let transitionWindow = transitionBg;

	/**
	 * Parameters for the window element transition
	 * @type {BlurParams}
	 */
	export let transitionWindowProps = transitionBgProps;

	/**
	 * If `true` elements outside the modal can be focused
	 * @type {boolean}
	 */
	export let disableFocusTrap = false;

	const defaultState = {
		ariaLabel,
		ariaLabelledBy,
		closeButton,
		closeOnEsc,
		closeOnOuterClick,
		styleBg,
		styleWindowWrap,
		styleWindow,
		styleContent,
		styleCloseButton,
		classBg,
		classWindowWrap,
		classWindow,
		classContent,
		classCloseButton,
		transitionBg,
		transitionBgProps,
		transitionWindow,
		transitionWindowProps,
		disableFocusTrap,
		unstyled
	};
	let state = { ...defaultState };

	let Component = null;

	let background;
	let wrap;
	let modalWindow;
	let scrollY;
	let cssBg;
	let cssWindowWrap;
	let cssWindow;
	let cssContent;
	let cssCloseButton;
	let currentTransitionBg;
	let currentTransitionWindow;
	let prevBodyPosition;
	let prevBodyOverflow;
	let prevBodyWidth;
	let outerClickTarget;

	const camelCaseToDash = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

	const toCssString = (props) =>
		props
			? Object.keys(props).reduce(
					(str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`,
					''
			  )
			: '';

	const isFunction = (f) => !!(f && f.constructor && f.call && f.apply);

	const updateStyleTransition = () => {
		cssBg = toCssString(
			Object.assign(
				{},
				{
					width: window.innerWidth,
					height: window.innerHeight
				},
				state.styleBg
			)
		);
		cssWindowWrap = toCssString(state.styleWindowWrap);
		cssWindow = toCssString(state.styleWindow);
		cssContent = toCssString(state.styleContent);
		cssCloseButton = toCssString(state.styleCloseButton);
		currentTransitionBg = state.transitionBg;
		currentTransitionWindow = state.transitionWindow;
	};

	const toVoid = () => {};
	let onOpen = toVoid;
	let onClose = toVoid;
	let onOpened = toVoid;
	let onClosed = toVoid;

	const open = (NewComponent, newProps = {}, options = {}, callback = {}) => {
		Component = bind(NewComponent, { ...newProps, close });
		state = { ...defaultState, ...options };
		updateStyleTransition();
		disableScroll();
		onOpen = (event) => {
			if (callback.onOpen) callback.onOpen(event);
			/**
			 * The open event is fired right before the modal opens
			 * @event {void} open
			 */
			dispatch('open');
			/**
			 * The opening event is fired right before the modal opens
			 * @event {void} opening
			 * @deprecated Listen to the `open` event instead
			 */
			dispatch('opening'); // Deprecated. Do not use!
		};
		onClose = (event) => {
			if (callback.onClose) callback.onClose(event);
			/**
			 * The close event is fired right before the modal closes
			 * @event {void} close
			 */
			dispatch('close');
			/**
			 * The closing event is fired right before the modal closes
			 * @event {void} closing
			 * @deprecated Listen to the `close` event instead
			 */
			dispatch('closing'); // Deprecated. Do not use!
		};
		onOpened = (event) => {
			if (callback.onOpened) callback.onOpened(event);
			/**
			 * The opened event is fired after the modal's opening transition
			 * @event {void} opened
			 */
			dispatch('opened');
		};
		onClosed = (event) => {
			if (callback.onClosed) callback.onClosed(event);
			/**
			 * The closed event is fired after the modal's closing transition
			 * @event {void} closed
			 */
			dispatch('closed');
		};
	};

	const close = (callback = {}) => {
		if (!Component) return;
		if ($modal?.name === Component.name) modal.set(null);
		onClose = callback.onClose || onClose;
		onClosed = callback.onClosed || onClosed;
		Component = null;
		enableScroll();
	};

	const handleKeydown = (event) => {
		if (state.closeOnEsc && Component && event.key === 'Escape') {
			event.preventDefault();
			close();
		}

		if (Component && event.key === 'Tab' && !state.disableFocusTrap) {
			// trap focus
			const nodes = modalWindow.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((node) => node.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && event.shiftKey) index = 0;

			index += tabbable.length + (event.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			event.preventDefault();
		}
	};

	const handleOuterMousedown = (event) => {
		if (state.closeOnOuterClick && (event.target === background || event.target === wrap))
			outerClickTarget = event.target;
	};

	const handleOuterMouseup = (event) => {
		if (state.closeOnOuterClick && event.target === outerClickTarget) {
			event.preventDefault();
			close();
		}
	};

	const disableScroll = () => {
		scrollY = window.scrollY;
		prevBodyPosition = document.body.style.position;
		prevBodyOverflow = document.body.style.overflow;
		prevBodyWidth = document.body.style.width;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${scrollY}px`;
		document.body.style.overflow = 'hidden';
		document.body.style.width = '100%';
	};

	const enableScroll = () => {
		// NOTE we're not using `prevBodyPosition` here because
		// we have a couple of nested modals, so the previous
		// state can be fixed and overflow hidden. Fix this
		// in the future, for now just unset.
		document.body.style.position = '';
		document.body.style.overflow = '';
		document.body.style.top = '';
		document.body.style.width = prevBodyWidth || '';
		window.scrollTo(0, scrollY);
	};

	setContext(key, { open, close });

	let isMounted = false;

	$: {
		if (isMounted) {
			if (isFunction(show)) {
				open(show);
			} else {
				close();
			}
		}
	}

	onDestroy(() => {
		if (isMounted) close();
	});

	onMount(() => {
		isMounted = true;
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if Component}
	<div
		class={state.classBg}
		class:bg={!unstyled}
		on:mousedown={handleOuterMousedown}
		on:mouseup={handleOuterMouseup}
		bind:this={background}
		transition:currentTransitionBg={state.transitionBgProps}
		style={cssBg}
	>
		<div
			class={state.classWindowWrap}
			class:wrap={!unstyled}
			bind:this={wrap}
			style={cssWindowWrap}
		>
			<div
				class={state.classWindow}
				class:window={!unstyled}
				role="dialog"
				aria-modal="true"
				aria-label={state.ariaLabelledBy ? null : state.ariaLabel || null}
				aria-labelledby={state.ariaLabelledBy || null}
				bind:this={modalWindow}
				transition:currentTransitionWindow={state.transitionWindowProps}
				on:introstart={onOpen}
				on:outrostart={onClose}
				on:introend={onOpened}
				on:outroend={onClosed}
				style={cssWindow}
			>
				{#if state.closeButton}
					{#if isFunction(state.closeButton)}
						<svelte:component this={state.closeButton} onClose={close} />
					{:else if unstyled}
						<div
							role="button"
							class={state.classCloseButton}
							aria-label="Close modal"
							on:click={close}
							style={cssCloseButton}
						/>
					{:else}
						<CloseButton on:click={close} />
					{/if}
				{/if}
				<div class={state.classContent} class:content={!unstyled} style={cssContent}>
					<div class:inner-content={!unstyled}>
						<svelte:component this={Component} />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
<slot />

<style>
	* {
		box-sizing: border-box;
	}

	.bg {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.66);
	}

	.wrap {
		position: relative;
		margin: 2rem;
		max-height: 100%;
	}

	.window {
		position: relative;
		width: fit-content;
		max-width: 100%;
		max-height: 100%;
		margin: 2rem auto;
		background: var(--background-l0);
	}

	.content {
		position: relative;
		padding: 1rem;
		max-height: calc(100vh - 4rem);
		overflow: inherit;
	}

	.inner-content {
		max-height: calc(100vh - 4rem);
		overflow: scroll;
	}
</style>
