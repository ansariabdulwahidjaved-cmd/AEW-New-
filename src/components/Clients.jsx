
import { useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clients as defaultClients } from '../data/clients'
import { Heading } from './ui'

function ClientLogo({ c }) {
  if (c.logo) {
    return (
      <img
        className="client-logo"
        src={c.logo}
        alt={`${c.name} logo`}
        loading="lazy"
        draggable="false"
      />
    )
  }

  // Placeholder until a logo is provided
  return (
    <svg
      className="client-logo client-ph"
      viewBox="0 0 170 120"
      role="img"
      aria-label={`${c.name} logo placeholder`}
      focusable="false"
    >
      <rect
        x="25"
        y="10"
        width="120"
        height="100"
        rx="12"
        fill="#f1efe6"
        stroke="#cfcab8"
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      <circle cx="60" cy="42" r="8" fill="#cfcab8" />
      <path
        d="M35 96l30-30 20 18 18-16 32 28z"
        fill="#cfcab8"
      />
    </svg>
  )
}

export default function Clients({ clients = defaultClients }) {
  const track = useRef(null)

  const [edge, setEdge] = useState({
    start: true,
    end: false
  })

  const step = () => {
    const t = track.current
    const c = t?.firstElementChild

    return c
      ? c.getBoundingClientRect().width +
          parseFloat(getComputedStyle(t).columnGap || 0)
      : 0
  }

  const update = useCallback(() => {
    const t = track.current
    if (!t) return

    setEdge({
      start: t.scrollLeft < 4,
      end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
    })
  }, [])

  const go = useCallback((dir) => {
    const t = track.current
    if (!t) return

    const atEnd =
      t.scrollLeft + t.clientWidth >= t.scrollWidth - 4

    const atStart = t.scrollLeft < 4

    if (dir > 0 && atEnd) {
      t.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    } else if (dir < 0 && atStart) {
      t.scrollTo({
        left: t.scrollWidth,
        behavior: 'smooth'
      })
    } else {
      t.scrollBy({
        left: dir * step(),
        behavior: 'smooth'
      })
    }
  }, [])

  if (!clients.length) return null

  return (
    <section className="clients" aria-label="Our Clients">
      <div className="wrap">

        <Heading
          center
          eyebrow="Trusted By"
          title="Our Clients"
        />

        <div className="clients-carousel reveal">

          <button
            type="button"
            className="cc-btn cc-prev"
            aria-label="Previous clients"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={22} />
          </button>

          <ul
            className="clients-track"
            ref={track}
            onScroll={update}
            tabIndex={0}
            aria-label="Client list"
          >
            {clients.map(c => (
              <li className="client-card" key={c.name}>
                <div className="client-logo-box">
                  <ClientLogo c={c} />
                </div>

                <h3 className="client-name">
                  {c.name}
                </h3>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="cc-btn cc-next"
            aria-label="Next clients"
            onClick={() => go(1)}
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  )
}
