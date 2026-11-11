// Brand marquee: brands are split into rows of `perRow`; every row scrolls continuously and
// neighbouring rows scroll in opposite directions (row 1 right→left, row 2 left→right, …).
// Pure CSS animation (see ".brands" in styles.css). Each row's track holds two identical groups
// and slides by exactly one group (-50%), so the loop is seamless. Duplicates are aria-hidden.
import {brands as defaultBrands} from '../data/brands'

function BrandLogo({b}){
  if(b.logo)return <img className="bl-img" src={b.logo} alt="" loading="lazy" draggable="false"/>
  if(b.parts)return <svg className="bl-svg" viewBox="0 0 170 48" role="img" aria-hidden="true" focusable="false">
    <text x="85" y="34" textAnchor="middle" fontFamily="Arial,Helvetica,sans-serif" fontSize={b.size||32} fontWeight={b.weight||800}
      fontStyle={b.italic?'italic':'normal'} letterSpacing={b.spacing||0}>
      {b.parts.map((p,i)=><tspan key={i} fill={p.c}>{p.t}</tspan>)}
    </text></svg>
  // placeholder until a logo is provided
  return <svg className="bl-svg bl-ph" viewBox="0 0 170 48" aria-hidden="true" focusable="false">
    <rect x="45" y="3" width="80" height="42" rx="8" fill="#f1efe6" stroke="#cfcab8" strokeWidth="1.5" strokeDasharray="5 4"/>
    <circle cx="68" cy="19" r="4.5" fill="#cfcab8"/><path d="M52 40l15-14 10 9 9-8 22 13z" fill="#cfcab8"/>
  </svg>}

const chunk=(a,n)=>Array.from({length:Math.ceil(a.length/n)},(_,i)=>a.slice(i*n,i*n+n))

export default function BrandsMarquee({brands=defaultBrands,title='Co-Associated With',perRow=6}){
  if(!brands.length)return null
  const rows=chunk(brands,perRow)
  return <section className="brands" aria-label={title}>
    <div className="wrap"><span className="eyebrow brands-label">{title}</span></div>
    <div className="mq-rows">{rows.map((row,ri)=>{
      // repeat the row until a group has at least 12 cards, so it is always wider than the screen (no blank gap) and every row scrolls at the same speed
      const reps=Math.max(2,Math.ceil(12/row.length))
      const group=g=><ul className="mq-group" key={g} aria-hidden={g>0||undefined}>
        {Array.from({length:reps}).flatMap((_,r)=>row.map(b=><li className="mq-item" key={`${r}-${b.name}`} aria-hidden={(g>0||r>0)||undefined}>
          <BrandLogo b={b}/><span className="mq-name">{b.name}</span></li>))}
      </ul>
      return <div className={`marquee${ri%2?' rev':''}`} key={ri}><div className="mq-track">{[0,1].map(group)}</div></div>})}
    </div>
  </section>}
