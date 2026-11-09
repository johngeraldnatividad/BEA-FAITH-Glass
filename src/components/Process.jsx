import { steps } from '../data/content'

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <h2>From measurement to installation</h2>
        <div className="grid steps">
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
