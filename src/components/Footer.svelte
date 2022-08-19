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
		font-size: 14px;
		color: black;
		text-decoration: none;
		align-items: center;
		justify-items: center;
		text-align: center;
		margin: 20px 5px 5px;
		margin-top: 20px;
	}
</style>
