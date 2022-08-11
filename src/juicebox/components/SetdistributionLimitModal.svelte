<script lang="ts">
	import { V2_CURRENCY_ETH } from '$juicebox/utils/v2/currency';
	import { BigNumber } from 'ethers';
	import Button from './Button.svelte';
	import CurrencyInput from './CurrencyInput.svelte';
	import { closeModal } from './Modal.svelte';

	export let onClose = () => {};
	export let onOk = (distributionLimit: number, distributionLimitCurrency: BigNumber) => {};

	let distributionLimit = 0;
	let distributionLimitCurrency = BigNumber.from(V2_CURRENCY_ETH);

	$: distributionLimit = distributionLimit || 0;

	function handleOkClick() {
		onOk(distributionLimit, BigNumber.from(distributionLimitCurrency));
		closeModal();
	}
</script>

<h3>Set a distribution limit</h3>

<div>
	<CurrencyInput
		initialValue={BigNumber.from(distributionLimit)}
		bind:inputValue={distributionLimit}
		bind:currency={distributionLimitCurrency}
	/>
	<small>Set this to the sum of all your payouts</small>

	<br />

	<div class="actions">
		<Button
			on:click={() => {
				closeModal();
				onClose();
			}}
			size="md"
			type="secondary">Cancel</Button
		>
		<Button size="md" on:click={handleOkClick}>Ok</Button>
	</div>
</div>

<style>
	div {
		max-width: 100vw;
		width: 400px;
	}
	.actions {
		margin-top: 1rem;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
	}
</style>
