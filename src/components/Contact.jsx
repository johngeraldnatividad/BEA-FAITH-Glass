import { business } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="cta">
      <div className="container cta-inner">
        <div>
          <h2>Ready to start your project?</h2>
          <p>Call or message us for a free site visit and quotation.</p>
          <div className="contact-details">
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`} target="_blank" rel="noopener noreferrer">
              {business.address}
            </a>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              Bea Faith on Facebook
            </a>
          </div>
        </div>
        <div className="btn-row">
          <a href={business.phoneHref} className="btn btn-dark">Call {business.phone}</a>
          <a href={business.facebook} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">
            Message on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}