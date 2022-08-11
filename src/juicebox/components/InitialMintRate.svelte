<script lang="ts">
	import Input from './Input.svelte';
	import PopInfo from './PopInfo.svelte';
	import { formattedNum } from '$juicebox/utils/formatNumber';

	export let issuanceRate: number;

	let formatted = formattedNum(issuanceRate);

	$: {
		if (formatted === '') {
			issuanceRate = 0;
			formatted = '';
		} else {
			issuanceRate = parseInt(formatted.replace(/,/g, ''));
			formatted = formattedNum(issuanceRate);
		}
	}
</script>

<div>
	<div class="label">
		<label for="initialMintRate"><small>*</small> Initial mint rate </label>
		<PopInfo
			message="The number of project tokens minted when 1 ETH is contributed."
			placement="top"
		/>
	</div>
	<Input id="initialMintRate" bind:value={formatted}>
		<div slot="addon">
			<span class="addon">tokens per ETH distributed </span>
		</div>
	</Input>
</div>

<style lang="scss">
	small {
		font-size: 8px;
		color: red;
		vertical-align: text-top;
	}

	div {
		margin-bottom: 10px;
	}
	.label {
		display: flex;
		align-items: center;
	}
	.addon {
		font-weight: 300;
	}
</style>
