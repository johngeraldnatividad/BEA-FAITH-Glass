import { services } from '../data/content'
import ZoomableImage from './ZoomableImage'

export default function Services() {
  return (
    <section id="services" className="section container">
      <span className="eyebrow dark">What we make</span>
      <h2>Three trades, one workshop</h2>
      <div className="grid cards">
        {services.map(s => (
          <article className="card" key={s.id}>
            <div className={`card-photo photo-placeholder ${s.cls}`}>
              <ZoomableImage src={s.photo} alt={`${s.title} work by Bea Faith`} />
            </div>
            <div className="card-body">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#contact" className="link">Ask about {s.title.toLowerCase()} →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
