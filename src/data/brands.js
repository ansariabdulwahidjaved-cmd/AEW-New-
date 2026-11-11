// Brands shown in the scrolling rows under the hero. Add / remove / reorder freely.
// They are split into rows of 6 (see perRow in BrandsMarquee). Row 1 scrolls right→left, row 2 left→right, row 3 right→left …
//
// LOGO – three ways, checked in this order:
//   1. logo:'/brands/dell.svg'  → your image file (put it in /public/brands/). Recommended: official logo, SVG or transparent PNG.
//   2. parts:[…]                → drawn coloured wordmark (no longer used by default)
//   3. neither                  → grey "logo placeholder" box, so the card keeps its size until you add the logo.
// Wordmark tuning: parts = text pieces with colours, size / spacing / weight / italic = font look.
export const brands=[
  // Row 1 – placeholders (swap in real logos with logo:'/brands/<file>')
  {name:'CP Plus', logo: '/brands/cpplus_logo.png'},
  {name:'Digisol', logo: '/brands/digisol_logo.png'},
  {name:'D-Link', logo: '/brands/dlink_logo.png'},
  {name:'TP-Link', logo: '/brands/tplink_logo.png'},
  {name:'DVM', logo: '/brands/dvm_logo.png'},
  {name:'PRAMA', logo: '/brands/prama_logo.png'},
  // Row 2 – placeholders. Example: {name:'Essl',logo:'/brands/essl.png'}
  {name:'Essl', logo: '/brands/essl_logo.png'},
  {name:'BioMax'},
  {name:'Polycab', logo: '/brands/polycab_logo.png'},
  {name:'Crystal'},
  {name:'Panasonic', logo: '/brands/panasonic_logo.png'},
  {name:'NEC'},
  // Row 3
  {name:'Dell', logo: '/brands/dell_logo.png'},
  {name:'HP', logo: '/brands/hp_logo.png'},
  {name:'Honeywell', logo: '/brands/honeywell_logo.png'},
  {name:'Ravel'},
]
