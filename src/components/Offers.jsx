import { offers } from '../data/content'

export default function Offers() {
  // list is repeated twice so the marquee loops without a gap
  const loop = [...offers, ...offers]
  return (
    <section className="offers" aria-label="What we offer">
      <div className="offers-track">
        {loop.map((item, i) => (
          <span className="offer-chip" key={`${item}-${i}`} aria-hidden={i >= offers.length}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}