<section>
	<h1>faq</h1>
	<h2>wtf?</h2>
	<p>see <a href="/wtf" target="_blank">wtf</a></p>

	<h2>purpose of this project?</h2>
	<ul>
		<li>implement the nft visual rendering algorithm in solidity; and</li>
		<li>reset and slow the tile cost; and</li>
		<li>
			self-hosted <a href="https://juicebox.money/v2/p/41" target="_blank">juicebox treasury</a>.
		</li>
	</ul>

	<h2>how will the tiles v2 proceeds be used?</h2>
	<p>
		to encourage, promote and reward early adopter juicebox community members, member projects, and
		builders.
	</p>

	<h2>do existing Tiles owners pay anything?</h2>
	<p>
		no. owners of the original <a
			href="https://etherscan.io/address/0x64931F06d3266049Bf0195346973762E6996D764"
			target="_blank">infinite tile(s)</a
		>
		mint for free, this is called
		<a
			href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L124"
			target="_blank">grabbing</a
		>.
	</p>

	<h2>how are the tiles priced?</h2>
	<p>
		the base price will start out as <b>0.0001 ETH and be multipled by 2 every 512 tiles minted</b>,
		thus the next tier after the first will be priced as 0.0002 for 512 tiles and so on.
	</p>
	<p>
		initialization parameters were set in the <a
			href="https://github.com/tankbottoms/tiles-on-chain/blob/main/scripts/mainnet.ts#L46"
			target="_blank">deploy script</a
		>, the tile pricing is governed by the
		<a
			href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/LegacyOwnershipPriceResolver.sol"
			>legacy ownership price resolver</a
		>.
	</p>
	<p>
		if a tile for which the address owner discovers is unavailable, that user has the option to pay
		the existing rate and claim, this is called
		<a href="https://github.com/tankbottoms/tiles-on-chain/blob/main/contracts/TileNFT.sol#L171"
			>seizing</a
		>.
	</p>
	<h2>what are the license terms of the source code for the contracts and the website?</h2>
	<p>
		use of the source code is solely for users, projects which route their proceeds through the
		juicebox protocol treasury. see the we-party license <a
			href="https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/LICENSE.md"
			target="_blank">terms</a
		>.
	</p>
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
		font-size: 20px;
	}

	h2 {
		font-size: 16px;
		color: rgb(51, 128, 160);
	}

	ul,
	p {
		font-size: 14px;
	}
</style>
