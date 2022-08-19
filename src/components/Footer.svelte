<script>
	import { readNetwork } from '$stores/web3';
</script>

<footer>
	<div class="footer">
		<div class="link">
			<a href="/tos?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Terms of sale</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		margin: auto;
		font-size: 14px;
		color: black;
		text-decoration: none;
		align-items: center;
		justify-items: center;
		text-align: center;
		margin: 0px 5px;
	}
</style>
