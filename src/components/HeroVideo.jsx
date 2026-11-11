// Blurred, looping background video playlist for the hero section.
// Videos come from src/data/heroVideos.js. Muted + playsInline so browsers allow autoplay (also on phones).
import {useEffect,useRef,useState} from 'react'
import {heroVideos,heroVideoStyle} from '../data/heroVideos'

export default function HeroVideo({videos=heroVideos}){
  const [i,setI]=useState(0),refs=useRef([])
  const reduce=typeof window!=='undefined'&&window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const next=()=>setI(n=>(n+1)%videos.length)

  // play only the active video (from the start); pause the others once they have faded out
  useEffect(()=>{if(reduce)return
    refs.current.forEach((v,k)=>{if(!v)return
      if(k===i){v.currentTime=0;v.play().catch(()=>{})}else setTimeout(()=>{if(refs.current[k]&&k!==i)refs.current[k].pause()},1200)})},[i,reduce])

  if(!videos.length)return null
  return <div className="herovideo" aria-hidden="true" style={{'--hv-blur':`${heroVideoStyle.blur}px`,'--hv-overlay':heroVideoStyle.overlay}}>
    {videos.map((v,k)=><video key={v.src} ref={el=>refs.current[k]=el} className={k===i?'on':''} src={v.src} poster={v.poster}
      muted playsInline preload={k===0?'auto':'metadata'} autoPlay={k===0&&!reduce} loop={videos.length===1} onEnded={next} tabIndex={-1}/>)}
    <span className="hv-shade"/>
  </div>}
