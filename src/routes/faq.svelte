<section>
	<h1>wtf?</h1>
	<p>see <a href="/wtf" target="_blank">wtf</a></p>
	<br/><h1>overall purpose?</h1>
	<ol>
		<li>
			implement <a href="https://tiles.art">tiles'</a> visual rendering algorithm in solidity;
		</li>
		<li>reset and reduce the cost of tiles; and</li>
		<li>
			self-host a <a href="https://juicebox.money/v2/p/41" target="_blank">juicebox treasury</a>.
		</li>
	</ol>
	<br/><h1>where does the ETH go?</h1>
	<p>all proceeds from the tiles v2 purchase are routed to the juicebox treasury. see <a href="/dao">treasury.</a></p>
	<p>the mechanism of how this operatees is currently under discussion, suggestions welcome.</p>
	<p>to encourage and reward early juicebox community members, projects, and builders.</p>	

	<br/><h1>what does "grabbing" mean wrt tiles v2?</h1>
	<p>
		original
		<a
			href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764"
			target="_blank"
			>infinite tiles
		</a>
		owners mint for free, the contract function is called 
		<a
			href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L124"
			target="_blank">"grabbing"</a
		>	
	</p>

	<br/><h1>how are v2 tiles priced?</h1>	
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
	<br/>
	
		
	<br/><h1>what are the license terms of the source code for the contracts and the website?</h1>
	<p>
		tiles.wtf and its source code are under the <a
			href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/LICENSE.md"
			target="_blank">we-party license</a
		>. use of the source code is solely for projects which route their proceeds through a juicebox
		protocol treasury.
	</p>
	<p />
	<p />
</section>

<style>
	section {
		max-width: 540px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin: 10vh auto;
	}
	h1 {
		font-size: 18px;
	}

	h2 {
		font-size: 16px;
		color: rgb(51, 128, 160);
	}

	ul,
	p {
		font-size: 12px;
	}
</style>
