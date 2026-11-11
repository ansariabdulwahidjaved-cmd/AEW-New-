import {Button,Heading,Img,usePageMeta} from '../components/ui'
import {services} from '../data/services'
export default function Services(){usePageMeta('Services – CCTV, WiFi, Survillance & More | AEW','Detailed CCTV, telephone, WiFi, survillance, computer and access control services from AEW.')
  return <section><div className="wrap"><Heading eyebrow="What We Do" title="Our Services" text="Installation, maintenance and supply across six service areas."/>
  {services.map((s,i)=><article id={s.id} key={s.id} className={`svc two reveal${i%2?' flip':''}`} style={{'--c':s.color}}>
    <Img src={s.image} icon={s.icon} color={s.color} alt={s.title}/>
    <div><h3>{s.title}</h3><p>{s.desc}</p><ul className="ticks">{s.items.map(t=><li key={t}>{t}</li>)}</ul><Button to={`/contact?service=${encodeURIComponent(s.title)}`}>Get a Quote</Button></div></article>)}</div></section>}
