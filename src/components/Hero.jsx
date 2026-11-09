import { screenDoorPhotos } from '../data/content'
import ZoomableImage from './ZoomableImage'

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Glass · Aluminum · Steel Works</span>
            <h1>Built strong. Finished clean. Made to last.</h1>
            <p>
              Custom glass, aluminum and steel fabrication for homes, shops and commercial
              buildings, measured, made and installed by one dependable team.
            </p>
            <div className="btn-row">
              <a href="#contact" className="btn btn-blue">Request a quote</a>
              <a href="#projects" className="btn btn-outline">View our work</a>
            </div>
          </div>
          <div className="hero-photo photo-placeholder">
            <ZoomableImage src={screenDoorPhotos[15]} alt="Custom screen door by Bea Faith" priority />
          </div>
        </div>
      </section>
    </>
  )
}