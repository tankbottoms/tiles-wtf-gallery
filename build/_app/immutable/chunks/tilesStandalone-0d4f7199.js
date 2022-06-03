import{W as N,H as V}from"./ethers-1dcdd663.js";const C=['<path d="M100 100L100 0H0C0 55.2285 44.7715 100 100 100Z" fill="#000"/>','<path d="M0 100L0 0H100C100 55.2285 55.2285 100 0 100Z" fill="#000"/>','<path d="M0 0L0 100H100C100 44.7715 55.2285 0 0 0Z" fill="#000"/>','<path d="M100 0L100 100H0C0 44.7715 44.7715 0 100 0Z" fill="#000"/>','<circle cx="50" cy="50" r="50" fill="#000"/>','<circle cx="50" cy="50" r="20" fill="#000"/>','<path d="M0 0C0 55.2285 44.7715 100 100 100C100 44.7715 55.2285 0 0 0Z" fill="#000"/>','<path d="M0 100C0 44.7715 44.7715 0 100 0C100 55.2285 55.2285 100 0 100Z" fill="#000"/>','<path d="M100 0H0L100 100V0Z" fill="#000"/>','<path d="M0 0H100L0 100V0Z" fill="#000"/>','<path d="M0 100H100L0 0V100Z" fill="#000"/>','<path d="M100 100H0L100 0V100Z" fill="#000"/>','<path d="M50 100C50 72.3858 27.6142 50 0 50V100H50Z" fill="#000"/>','<path d="M50 100C50 72.3858 72.3858 50 100 50V100H50Z" fill="#000"/>','<path d="M50 0C50 27.6142 72.3858 50 100 50V0H50Z" fill="#000"/>','<path d="M50 0C50 27.6142 27.6142 50 0 50V0H50Z" fill="#000"/>'],H="#faf3e8",k=`<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns:svgjs="http://svgjs.dev/svgjs"
version="1.1"
width="360"
height="360"
id="SvgjsSvg1000"
>
<rect width="360" height="360" fill="${H}" />
<g transform="matrix(1,0,0,1,30,30)">
<g>
`,L=`
</g>
</g>
</svg>`,n=100;function g(s,t){for(let e=0,r=t.length,d=s.length;e<r;e++,d++)s[d]=t[e];return s}function y(s){const t=s.positions,e=s.positionKind,r=s.sizes,d=s.layers,h=s.solid;return t.flatMap(function(x){return r.flatMap(function($){return d.map(function(M){return{positionIndex:x,positionKind:e,size:$,layer:M,solid:h}})})})}const Z=g(g(g(g(g(g(g([null],y({positionKind:"intersection",positions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sizes:[1,2,3],layers:[2]})),y({positionKind:"intersection",positions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sizes:[1,2],layers:[1,2],solid:!0})),y({positionKind:"intersection",positions:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],sizes:[3],layers:[0,1],solid:!0})),y({positionKind:"sector",positions:[0,1,2,3,4,5,6,7,8],sizes:[1,2],layers:[1,2]})),y({positionKind:"sector",positions:[0,1,2,3,4,5,6,7,8],sizes:[0,1],layers:[0,1,2],solid:!0})),y({positionKind:"sector",positions:[0,1,2,3,4,5,6,7,8],sizes:[2],layers:[0,1],solid:!0})),y({positionKind:"sector",positions:[4],sizes:[1,2],layers:[0]})),S=s=>{let t=[];return s.split("").reduce(function(e,r){if(t.push(r),t.length===4){let d=t;return t=[],g(g([],e),[d])}return e},[])},b=s=>Number(`0x${s.join("")}`),l="#FE4465",f="#222",c="#1A49EF",a="#F8D938",j={0:[l,a,f],1:[l,f,c],2:[l,a,c],3:[l,c,a],4:[c,a,l],5:[c,l,a],6:[c,a,a],7:[c,f,l],8:[f,l,a],9:[f,l,c],10:[f,c,l],11:[f,a,c],12:[a,l,f],13:[a,c,l],14:[a,f,c],15:[a,f,l]},F=s=>{const t=j[s];return{layer0:t[0],layer1:t[1],layer2:t[2]}},A=s=>s.map(function(t){const e=F(Number(`0x${t[0]}`));return[{svg:C[Number(`0x${t[1]}`)],color:e.layer0},{svg:C[Number(`0x${t[2]}`)],color:e.layer1},{svg:C[Number(`0x${t[3]}`)],color:e.layer2}]});function W(s=10){const e=N.createRandom().mnemonic.phrase,r=V.fromMnemonic(e),d=[];for(let h=0;h<s;h++){const x=r.derivePath(`m/44'/60'/0'/0/${h}`).address;d.push(x)}return d}function D(s){var x,$,M;let t=k;const e=s.slice(2),r=S(e),d=r.slice(1),h=[Z[b([r[0][0],r[0][1]])],Z[b([r[0][2],r[0][3]])]].filter(Boolean);for(let v=0;v<3;v++){for(let i=0;i<9;i++){const p=A(d),{svg:o,color:u}=p[i][v];let m="";if(o.startsWith("<path"))m=`
      <g transform="matrix(1,0,0,1,${i%3*100},${Math.floor(i%9/3)*100})">
        ${o.replace(/fill="#000"/g,`fill="${u}"`).replace("/>",' style="opacity: 0.88;" />')}
      </g>
    `;else if(o.startsWith("<circle")){const z=Number(((x=o.match(/cx="(\d+)"/))==null?void 0:x[1])||50),K=Number((($=o.match(/cy="(\d+)"/))==null?void 0:$[1])||50),w=Number(((M=o.match(/r="(\d+)"/))==null?void 0:M[1])||50);m=`
      <g transform="matrix(1,0,0,1,${i%3*100},${Math.floor(i%9/3)*100})">
        ${o.replace(/fill="#000"/g,`fill="${u}"`).replace(/cx="(\d+)"/g,`cx="${w}"`).replace(/cy="(\d+)"/g,`cy="${w}"`).replace(/\/>/,` transform="matrix(1,0,0,1,${[z-w,K-w].join(",")})" />`).replace("/>",' style="opacity: 0.88;" />')}
      </g>
    `}t+=m}for(const i of h.filter(p=>p.layer===v)){let p,o=0,u=0,m=0;switch(i.size){case 0:o=n-90;break;case 1:o=n-50-1.2;break;case 2:o=n-10;break;case 3:o=2*n-10}(i.layer===2&&(o+=.5)||i.positionKind==="intersection")&&(u=n*((p=i.positionIndex)%4),m=p>11?3*n:p>7?2*n:p>3?n:0),i.positionKind==="sector"&&(u=n*((p=i.positionIndex)%3),m=p>5?2*n:p>2?n:0,u+=.5*n,m+=.5*n),t+=`
    <g transform="matrix(1,0,0,1,${u},${m})">
      <circle r="${o/2}" fill="${i.solid?H:"none"}" stroke-width="${10}" stroke="${H}" />
    </g>
  `}}return t+=L,t}export{D as a,W as g};
