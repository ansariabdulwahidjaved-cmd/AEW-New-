// Brand hexagon diagram drawn entirely in code (SVG + CSS) – replaces /brand-hexagons.jpg
// Animations (defined in styles.css, .bh-*): hexagons burst out from the centre, connector beams
// draw in and then carry flowing light, hexagons float gently, the centre pulses, hover lifts a hexagon.
// Animations start when the diagram scrolls into view and are disabled for reduced-motion users.
// Edit labels, colors and links in the `items` array below.
import {useEffect,useId,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {Video,Phone,Wifi,Lightbulb,Monitor,Fingerprint} from 'lucide-react'

const CX=450,CY=575,DIST=340,R_OUT=150,R_IN=170
const hexPath=r=>Array.from({length:6},(_,k)=>{const a=(-90+60*k)*Math.PI/180;return`${k?'L':'M'}${(r*Math.cos(a)).toFixed(1)} ${(r*Math.sin(a)).toFixed(1)}`}).join('')+'Z'
const OUT=hexPath(R_OUT),IN=hexPath(R_IN)

// angle: direction from the centre (deg, -90 = straight up). c1 = light shade, c2 = base shade.
const items=[
  {id:'telephone',lines:['TELEPHONE','SYSTEM'],Icon:Phone,angle:-90,c1:'#6bb558',c2:'#4a8a38'},
  {id:'wifi',lines:['WIFI','SOLUTION'],Icon:Wifi,angle:-30,c1:'#bd3d47',c2:'#8a232c'},
  {id:'survillance',lines:['ELECTRICAL','WORKS'],Icon:Lightbulb,angle:30,c1:'#e39c42',c2:'#bf7620'},
  {id:'access',lines:['ACCESS','CONTROL','SYSTEM'],Icon:Fingerprint,angle:90,c1:'#bb2a84',c2:'#8b1763'},
  {id:'computer',lines:['COMPUTER','SERVICE'],Icon:Monitor,angle:150,c1:'#4b8cc9',c2:'#2d649a'},
  {id:'cctv',lines:['CCTV CAMERA','SOLUTION'],Icon:Video,angle:210,c1:'#5a3a93',c2:'#3d2468'},
].map(it=>{const a=it.angle*Math.PI/180;return{...it,x:DIST*Math.cos(a),y:DIST*Math.sin(a)}})

export default function BrandHexagons({className=''}){
  const ref=useRef(null),nav=useNavigate(),uid=useId().replace(/:/g,'')
  // start animations only once the diagram is visible
  useEffect(()=>{const el=ref.current;if(!el)return
    if(!('IntersectionObserver' in window)){el.classList.add('play');return}
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('play');io.disconnect()}},{threshold:.2})
    io.observe(el);return()=>io.disconnect()},[])
  const go=to=>()=>nav(to)
  const key=to=>e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();nav(to)}}

  return <svg ref={ref} className={`bh ${className}`} viewBox="0 0 900 1150" role="group" aria-label="AEW service areas" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {items.map(it=><linearGradient key={it.id} id={`${uid}-${it.id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={it.c1}/><stop offset="1" stopColor={it.c2}/></linearGradient>)}
      <linearGradient id={`${uid}-center`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#d6d6dd"/></linearGradient>
      {/* fine dot texture, like the printed halftone look of the original artwork */}
      <pattern id={`${uid}-dots`} width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".9" fill="#000" fillOpacity=".13"/></pattern>
      <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#241a3d" floodOpacity=".28"/></filter>
    </defs>

    {/* connector beams from the centre to every hexagon */}
    <g transform={`translate(${CX} ${CY})`}>
      {items.map((it,i)=><g key={it.id}>
        <path className="bh-beam" pathLength="1" d={`M0 0L${it.x.toFixed(1)} ${it.y.toFixed(1)}`} stroke={it.c2} strokeWidth="96" fill="none" style={{animationDelay:`${.15+i*.1}s`}}/>
        <path className="bh-flow" d={`M0 0L${it.x.toFixed(1)} ${it.y.toFixed(1)}`} stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" style={{animationDelay:`${1.2+i*.1}s,${1.2+i*.1}s`}}/>
      </g>)}
    </g>

    {/* six service hexagons */}
    {items.map((it,i)=>{const {Icon,lines}=it,three=lines.length===3,iy=three?-85:-70,ty=three?0:16
      return <g key={it.id} transform={`translate(${(CX+it.x).toFixed(1)} ${(CY+it.y).toFixed(1)})`}>
        <g className="bh-pop" style={{'--dx':`${(-it.x).toFixed(1)}px`,'--dy':`${(-it.y).toFixed(1)}px`,animationDelay:`${.35+i*.12}s`}}>
          <g className="bh-float" style={{animationDelay:`${1.8+i*.45}s`}}>
            <g className="bh-link" role="link" tabIndex={0} aria-label={`${lines.join(' ')} – learn more`} onClick={go(`/services#${it.id}`)} onKeyDown={key(`/services#${it.id}`)}>
              <g className="bh-hover" filter={`url(#${uid}-shadow)`}>
                <path className="bh-hex" d={OUT} fill={`url(#${uid}-${it.id})`} stroke={it.c2} strokeWidth="6" strokeLinejoin="round"/>
                <path d={OUT} fill={`url(#${uid}-dots)`} pointerEvents="none"/>
                <path d={OUT} fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" transform="scale(.92)" pointerEvents="none"/>
                <Icon x={-28} y={iy-28} width={56} height={56} color="#fff" strokeWidth={1.7} className="bh-icon"/>
                <text textAnchor="middle" fill="#fff" className="bh-label">{lines.map((l,n)=><tspan key={l} x="0" y={ty+n*36}>{l}</tspan>)}</text>
              </g>
            </g>
          </g>
        </g>
      </g>})}

    {/* centre hexagon: logo + contact link */}
    <g transform={`translate(${CX} ${CY})`}>
      <path className="bh-pulse" d={IN} fill="none" stroke="#482D78" strokeWidth="3"/>
      <path className="bh-pulse p2" d={IN} fill="none" stroke="#579B45" strokeWidth="3"/>
      <g className="bh-pop" style={{'--dx':'0px','--dy':'0px',animationDelay:'0s'}}>
        <g className="bh-link" role="link" tabIndex={0} aria-label="Contact us" onClick={go('/contact')} onKeyDown={key('/contact')}>
          <g className="bh-hover" filter={`url(#${uid}-shadow)`}>
            <path className="bh-hex" d={IN} fill={`url(#${uid}-center)`} stroke="#c4c3cf" strokeWidth="6" strokeLinejoin="round"/>
            <path d={IN} fill={`url(#${uid}-dots)`} pointerEvents="none"/>
            {/* AEW logo drawn in code */}
            <g transform="translate(-120 -102) scale(.8)">
              <ellipse className="bh-draw" pathLength="1" cx="150" cy="80" rx="142" ry="68" fill="none" stroke="#3B3F6E" strokeWidth="5"/>
              <ellipse className="bh-draw d2" pathLength="1" cx="150" cy="80" rx="133" ry="60" fill="none" stroke="#482D78" strokeWidth="1.6"/>
              <path className="bh-draw d3" pathLength="1" d="M28 62C60 28 130 18 190 24" fill="none" stroke="#3B3F6E" strokeWidth="4" strokeLinecap="round"/>
              <path className="bh-draw d3" pathLength="1" d="M272 98C240 132 170 142 110 136" fill="none" stroke="#3B3F6E" strokeWidth="4" strokeLinecap="round"/>
              <g fontFamily="'Arial Black',Arial,Helvetica,sans-serif" fontWeight="900" fontSize="84" textAnchor="middle" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                <text className="bh-letter b1" x="92" y="104" fill="#1E9B5A">A</text>
                <text className="bh-letter b2" x="152" y="104" fill="#3B2E8C">E</text>
                <text className="bh-letter b3" x="214" y="104" fill="#9B2E8F">W</text>
              </g>
              <path className="bh-draw d4" pathLength="1" d="M128 112H254" fill="none" stroke="#3B2E8C" strokeWidth="4" strokeLinecap="round"/>
            </g>
            <text x="0" y="104" textAnchor="middle" className="bh-contact">CONTACT US</text>
          </g>
        </g>
      </g>
    </g>
  </svg>}
