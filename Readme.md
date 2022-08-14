# infinite tiles (tiles.wtf website)

#### About

infinite tiles v2 is an on-chain re-implementation of [@peripheralist](https://twitter.com/peripheralist)’s [tilesdao](https://github.com/TileDAO) the [second (2nd) project on Juicebox](https://juicebox.money/#/p/tiles). The project is an homage to the venerable @peripheralist, the genius artist, developer, person.

[inifite tiles v2 on-chain](https://github.com/tankbottoms/tiles-on-chain) contains the implementation. The contract structure employed follows a composable pattern which will be familiar with anyone involved in the Juicebox NFT minting toolkit. The Tile contract uses Juicebox v2 ProjectPayer (https://info.juicebox.money/docs/protocol/build/utilities/project-payer) as its transparent treasury.

Original Tiles v1 token holders may mint their token for free (sans gas), if someone has preemptively minted another individual's address, price will be determined by the would be required to seize the token.

### Build

```bash
npm install
npm run build
npm run preview
```

### License

For project which use the Juicebox Protocol to route payments. See the [fine print.](./LICENSE)
