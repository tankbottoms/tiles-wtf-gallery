const svgs = [
  '<path d="M100 100L100 0H0C0 55.2285 44.7715 100 100 100Z" fill="#000"/>',
  '<path d="M0 100L0 0H100C100 55.2285 55.2285 100 0 100Z" fill="#000"/>',
  '<path d="M0 0L0 100H100C100 44.7715 55.2285 0 0 0Z" fill="#000"/>',
  '<path d="M100 0L100 100H0C0 44.7715 44.7715 0 100 0Z" fill="#000"/>',
  '<circle cx="50" cy="50" r="50" fill="#000"/>',
  '<circle cx="50" cy="50" r="20" fill="#000"/>',
  '<path d="M0 0C0 55.2285 44.7715 100 100 100C100 44.7715 55.2285 0 0 0Z" fill="#000"/>',
  '<path d="M0 100C0 44.7715 44.7715 0 100 0C100 55.2285 55.2285 100 0 100Z" fill="#000"/>',
  '<path d="M100 0H0L100 100V0Z" fill="#000"/>',
  '<path d="M0 0H100L0 100V0Z" fill="#000"/>',
  '<path d="M0 100H100L0 0V100Z" fill="#000"/>',
  '<path d="M100 100H0L100 0V100Z" fill="#000"/>',
  '<path d="M50 100C50 72.3858 27.6142 50 0 50V100H50Z" fill="#000"/>',
  '<path d="M50 100C50 72.3858 72.3858 50 100 50V100H50Z" fill="#000"/>',
  '<path d="M50 0C50 27.6142 72.3858 50 100 50V0H50Z" fill="#000"/>',
  '<path d="M50 0C50 27.6142 27.6142 50 0 50V0H50Z" fill="#000"/>',
];

const canvasColor = `#faf3e8`;

const head = `<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:svgjs="http://svgjs.dev/svgjs"
version="1.1"
width="360"
height="360"
id="SvgjsSvg1000"
>
<rect width="360" height="360" fill="${canvasColor}" />
<g transform="matrix(1,0,0,1,30,30)">
<g>
`;

const foot = `
</g>
</g>
</svg>`;

let str = head;
let sectorSize = 100;

function __spreadArray(r, e) {
  for (var s = 0, i = e.length, o = r.length; s < i; s++, o++) r[o] = e[s];
  return r;
}
function ringVariantsFrom(r) {
  var e = r.positions,
    s = r.positionKind,
    i = r.sizes,
    o = r.layers,
    t = r.solid;
  return e.flatMap(function(r) {
    return i.flatMap(function(e) {
      return o.map(function(i) {
        return {
          positionIndex: r,
          positionKind: s,
          size: e,
          layer: i,
          solid: t,
        };
      });
    });
  });
}

const ringVariants = __spreadArray(
  __spreadArray(
    __spreadArray(
      __spreadArray(
        __spreadArray(
          __spreadArray(
            __spreadArray(
              [null],
              ringVariantsFrom({
                positionKind: "intersection",
                positions: [
                  0,
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                ],
                sizes: [1, 2, 3],
                layers: [2],
              })
            ),
            ringVariantsFrom({
              positionKind: "intersection",
              positions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
              sizes: [1, 2],
              layers: [1, 2],
              solid: !0,
            })
          ),
          ringVariantsFrom({
            positionKind: "intersection",
            positions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            sizes: [3],
            layers: [0, 1],
            solid: !0,
          })
        ),
        ringVariantsFrom({
          positionKind: "sector",
          positions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          sizes: [1, 2],
          layers: [1, 2],
        })
      ),
      ringVariantsFrom({
        positionKind: "sector",
        positions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        sizes: [0, 1],
        layers: [0, 1, 2],
        solid: !0,
      })
    ),
    ringVariantsFrom({
      positionKind: "sector",
      positions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      sizes: [2],
      layers: [0, 1],
      solid: !0,
    })
  ),
  ringVariantsFrom({
    positionKind: "sector",
    positions: [4],
    sizes: [1, 2],
    layers: [0],
  })
);

const getAddressSegments = (r) => {
  var e = [];
  return r.split("").reduce(function(r, s) {
    if ((e.push(s), 4 === e.length)) {
      var i = e;
      return (e = []), __spreadArray(__spreadArray([], r), [i]);
    }
    return r;
  }, []);
};

const toNum = (r) => {
  return Number(`0x${r.join("")}`);
};

const address =
  // process.argv.find((arg) => arg.startsWith("0x")) ||
  "0x458e5eBAe41DaEEd84A19893e71892F491515f83";

const red = "#FE4465",
  black = "#222",
  blue = "#1A49EF",
  yellow = "#F8D938";

