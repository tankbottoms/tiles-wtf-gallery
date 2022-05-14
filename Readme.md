# tiles.wtf placeholder website

#### website

-   generate new [seed phrase](https://docs.ethers.io/v5/getting-started/)
-   randomly fetch a new [palette](https://github.com/Jam3/nice-color-palettes) 4 colors
-   use the new color palette to color the right corner logo (see next section) and the center tile (ln 159)
-   ok to use the below as the favicon
-   update the tiles-standalone to derive seed phrase public addresses incrementing each derivation every second
-   layout the same but with 0 minted // pricing tbd, connect - modal saying stay tuned, Tiles v2, manifesto next section
-   will add tiles.wtf to cloudflare and fleek

#### manifesto

Tiles v2 is an on-chain re-implementation of [@peripheralist](https://twitter.com/peripheralist)’s [tilesdao](https://github.com/TileDAO) the [second project on Juicebox](https://juicebox.money/#/p/tiles). The project is an homage to the venerable @peripheralist, the genius artist, developer, person.

A number of token drop mechanics are under consideration including method of distribution, pricing tiers, tier widths, and NFT minters and the DAO. The Tile contract uses Juicebox v2 ProjectPayer (https://info.juicebox.money/docs/protocol/build/utilities/project-payer) as its transparent treasury.

#### svg assets

logo

```html
<svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="10" cy="10" r="10" fill="#FE4465" />
    <circle cx="10" cy="30" r="10" fill="#1A49EF" />
    <circle cx="30" cy="10" r="10" fill="#222222" />
    <circle cx="30" cy="30" r="10" fill="#F8D938" />
</svg>
```
