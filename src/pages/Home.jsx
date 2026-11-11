import {Link} from 'react-router-dom'
import {ShieldCheck,Wrench,LifeBuoy,Smile,Layers,Award} from 'lucide-react'
import {Button,Heading,ServiceCard,Img,usePageMeta,InquiryForm} from '../components/ui'
import {services} from '../data/services'
import {products} from '../data/products'
import Logo from '../components/Logo'
import HeroVideo from '../components/HeroVideo'
import BrandsMarquee from '../components/BrandsMarquee'
import BrandHexagons from '../components/BrandHexagons'
import Clients from '../components/Clients'
import ProductBrowser from './ProductModalHost'
const why=[[Award,'Quality Products','Carefully selected products for dependable day-to-day performance.'],[Wrench,'Professional Installation','Neat, careful installation by trained hands.'],[LifeBuoy,'Reliable Support','Help when you need it, from maintenance to troubleshooting.'],[Smile,'Customer Satisfaction','We aim to leave every customer confident in their system.'],[Layers,'Complete Solutions Under One Roof','Security, networking, survillance and computing in one place.']]
export default function Home(){usePageMeta('AEW – Complete Security, Networking & Survillance Solutions','CCTV, telephone, WiFi, survillance, computer and access control installation, maintenance and supply by AEW.')
  const featured=products.filter(p=>p.category==='CCTV Cameras').slice(0,4)
  return <>
  <section className="hero hexbg"><HeroVideo/><div className="wrap two"><div className="slide">
    <Logo className="herologo"/><h1>Complete Security, Networking &amp; Survillance Solutions</h1>
    <p className="lead">Reliable solutions for your security, connectivity, survillance and technology needs.</p>
    <div className="row"><Button to="/services">Explore Our Services</Button><Button to="/contact" variant="outline">Contact Us</Button></div></div>
    {/* <Img icon="Video" color="#482D78" alt="CCTV installation"/> */}
    </div></section>
  <BrandsMarquee/>
  <section className="alt"><div className="wrap two"><div><Heading eyebrow="About AEW" title="Trusted installation, maintenance and supply"/>
    <p className="reveal">AEW provides security, networking, survillance and computer solutions, combining quality products with careful professional installation and attentive customer care.</p>
    <ul className="ticks reveal"><li>Reliability</li><li>Quality products</li><li>Professional installation</li><li>Customer satisfaction</li></ul><Button to="/about" variant="outline">Read More</Button></div>
    <div className="reveal brand-hex"><BrandHexagons/></div></div></section>
  <Clients/>
  <section><div className="wrap"><Heading center eyebrow="What We Do" title="Our Services"/><div className="grid">{services.map(s=><ServiceCard key={s.id} s={s}/>)}</div></div></section>
  <section className="alt"><div className="wrap"><Heading center eyebrow="Why AEW" title="Why Choose Us"/><div className="grid">{why.map(([Ic,t,d],i)=><div key={t} className="why reveal" style={{'--c':['#482D78','#579B45','#A52F38','#D58A30','#3978B5'][i]}}><span className="hex badge"><Ic size={24}/></span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
  {/* <section><div className="wrap"><Heading center eyebrow="Catalog" title="Featured Products" text="Browse our CCTV range and send us an inquiry."/><ProductBrowser list={featured}/><div className="center"><Button to="/products" variant="outline">View All Products</Button></div></div></section> */}
  <section className="cta"><div className="wrap center reveal"><h2>Looking for Reliable Security &amp; Survillance Solutions?</h2><Button to="/contact" variant="light">Get in Touch</Button></div></section></>}
