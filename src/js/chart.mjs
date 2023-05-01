import { node_args, unit } from "./utils.mjs";

let [data] = node_args(JSON.parse)

const n = (str) => str.replaceAll("-", " ").replaceAll("_", " ")
const c = (str) => str[0]?.toUpperCase() + str.slice(1)
let values = Object.values(data.results)
let max = values.map(v => v.edge_case.mean)

let mx = 0
max.forEach(v => { if (v > mx) { mx = v } })

let y = (v) => (32 - 2) - (((32 - 4) * v) / mx)
let h = (v) => (((32 - 4) * v) / mx)

let qrt = (32 - 2) / 4

let lo = 0
let end = (values.length * 6.75) + ((values.length + 1) * 2.25)

let svg = `
<svg class="chart" viewBox="0 0 96 32" xmlns="http://www.w3.org/2000/svg">
  <style>
    .chart .bg {
      fill: #eee5;
    }
    .chart .w {
      fill: none;
      stroke: #808080;
      stroke-width: 0.075;
    }
    .chart .c {
      fill: #2f81f7;
    }
    .chart .t {
      font-size: 1.4px;
      font-weight: bold;
      fill: #808080;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      transform: rotate(90deg);
      transform-box: fill-box;
      transform-origin: left;
    }
    .chart .un {
      font-size: 1.4px;
      font-weight: bold;
      fill: #2f81f7;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
    .chart path {
      fill: none;
      stroke: #2f81f7;
      stroke-linejoin: round;
      stroke-linecap: round;
    }
  </style>

  <!--<rect class="bg" width="128" height="32" rx="0.15"/>
  <rect 
    class="w"
    x="0"
    y="2"
    width="${(values.length * 6.75) + ((values.length + 1) * 2.25)}"
    height="29"
    rx="0.1"
  />-->

  <text class="un" x="${end + 1}" y="${qrt * 1}" >${unit(mx / 4 * 3)}</text>
  <text class="un" x="${end + 1}" y="${qrt * 2}" >${unit(mx / 4 * 2)}</text>
  <text class="un" x="${end + 1}" y="${qrt * 3}" >${unit(mx / 4 * 1)}</text>

  <path class="w" d="
    M${lo}
    ,0 ${lo},30 ${end},30
    M${lo},${qrt * 1} ${end},${qrt * 1}
    M${lo},${qrt * 2} ${end},${qrt * 2}
    M${lo},${qrt * 3} ${end},${qrt * 3}
  "/>

  ${values.map((v, i) => `

  <text x="${(i * 6.75) + ((i) * 2.25) + lo + 1.25}" y="1" class="t">${n(Object.keys(data.results)[i])}</text>

  <rect 
    class="c" 
    x="${(i * 6.75) + ((i + 1) * 2.25) + lo}" 
    y="${y(v.simple.mean)}" 
    height="${h(v.simple.mean)}" 
    width="2" 
    rx="0.1"
  />

  <rect 
    class="c" 
    x="${(i * 6.75) + 2.25 + ((i + 1) * 2.25) + lo}" 
    y="${y(v.realistic.mean)}" 
    height="${h(v.realistic.mean)}" 
    width="2"
    rx="0.1"
  />

  <rect 
    class="c" 
    x="${(i * 6.75) + 4.5 + ((i + 1) * 2.25) + lo}" 
    y="${y(v.edge_case.mean)}" 
    height="${h(v.edge_case.mean)}"
    width="2"
    rx="0.1"
  />`).join("")}

</svg>
`

console.log(svg)