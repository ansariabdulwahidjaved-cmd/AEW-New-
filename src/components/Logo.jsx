// AEW logo drawn in code (SVG) and animated: rings draw in, letters rise in, underline sweeps.
// Edit colors/text here. Animations are defined in styles.css (.logo-*) and disabled for reduced-motion users.
import {useState,useEffect} from 'react'

// Replay the intro animation every REPLAY_MS (change this number to adjust the gap).
const REPLAY_MS=5000

export default function Logo({className=''}){
  const [cycle,setCycle]=useState(0)
  useEffect(()=>{
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const id=setInterval(()=>setCycle(c=>c+1),REPLAY_MS)
    return ()=>clearInterval(id)
  },[])
  // Changing `key` remounts the SVG, which restarts all the CSS animations.
  return <svg key={cycle} className={`logo ${className}`} viewBox="0 0 300 160" role="img" aria-label="AEW logo" xmlns="http://www.w3.org/2000/svg">
    <ellipse className="logo-ring" pathLength="1" cx="150" cy="80" rx="142" ry="68" fill="none" stroke="#3B3F6E" strokeWidth="5"/>
    <ellipse className="logo-ring r2" pathLength="1" cx="150" cy="80" rx="133" ry="60" fill="none" stroke="#482D78" strokeWidth="1.6"/>
    <path className="logo-ring r3" pathLength="1" d="M28 62C60 28 130 18 190 24" fill="none" stroke="#3B3F6E" strokeWidth="4" strokeLinecap="round"/>
    <path className="logo-ring r3" pathLength="1" d="M272 98C240 132 170 142 110 136" fill="none" stroke="#3B3F6E" strokeWidth="4" strokeLinecap="round"/>
    <g fontFamily="'Arial Black',Arial,Helvetica,sans-serif" fontWeight="900" fontSize="84" textAnchor="middle" stroke="#fff" strokeWidth="3" paintOrder="stroke">
      <text className="logo-l l1" x="92" y="104" fill="#1E9B5A">A</text>
      <text className="logo-l l2" x="152" y="104" fill="#3B2E8C">E</text>
      <text className="logo-l l3" x="214" y="104" fill="#9B2E8F">W</text>
    </g>
    <path className="logo-ring ul" pathLength="1" d="M128 112H254" fill="none" stroke="#3B2E8C" strokeWidth="4" strokeLinecap="round"/>
  </svg>}
