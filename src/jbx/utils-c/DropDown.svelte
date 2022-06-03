<script>
	import Image from './Image.svelte';
</script>

<div class="dropdown">
	<a href="https://oneof.com/" target="_blank">
		<span>About</span>
		<Image src="/icons/info.svg" />
	</a>
	<a href="https://discord.com/invite/oneofnft" target="_blank">
		<span>Discord</span>
		<Image src="/icons/discord.svg" />
	</a>
	<a href="https://twitter.com/oneofnft" target="_blank">
		<span>Twitter</span>
		<Image src="/icons/twitter.svg" />
	</a>
	<a href="https://www.flowcode.com/page/oneofnft" target="_blank">
		<span>Flowcode</span>
		<Image src="/icons/Github.svg" />
	</a>
</div>

<style>
	.dropdown {
		background-color: white;
		border-radius: 12px;
		width: 9rem;
		position: absolute;
		top: 60px;
		right: 0rem;
		box-shadow: 0 2px 4px 0 rgb(34 36 38 / 12%), 0 2px 10px 0 rgb(34 36 38 / 15%);
		z-index: 999;
	}

	.dropdown > a {
		color: #9e9e9e;
		font-size: 16px;
		display: -webkit-flex;
		display: -moz-box;
		display: flex;
		padding: 0.5rem;
		-webkit-justify-content: space-between;
		-moz-box-pack: justify;
		justify-content: space-between;
		-webkit-box-pack: justify;
		-webkit-align-items: center;
		-moz-box-align: center;
		align-items: center;
		-webkit-transition: 50ms ease;
		transition: 50ms ease;
		text-decoration: none;
	}
</style>
