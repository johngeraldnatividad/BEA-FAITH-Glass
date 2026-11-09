import { business } from '../data/content'

// Shown on phones only (see .float-contact in styles.css)
export default function FloatingContact() {
  return (
    <div className="float-contact">
      <a href={business.phoneHref} className="float-call">Call now</a>
      <a href={business.facebook} className="float-msg" target="_blank" rel="noopener noreferrer">Message us</a>
    </div>
  )
}