<section>
	<h1>faq</h1>

	<h1>what is the ongoing purpose of the dao?</h1>
	<p>tbd, however to encourage and reward early juicebox community members, projects, and builders, sounds pretty cool.</p>	

	<br/><h1>what does "grabbing" mean wrt tiles?</h1>
	<p>
		original
		<a
			href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764"
			target="_blank"
			>infinite tiles
		</a>
		owners mint for free; the contract function is called 
		<a
			href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L124"
			target="_blank">...</a
		>	
	</p>

	<br/><h1>how are tiles priced?</h1>	
	<ol>
		<li>mints start at 0.0001 ETH. every 512 mints, the price doubles.</li>
		<li>
			parameters were set in the <a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts#L46"
				target="_blank">deploy script</a
			>, and pricing is governed by the contract: 
			<a
				href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol"
				>legacy ownership price resolver</a
			>.
		</li>
		<li>
			if somebody preemptively minted your address' tile, you can reclaim it by transfering the current tile rate. 
			this is called
			<a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L171"
				>"seizing"</a
			>.
		</li>
	</ol>	

	<br/><h1>how will the treasury be managed?</h1>
	<p>all proceeds will be transparently managed on <a href="/dao">juicebox.</a>  the gnosis <b>0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</b> will recieve the 
		juicebox project token. the initial signers are listed in <a href="/wtf">wtf</a>, while membership to the DAO is offerred to anyone who holds tiles2 nft or erc20, the specifics of governance, if any, has not been decided.</p>

	<br/><h1>what are the license terms of the source code for the contracts and the website?</h1>
	<p>
		tiles.wtf and its source code are under the <a
			href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/LICENSE.md"
			target="_blank">we-party license</a
		>. use of the source code is solely for projects which route their proceeds through the juicebox treasury
		protocol.
	</p>	
</section>

<style>
	section {
		max-width: 600px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin: 10vh auto;
	}
	h1 {
		font-size: 18px;		
	}
	
	p {
		font-size: 12px;
	}
</style>
