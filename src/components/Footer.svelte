<script>
	import { readNetwork } from '$stores/web3';
</script>

<footer>
	<div class="footer">
		<a href="/tos?{$readNetwork ? `network=${$readNetwork?.alias}` : ''}">Terms of sale</a>
	</div>
</footer>

<style>
	.footer {
		align-items: center;
		justify-items: center;
		text-align: center;
		margin: 20px 5px 10px;
		margin-top: 20px;
	}

	.footer a {
		font-size: 14px;
		color: black;
		text-decoration: none;
		border-bottom: 3px solid gold;
	}
</style>
