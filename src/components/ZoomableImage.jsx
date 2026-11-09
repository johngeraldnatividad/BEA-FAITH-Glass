export default function ZoomableImage({ src, alt, className = '', caption, priority = false }) {
  return (
    <div className={`zoomable-photo ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {caption && <span className="tile-label">{caption}</span>}
    </div>
  )
}