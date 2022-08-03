<section>
    <h1>FAQ</h1>
    <b>Wtf?</b>
	<p>See <a href="/wtf" target="_blank">Wtf</a></p>	
    <b>Purpose of this project?</b>
	<p>If you are blind and have no appreciation for art, algorithmic or otherwise, then the purpose of this site is to demonstrate an Infinite Tiles minting project which routes the NFT proceeds to a <a href="https://juicebox.money/v2/p/41" target="_blank">Juicebox treasury</a>.</p>	
	<b>How will the Tiles v1.2 proceeds be used?</b>
	<p>TBD</p>
	<b>Do existing Tiles owners pay anything?</b>
	<p>No.  Existing <a href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764" target="_blank">Tile</a> owners may mint for free, this is called <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L124" target="_blank">grabbing</a>.</p>
	<b>How are the Tiles priced?</b>
	<p>The base price will start out as 0.0001 ETH and be multipled by 2 every 512 tiles minted, thus the next teir after the first will be priced as 0.0002 for 512 tiles and so on.</p>
	<p>Details maybe found in the <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts" target="_blank">deploy script</a>, the Tiles has what is called the <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol">LegacyOwnershipPriceResolver</a> which governs how pricing is resolved.  
		If a Tile for which the address owner discovers is unavailable, that user has the option to pay the existing rate and <a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L171">seize</a>.</p>
	<b>Jango.eth has the ENS Tile.eth, does that have anything to do with anything?</b>
	<p>What?</p>	
</section>

<style>
	section {
		max-width: 540px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin: 10vh auto;
	}
</style>
