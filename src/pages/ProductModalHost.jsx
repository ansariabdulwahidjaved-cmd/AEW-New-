import {useState,useEffect} from 'react'
import {X,MessageCircle} from 'lucide-react'
import {ProductCard,Img,Button,InquiryForm,waLink} from '../components/ui'
import {services} from '../data/services'
// Renders a grid of products with View Details / Enquire modals.
export default function ProductBrowser({list}){const [sel,setSel]=useState(null),[mode,setMode]=useState('view')
  useEffect(()=>{const k=e=>e.key==='Escape'&&setSel(null);window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)},[])
  return <><div className="grid">{list.map(p=><ProductCard key={p.id} p={p} onView={p=>{setSel(p);setMode('view')}} onEnquire={p=>{setSel(p);setMode('enquire')}}/>)}</div>
  {sel&&<div className="overlay" onClick={()=>setSel(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={sel.name} onClick={e=>e.stopPropagation()}>
    <button className="close" aria-label="Close" onClick={()=>setSel(null)}><X/></button>
    <h3>{sel.name}</h3><span className="tag">{sel.category}</span>
    {mode==='view'?<><Img src={sel.image} icon={sel.icon} color={sel.color} alt={sel.name}/><p>{sel.desc}</p><p><strong>Specifications:</strong> {sel.specs||'[Add product details]'}</p>
      <div className="row"><Button onClick={()=>setMode('enquire')}>Enquire Now</Button><Button href={waLink(`Hello AEW, I'd like to enquire about: ${sel.name}`)} target="_blank" rel="noreferrer" variant="wa"><MessageCircle size={16}/> WhatsApp</Button></div></>
    :<><InquiryForm product={sel} services={['Product enquiry',...services.map(s=>s.title)]}/><Button href={waLink(`Hello AEW, I'd like to enquire about: ${sel.name}`)} target="_blank" rel="noreferrer" variant="wa"><MessageCircle size={16}/> Enquire on WhatsApp</Button></>}
  </div></div>}</>}
