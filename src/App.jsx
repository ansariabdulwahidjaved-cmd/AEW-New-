import {useEffect} from 'react'
import {Routes,Route,Navigate,useLocation} from 'react-router-dom'
import {Navbar,Footer} from './components/Layout'
import Home from './pages/Home';import About from './pages/About';import Services from './pages/Services';import Products from './pages/Products';import Contact from './pages/Contact'
export default function App(){const loc=useLocation()
  useEffect(()=>{if(loc.hash)setTimeout(()=>document.querySelector(loc.hash)?.scrollIntoView({behavior:'smooth'}),80);else window.scrollTo(0,0)
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1})
    const t=setTimeout(()=>document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el)),30);return()=>{clearTimeout(t);io.disconnect()}},[loc.pathname,loc.hash])
  return <><Navbar/><main><div key={loc.pathname} className="page"><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/><Route path="/products" element={<Products/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></div></main><Footer/></>}
