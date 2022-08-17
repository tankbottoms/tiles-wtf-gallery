# Infinite Tiles (tiles.wtf website)

#### About

Infinite Tiles v2 is an on-chain implementation of [@peripheralist](https://twitter.com/peripheralist)’s [TilesDAO](https://github.com/TileDAO) the [second (2nd) project on Juicebox](https://juicebox.money/#/p/tiles). The project is an homage to the venerable @peripheralist, the genius artist, developer, person.

[Infinite Tiles v2](https://github.com/tankbottoms/tiles-on-chain) contains the Solidity contracts. The repository structure employed a composable pattern which will be familiar with anyone involved in the Juicebox NFT minting toolkit. The InfiniteTiles contract uses Juicebox v2 terminal to forward any proceeds.

```typescript
function _payTreasury() private {
    IJBPaymentTerminal terminal = jbxDirectory.primaryTerminalOf(jbxProjectId, JBTokens.ETH);
    if (address(terminal) == address(0)) {
      return;
    }

    terminal.pay(jbxProjectId, msg.value, JBTokens.ETH, msg.sender, 0, false, '', '');
  }
```

#### Tiles Algorithm

The Original Tiles visual algorithm can be found [here](https://github.com/tankbottoms/tiles-wtf-gallery/blob/main/src/tiles/tilesStandalone.ts).

#### Minting

Original Tiles v1 token holders may mint their token for free (sans gas), if someone has preemptively minted another individual's address, price will be determined by the would be required to seize the token. Selling your Tile which is based on your address for large sums of ETH and then seizing it back for the currently available price is a side effect.

#### User History, Tiles Contract History

#### Juicebox v2 Treasury

#### Token Gating Example

### Build

```bash
yarn install
yarn build
yarn preview
```

### Develop

```bash
yarn install
yarn dev
```

### License

For projects which route payments to the juicebox protocol. See the [fine print.](./LICENSE)
