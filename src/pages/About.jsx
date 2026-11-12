import { Heart, Eye, Target, ShieldCheck, Handshake, Gem } from 'lucide-react'
import { Heading, Button, usePageMeta } from '../components/ui'
import BrandHexagons from '../components/BrandHexagons'
const P = '[Edit this text with AEW’s own information]'
const vals = [[ShieldCheck, 'Reliability'], [Gem, 'Quality'], [Handshake, 'Integrity'], [Heart, 'Customer Care']]
export default function About() {
  usePageMeta('About AEW – Security, Networking & Survillance Solutions', 'Learn about AEW, our mission, vision and values.')
  return <><section><div className="wrap two"><div><Heading eyebrow="About Us" title="About AEW" /><p className="reveal">AEW provides CCTV, telephone, WiFi, survillance, computer and access control solutions, covering installation, maintenance and supply under one roof.</p></div>
    <div className="reveal brand-hex"><BrandHexagons /></div></div></section>
    <section className="alt"><div className="wrap"><Heading eyebrow="Our Story" title="How AEW began" /><p className="reveal note">Our Story – AEW
      Founded in 2017, AEW began with a vision to deliver reliable technology and security solutions that businesses can trust.
      Over the years, we have grown through innovation, dedication, and strong relationships. Our journey is strengthened by partnerships with leading brands like HP, Dell, Honeywell, TP-Link, and many others.
      We are proud to have served reputed organizations such as Zomato, Air India, and Zepto, building trust through quality products and dependable services.
      Today, AEW continues to move forward with a commitment to smarter security, innovative technology, and long-lasting customer relationships.
      AEW – Securing Today, Empowering Tomorrow.</p></div></section>
    <section><div className="wrap grid2"><div className="card reveal" style={{ '--c': '#482D78' }}><span className="hex badge"><Target /></span><h3>Our Mission</h3><p>To deliver dependable security, networking and survillance solutions through quality products and careful installation. <em className="note"></em></p></div>
      <div className="card reveal" style={{ '--c': '#3978B5' }}><span className="hex badge"><Eye /></span><h3>Our Vision</h3><p>To be a trusted partner customers rely on for their technology and infrastructure needs. <em className="note"></em></p></div></div></section>
    <section className="alt"><div className="wrap"><Heading center eyebrow="Principles" title="Our Values" /><div className="grid">{vals.map(([Ic, t], i) => <div key={t} className="why reveal" style={{ '--c': ['#482D78', '#579B45', '#A52F38', '#D58A30'][i] }}><span className="hex badge"><Ic /></span><h3>{t}</h3></div>)}</div></div></section>
    <section><div className="wrap"><Heading eyebrow="Why AEW" title="Why customers should choose AEW" /><ul className="ticks reveal"><li>Quality products</li><li>Professional installation</li><li>Reliable support and maintenance</li><li>Complete solutions under one roof</li></ul><Button to="/contact">Contact Us</Button></div></section></>
}
