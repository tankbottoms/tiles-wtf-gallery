<section>
    <h1>faq</h1>
    <b>wtf?</b>
	<p>see <a href="/wtf" target="_blank">wtf</a></p>	
    <b>purpose of this project?</b>
	<p>reset and slow the pricing function of the original tiles to be accessible. implement tiles to be completely on chain. distribute proceeds to the juicebox community. open source a fully operational svelte <a href="https://juicebox.money/v2/p/41" target="_blank">juicebox treasury</a>.</p>	
	<b>how will the tiles v1.2 proceeds be used?</b>
	<p>tbd</p>
	<b>do existing Tiles owners pay anything?</b>
	<p>no.  existing <a href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764" target="_blank">infinite tile</a> owners may mint for free, this is called <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L124" target="_blank">grabbing</a>.</p>
	<b>how are the tiles priced?</b>
	<p>the base price will start out as <b>0.0001 ETH and be multipled by 2 every 512 tiles minted</b>, thus the next teir after the first will be priced as 0.0002 for 512 tiles and so on.</p>
	<p>details maybe found in the <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts" target="_blank">deploy script</a>, the Tiles has what is called the <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol">LegacyOwnershipPriceResolver</a> which governs how pricing is resolved.  
		if a tile for which the address owner discovers is unavailable, that user has the option to pay the existing rate and claim, this is called <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L171">seizing</a>.</p>
	<b>what are the license terms of the source code for the contracts and the website?</b>
	<p>the license terms for the svelte repo is simple, if you use a juicebox treasury you can use the code; also can't do anything which is offensive to tankbottoms.</p>	
</section>

<style>
	section {
		max-width: 540px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin: 10vh auto;
	}
</style>