const sectorColorVariants = {
  0: [red, yellow, black],
  1: [red, black, blue],
  2: [red, yellow, blue],
  3: [red, blue, yellow],
  4: [blue, yellow, red],
  5: [blue, red, yellow],
  6: [blue, yellow, yellow],
  7: [blue, black, red],
  8: [black, red, yellow],
  9: [black, red, blue],
  10: [black, blue, red],
  11: [black, yellow, blue],
  12: [yellow, red, black],
  13: [yellow, blue, red],
  14: [yellow, black, blue],
  15: [yellow, black, red],
};

const sectorColorsFromInt16 = (r) => {
  var e = sectorColorVariants[r];
  return { layer0: e[0], layer1: e[1], layer2: e[2] };
};

const generateTileSectors = (r) => {
  return r.map(function(r) {
    var e = sectorColorsFromInt16(Number(`0x${r[0]}`));
    return [
      { svg: svgs[Number(`0x${r[1]}`)], color: e.layer0 },
      { svg: svgs[Number(`0x${r[2]}`)], color: e.layer1 },
      { svg: svgs[Number(`0x${r[3]}`)], color: e.layer2 },
    ];
  });
};

const addr = address.slice(2);
const addressSegments = getAddressSegments(addr);
const t = addressSegments.slice(1);

const rings = [
  ringVariants[toNum([addressSegments[0][0], addressSegments[0][1]])],
  ringVariants[toNum([addressSegments[0][2], addressSegments[0][3]])],
].filter(Boolean);

for (let r = 0; r < 3; r++) {
  for (let i = 0; i < 9; i++) {
    const tileSectors = generateTileSectors(t);
    const { svg, color } = tileSectors[i][r];
    let tile = "";
    if (svg.startsWith("<path")) {
      tile = `
      <g transform="matrix(1,0,0,1,${(i % 3) * 100},${Math.floor((i % 9) / 3) *
        100})">
        ${svg
          .replace(/fill="#000"/g, `fill="${color}"`)
          .replace("/>", ` style="opacity: 0.88;" />`)}
      </g>
    `;
    } else if (svg.startsWith("<circle")) {
      const cx = Number(svg.match(/cx="(\d+)"/)?.[1] || 50);
      const cy = Number(svg.match(/cy="(\d+)"/)?.[1] || 50);
      const r = Number(svg.match(/r="(\d+)"/)?.[1] || 50);
      tile = `
      <g transform="matrix(1,0,0,1,${(i % 3) * 100},${Math.floor((i % 9) / 3) *
        100})">
        ${svg
          .replace(/fill="#000"/g, `fill="${color}"`)
          .replace(/cx="(\d+)"/g, `cx="${r}"`)
          .replace(/cy="(\d+)"/g, `cy="${r}"`)
          .replace(
            /\/>/,
            ` transform="matrix(1,0,0,1,${[cx - r, cy - r].join(",")})" />`
          )
          .replace("/>", ` style="opacity: 0.88;" />`)}
      </g>
    `;
    }
    str += tile;
  }
  for (const ring of rings.filter((ring) => ring.layer === r)) {
    let i,
      diameter = 0,
      posX = 0,
      posY = 0;
    switch (ring.size) {
      case 0:
        diameter = sectorSize - 90;
        break;
      case 1:
        diameter = sectorSize - 50 - 1.2;
        break;
      case 2:
        diameter = sectorSize - 10;
        break;
      case 3:
        diameter = 2 * sectorSize - 10;
    }
    if (
      (2 === ring.layer && (diameter += 0.5)) ||
      "intersection" === ring.positionKind
    ) {
      posX = sectorSize * ((i = ring.positionIndex) % 4);
      posY =
        i > 11
          ? 3 * sectorSize
          : i > 7
          ? 2 * sectorSize
          : i > 3
          ? sectorSize
          : 0;
    }
    if ("sector" === ring.positionKind) {
      posX = sectorSize * ((i = ring.positionIndex) % 3);
      posY = i > 5 ? 2 * sectorSize : i > 2 ? sectorSize : 0;
      posX += 0.5 * sectorSize;
      posY += 0.5 * sectorSize;
    }
    str += `
    <g transform="matrix(1,0,0,1,${posX},${posY})">
      <circle r="${diameter / 2}" fill="${
      ring.solid ? canvasColor : "none"
    }" stroke-width="${10}" stroke="${canvasColor}" />
    </g>
  `;
  }
}

str += foot;

document.getElementById("tiles").innerHTML = str;

// NOTE: when running from command line and wanting SVG saved to directory
// require("fs").writeFileSync(
//   process.argv.find((arg) => arg.startsWith("-o"))?.replace("-o", "") ||
//     "./tiles-alone/output.svg",
//   str
// );

// console.log(address);
