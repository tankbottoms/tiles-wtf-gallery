<script lang="ts">
	import CashMoney from './CashMoney.svelte';
	import Funding from './Funding.svelte';
	import InfoHeader from './InfoHeader.svelte';
	import Pay from './Pay.svelte';
</script>

<h1 class="title">Preview:</h1>
<InfoHeader />
<CashMoney />
<Pay />
<Funding />

<style>
	.title {
		font-size: 18px;
		color: var(--text-secondary);
		margin-bottom: 0px;
		font-weight: 400;
	}
</style>
