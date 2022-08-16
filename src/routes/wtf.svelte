<script>
	import { goto } from '$app/navigation';

	import { generateTile, generateRandomAddresses } from '$tiles/tilesStandalone';
	import { onMount } from 'svelte';

	let tile = '';
	let address = '';
	const initialSigners = [
		'0x5d95baEBB8412AD827287240A5c281E3bB30d27E',
		'0x63a2368f4b509438ca90186cb1c15156713d5834',
		'0x823b92d6a4b2aed4b15675c7917c9f922ea8adad',
		'0xe7879a2d05dba966fcca34ee9c3f99eee7edefd1',
		'0x4823e65c10daa3ef320e5e262cfa8d0a059e02a6',
		'0x5566b7cb1cccb3e147084cf971d6dda770a3c90f'
	];

	onMount(() => {
		tile = generateTile(initialSigners[0]);

		let current = 1;
		setInterval(() => {
			address = initialSigners[current % 6];
			tile = generateTile(address);
			current++;
		}, 500);
	});
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<section>
	<img
		class="peri-profile"
		width="400"
		src="https://cloudflare-ipfs.com/ipfs/QmaM1m53J2qwEa5Gu3XNW8xryPbkNpMp42Wc984WtZj9iU"
		alt="@peri profile with Tile background with nipple"
	/>
	<caption
		><a href="https://twitter.com/peripheralist">@peripheralist</a>, presumably on a warm relaxing
		day, contemplating life, the universe, ∞ and everything</caption
	>
	<br />
	<h1>wtf?</h1>
	<p>
		<a href="https://github.com/tankbottoms/tiles-on-chain">infinite tiles v2</a> is a
		reversed-engineered implementation of @peripheralist’s
		<a href="https://github.com/TileDAO">Tiles</a>, without any api-service. the entire svg tile is
		created in solidity. 
	</p>
	<p>
		this minting and <a href="/dao">tiles juicebox treasury</a> experience were implemented with
		svelte in typescript.
	</p>
	<p>
		the <a href="https://github.com/tankbottoms/tiles-on-chain">tiles-v2-nft</a> and
		<a href="https://github.com/tankbottoms/tiles-wtf-gallery">tiles-v2-gallery</a> github repos
		together seek to further decentralize the
		<a
			href="https://snapshot.org/#/jbdao.eth/proposal/0x122ec83036d4ed2379c98ed6c566666256169aac1ee4316f60da24bd768c7ff6"
			target="_blank">juicebox application</a
		>.
	</p>
	<p>		
			this project is an homage to the venerable @peripheralist: the genius artist, designer,
			developer, grapher, person. <i>"all hail @peripheralist,"</i> <br />		
	</p>
	<br />
	<hr />
	<br />
	<h1>unincorporated nonprofit - una</h1>
	<p>
		there are enough unique tiles for every ethereum address; thus it is possible that the una
		recieves funding perpetually.
	</p>
	<p>
		therefore infinite tiles v2 will operates as a DAO using the juicebox protocol. the decision to
		wrap the DAO with an unincorporated nonprofit was to afford the community a meatspace bank
		account. the initial <a href="/gp">guiding principals</a> sets forth the terms.
	</p>	
	<br />
	<hr />
	<br />
	<h1>gnosis </h1>
	<a href="https://etherscan.io/address/0x4493287882f75dFFcdB40FD41d38d6308Fb8c181">0x4493287882f75dFFcdB40FD41d38d6308Fb8c181</a>
	<p>following initial gnosis signers will steward the tiles v2 juicebox project, and in turn its treasury</p>
	<br />
	<main class:mobile={innerWidth < 650}>
		<div
			class="tiles-container"
			on:click={() => goto(`mint/${address}`)}
			style="transform: scale({Math.min(1, (innerWidth - 50) / 560)});"
		>
			<div id="tiles">
				<div class="tile">
					{@html tile}
				</div>
				<div>
					{address}
				</div>
			</div>
			<p id="address" />
		</div>
	</main>
</section>

<style lang="scss">
	section {
		max-width: 540px;
		padding: 20px 20px 100px;
		line-height: 1.3;
		margin: 10vh auto;
		.peri-profile {
			display: block;
			margin: 0 auto;
		}
		caption {
			display: block;
			text-align: center;
		}
	}
	main {
		background: white;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
		height: 100vh;
		align-items: left;
		justify-items: center;
		max-width: 1000px;
		margin: 0 auto;
		text-align: center;
		h1,
		.heading {
			font-size: 20px;
			border: 0;
		}

		a {
			font-size: 14px;
			color: black;
			text-decoration: none;
			position: relative;
			border-bottom: 3px solid gold;
			margin: 0px 10px;
		}

		a:hover {
			border-bottom: 3px solid black;
		}

		p {
			font-size: 16px;
			margin: 30px 0;
		}

		.group {
			margin-top: 30px;
			height: 60px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-bottom: 20px;
			font-weight: 600;
		}
		&.mobile {
			display: flex;
			flex-direction: column;
			max-width: 100vw;
			h1,
			.heading {
				font-size: 15px;
			}
			p {
				font-size: 10px;
				margin: 16px 0;
			}
			a {
				font-size: 10px;
			}
		}
	}
</style>
