import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import {Video,Phone,Wifi,Zap,Monitor,Fingerprint,Hexagon,Server,HardDrive,Cable,Network,ArrowRight,CheckCircle2,Send} from 'lucide-react'
const I={Video,Phone,Wifi,Zap,Monitor,Fingerprint,Hexagon,Server,HardDrive,Cable,Network,ArrowRight,CheckCircle2,Send}
import {company} from '../data/config'

export const waLink=(t='')=>`https://wa.me/${company.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(t)}`
export function usePageMeta(title,desc){useEffect(()=>{document.title=title;document.querySelector('meta[name=description]')?.setAttribute('content',desc)},[title,desc])}

export const Button=({to,href,onClick,variant='primary',children,...r})=>{const c=`btn btn-${variant}`
  return to?<Link className={c} to={to} {...r}>{children}</Link>:href?<a className={c} href={href} {...r}>{children}</a>:<button className={c} onClick={onClick} {...r}>{children}</button>}

export const Heading=({eyebrow,title,text,center})=>(<div className={`heading reveal${center?' center':''}`}>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text&&<p>{text}</p>}</div>)

export const Img=({src,icon='Hexagon',color='#482D78',alt=''})=>{const Ic=I[icon]||I.Hexagon
  return <div className="img" style={{'--c':color}}>{src?<img src={src} alt={alt} loading="lazy"/>:<div className="ph"><Ic size={42}/><small>Add photo</small></div>}</div>}

export const ServiceCard=({s})=>{const Ic=I[s.icon]
  return <article className="card lift reveal" style={{'--c':s.color}}><span className="hex badge"><Ic size={26}/></span><h3>{s.title}</h3><p>{s.short}</p><Link className="more" to={`/services#${s.id}`}>Learn More <I.ArrowRight size={16}/></Link></article>}

export const ProductCard=({p,onView,onEnquire})=>(<article className="card lift product" style={{'--c':p.color}}>
  <Img src={p.image} icon={p.icon} color={p.color} alt={p.name}/><span className="tag">{p.category}</span><h3>{p.name}</h3><p>{p.desc}</p>
  <div className="row"><Button variant="outline" onClick={()=>onView(p)}>View Details</Button><Button onClick={()=>onEnquire(p)}>Enquire Now</Button></div></article>)

export function InquiryForm({ services = [], product, defaultService = '', onSent }) {
  const [v, setV] = useState({
    name: '',
    phone: '',
    email: '',
    service: product ? 'Product enquiry' : defaultService,
    message: product
      ? `I would like to enquire about: ${product.name}.`
      : ''
  });

  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setV(x => ({ ...x, service: defaultService }));
    }
  }, [defaultService]);

  const set = k => e => {
    setV(prev => ({ ...prev, [k]: e.target.value }));
  };

  const submit = e => {
    e.preventDefault();

    const x = {};

    // Mandatory Name field
    if (v.name.trim().length < 2) {
      x.name = 'Please enter your full name.';
    }

    // Mandatory Phone Number field
    if (!/^[+\d\s()-]{7,16}$/.test(v.phone.trim())) {
      x.phone = 'Enter a valid phone number.';
    }

    // Email is optional, but validate it if provided
    if (v.email.trim() && !/^\S+@\S+\.\S+$/.test(v.email.trim())) {
      x.email = 'Enter a valid email address.';
    }

    // Service and Message are optional

    setErr(x);

    if (Object.keys(x).length) return;

    // TODO: Connect to your backend / Cloudflare D1 API
    console.log('Inquiry', v);

    setSent(true);
    onSent && onSent(v);
  };

  if (sent) {
    return (
      <div className="ok" role="status">
        <I.CheckCircle2 />
        Thank you, {v.name.split(' ')[0]}. Your inquiry has been submitted.
      </div>
    );
  }

  const F = ({ k, label, type = 'text', children }) => (
    <label>
      {label}
      {children || (
        <input
          type={type}
          value={v[k]}
          onChange={set(k)}
          aria-invalid={!!err[k]}
          required={k === 'name' || k === 'phone'}
        />
      )}
      {err[k] && <em role="alert">{err[k]}</em>}
    </label>
  );

  return (
    <form onSubmit={submit} noValidate className="form">
      <F k="name" label="Full Name *" />
      <F k="phone" label="Phone Number *" type="tel" />
      <F k="email" label="Email Address" type="email" />

      <F k="service" label="Service Interested In">
        <select value={v.service} onChange={set('service')}>
          <option value="">Select a service…</option>
          {services.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </F>

      <F k="message" label="Message">
        <textarea
          rows="4"
          value={v.message}
          onChange={set('message')}
        />
      </F>

      <Button type="submit">
        <I.Send size={16} /> Submit Inquiry
      </Button>
    </form>
  );
}