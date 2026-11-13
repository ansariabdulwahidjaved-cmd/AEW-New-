import { Star } from 'lucide-react'
import { reviews as defaultReviews } from '../data/reviews'
import { Heading } from './ui'

const colors = ['#482D78', '#579B45', '#A52F38', '#D58A30', '#3978B5', '#A51F70']

export default function Reviews({ reviews = defaultReviews }) {
  if (!reviews.length) return null

  return (
    <section className="reviews" aria-label="Customer Reviews">
      <div className="wrap">
        <Heading
          center
          eyebrow="Testimonials"
          title="Customer Reviews"
          text="What our customers say about working with AEW."
        />

        <div className="grid">
          {reviews.map((r, i) => (
            <figure
              key={r.name}
              className="card lift reveal review"
              style={{ '--c': colors[i % colors.length] }}
            >
              <div className="stars" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map(n => (
                  <Star
                    key={n}
                    size={18}
                    className={n <= r.rating ? 'on' : 'off'}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote>“{r.text}”</blockquote>

              <figcaption>
                <span className="avatar" aria-hidden="true">
                  {r.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
