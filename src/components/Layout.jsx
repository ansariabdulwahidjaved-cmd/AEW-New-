import {useState,useEffect} from 'react'
import {NavLink,Link,useLocation} from 'react-router-dom'
import {Menu,X,Phone,Mail,MapPin,Facebook,Instagram,Linkedin} from 'lucide-react'
import {company} from '../data/config'
import {services} from '../data/services'
import Logo from './Logo'
const links=[['/','Home'],['/about','About'],['/services','Services'],['/products','Products'],['/contact','Contact Us']]
export function Navbar(){const [o,setO]=useState(false),{pathname}=useLocation();useEffect(()=>setO(false),[pathname])
  return <header className="nav"><div className="wrap bar"><Link to="/" className="brand" aria-label="AEW home"><Logo/></Link>
    <button className="burger" aria-label="Toggle menu" aria-expanded={o} onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button>
    <nav className={o?'open':''}>{links.map(([to,t])=><NavLink key={to} to={to} end={to==='/'}>{t}</NavLink>)}</nav></div></header>}
export const Footer=()=>(<footer><div className="wrap fgrid">
  <div><Logo className="flogo"/><p>Security, networking, survillance and technology solutions.</p></div>
  <div><h4>Quick Links</h4>{links.map(([to,t])=><Link key={to} to={to}>{t}</Link>)}</div>
  <div><h4>Services</h4>{services.map(s=><Link key={s.id} to={`/services#${s.id}`}>{s.title}</Link>)}</div>
  <div><h4>Contact</h4><span><Phone size={14}/> {company.phone}</span><span><Mail size={14}/> {company.email}</span><span><MapPin size={14}/> {company.address}</span>
    <div className="social"><a href={company.social.facebook} aria-label="Facebook"><Facebook size={18}/></a><a href={company.social.instagram} aria-label="Instagram"><Instagram size={18}/></a><a href={company.social.linkedin} aria-label="LinkedIn"><Linkedin size={18}/></a></div></div></div>
  <div className="copy">© {new Date().getFullYear()} AEW. All rights reserved.</div></footer>)
