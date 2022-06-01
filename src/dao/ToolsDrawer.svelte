<script lang="ts">
	import CurrencyInput from '$components/CurrencyInput.svelte';
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Input from '$components/Input.svelte';
	import Trans from '$components/Trans.svelte';
	import { openModal } from '$components/Modal.svelte';
	import CreatePayableAddress from './CreatePayableAddress.svelte';

	export let balance = 0;
	export let token = '';

	let transferTokenAmount = 0;
	let transferTokenTo: Address;

	// NOTE this will be a big number due to CurrencyInput
	let addToBalanceAmount = 0;

	function transfer() {
		console.log(transferTokenAmount);
		console.log(transferTokenTo);
	}

	function addToBalance() {
		console.log(addToBalanceAmount);
	}
</script>

<section>
	<h1>Tools</h1>

	<div class="item">
		<h3><Trans>Create payable address</Trans></h3>
		<p><Trans>Create an Ethereum address that can be used to pay your project directly.</Trans></p>

		<Button type="primary" size="md" on:click={() => openModal(CreatePayableAddress)}
			>Deploy project payer contract</Button
		>
		<p class="input">
			<Icon name="exclamationCircle" /><Trans>
				If you have already deployed a payable address and have lost it, please contact the Juicebox
				team through Discord.</Trans
			>
		</p>
	</div>

	<div class="item">
		<h3><Trans>Transfer unclaimed {token}</Trans></h3>
		<p><Trans>Your balance: {balance}</Trans></p>

		<label for="amount">Amount</label>
		<div class="input">
			<Input bind:value={transferTokenAmount} type="number" placeholder="Amount" />
		</div>

		<label for="to">To</label>
		<div class="input">
			<Input
				bind:value={transferTokenTo}
				type="text"
				placeholder="juicebox.eth / 0x0000000000000000000000000000000000000000"
			/>
		</div>

		<Button type="primary" size="md" on:click={transfer}>Transfer {token}</Button>
	</div>

	<div class="item">
		<h3><Trans>Add to balance</Trans></h3>
		<p><Trans>Add funds tho this project's balance without minting tokens.</Trans></p>

		<label for="payAmount">Pay amount</label>
		<div class="input">
			<CurrencyInput
				on:setValue={(value) => {
					addToBalanceAmount = value.detail.value;
				}}
				disabled
			/>
		</div>
		<Button type="primary" size="md" on:click={addToBalance}>Add to balance</Button>
	</div>
</section>

<style>
	section {
		padding: 40px 20px;
	}
	h1,
	h3 {
		color: var(--text-header);
	}

	h1 {
		font-size: 2rem;
	}

	p {
		font-weight: 300;
	}

	.input {
		margin-top: 10px;
		margin-bottom: 20px;
	}

	.item {
		margin-top: 40px;
		padding-bottom: 40px;
		border-bottom: 1px solid var(--stroke-tertiary);
	}

	.item:last-of-type {
		border: unset;
	}
</style>
