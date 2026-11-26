import { testimonials } from '@/lib/site-data'

export function Testimonials() {
  const approvedTestimonials = testimonials.filter(
    testimonial => testimonial.consent && testimonial.quote.trim().length > 0,
  )

  if (approvedTestimonials.length === 0) return null

  return (
    <section className="testimonial dark-section" aria-labelledby="testimonials-heading">
      <div className="section-kicker">[ CLIENT EXPERIENCES ]</div>
      <h2 id="testimonials-heading">What clients say</h2>
      {approvedTestimonials.map(testimonial => (
        <figure key={`${testimonial.business}-${testimonial.name}`}>
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>
            <cite>{testimonial.name}</cite>
            <span>{testimonial.role}</span>
            <span>{testimonial.business}</span>
            {testimonial.outcome && <span>{testimonial.outcome}</span>}
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
