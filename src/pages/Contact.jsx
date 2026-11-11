import {useSearchParams} from 'react-router-dom'
import {Phone,Mail,MapPin,Clock,MessageCircle} from 'lucide-react'
import {Heading,Button,InquiryForm,usePageMeta,waLink} from '../components/ui'
import {company} from '../data/config'
import {services} from '../data/services'
export default function Contact(){usePageMeta('Contact AEW – Get a Quote','Contact AEW for CCTV, networking, survillance, computer and access control enquiries.')
  const [sp]=useSearchParams();const d=sp.get('service')||''
  const info=[[Phone,'Phone',company.phone],[MessageCircle,'WhatsApp',company.whatsapp||'[Add WhatsApp Number]'],[Mail,'Email',company.email],[MapPin,'Address',company.address],[Clock,'Working Hours',company.hours]]
  return <section><div className="wrap"><Heading eyebrow="Get in Touch" title="Contact Us" text="Tell us what you need and we will get back to you."/>
  <div className="two top"><div className="reveal"><h3>AEW</h3>{info.map(([Ic,l,t])=><p key={l} className="info"><Ic size={18}/><span><strong>{l}</strong><br/>{t}</span></p>)}
    <Button href={waLink('Hello AEW, I would like to make an enquiry.')} target="_blank" rel="noreferrer" variant="wa"><MessageCircle size={16}/> Chat on WhatsApp</Button>
    <div className="map">{company.mapEmbedUrl?<iframe title="AEW location" src={company.mapEmbedUrl} loading="lazy"/>:<span><MapPin/> Google Maps location placeholder</span>}</div></div>
  <div className="card reveal"><h3>Send an Inquiry</h3><InquiryForm services={services.map(s=>s.title)} defaultService={d}/></div></div></div></section>}
