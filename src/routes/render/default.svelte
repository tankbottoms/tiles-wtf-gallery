<script lang="ts">
	import { page } from '$app/stores';
	import { generateTile } from '$tiles/tilesStandalone';

	$: address = $page.params.address;
	$: tile = generateTile(address);
	
    /*
        No terms of sales here
    */
   
</script>


<div class="main" >
		{@html tile}
</div>	


<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
	main {
		margin: 0;
		padding: 0;
		background: #ffffff;
		width: 100vw;
		height: 100vh;
	}
</style>
