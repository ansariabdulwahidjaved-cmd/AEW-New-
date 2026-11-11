import {useState} from 'react'
import {Search} from 'lucide-react'
import {Heading,usePageMeta} from '../components/ui'
import ProductBrowser from './ProductModalHost'
import {products,categories} from '../data/products'
export default function Products(){usePageMeta('Products – CCTV Cameras & Accessories | AEW','Browse CCTV cameras, recorders, storage, accessories and networking products from AEW and send an inquiry.')
  const [cat,setCat]=useState('All'),[q,setQ]=useState('')
  const list=products.filter(p=>(cat==='All'||p.category===cat)&&p.name.toLowerCase().includes(q.trim().toLowerCase()))
  return <section><div className="wrap"><Heading eyebrow="Catalog" title="Our Products" text="Product details are samples for now. Send an inquiry for availability and pricing."/>
  <div className="filters"><div className="chips">{['All',...categories].map(c=><button key={c} className={c===cat?'chip on':'chip'} onClick={()=>setCat(c)}>{c}</button>)}</div>
    <label className="search"><Search size={16}/><input placeholder="Search products by name" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search products"/></label></div>
  {list.length?<ProductBrowser list={list}/>:<p className="center">No products match your search.</p>}</div></section>}
