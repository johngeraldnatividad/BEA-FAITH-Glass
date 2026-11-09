import { useCallback, useEffect, useRef, useState } from 'react'
import { projectGroups, projects } from '../data/content'

const labelOf = project => project.label

function ProjectCategory({ group, page, onPageChange, onSelect }) {
  const pageSize = 4
  const pageCount = Math.ceil(group.projects.length / pageSize)
  const visibleProjects = group.projects.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="project-category">
      <div className="project-category-heading">
        <h3 className="project-category-title">{group.title}</h3>
        {pageCount > 1 && (
          <div className="project-pagination" aria-label={`${group.title} photo pages`}>
            <button type="button" onClick={() => onPageChange(-1)} disabled={page === 0}>
              Previous
            </button>
            <span aria-live="polite">{page + 1} / {pageCount}</span>
            <button type="button" onClick={() => onPageChange(1)} disabled={page === pageCount - 1}>
              Next
            </button>
          </div>
        )}
      </div>
      <div className="grid tiles">
        {visibleProjects.map(project => (
          <button
            key={project.image}
            type="button"
            className="tile project-tile"
            aria-label={`View larger: ${labelOf(project)}`}
            onClick={() => onSelect(project.index)}
          >
            <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
            <span className="tile-label">{labelOf(project)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const [index, setIndex] = useState(null)
  const [categoryPages, setCategoryPages] = useState({})
  const closeButtonRef = useRef(null)
  const touchX = useRef(null)
  const total = projects.length
  const isOpen = index !== null

  const close = useCallback(() => setIndex(null), [])
  const go = useCallback(step => setIndex(i => (i + step + total) % total), [total])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [isOpen, close, go])

  const selected = isOpen ? projects[index] : null

  function onTouchEnd(e) {
    if (touchX.current === null) return
    const delta = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
  }

  return (
    <section id="projects" className="section container">
      <div className="section-head">
        <h2>Recent projects</h2>
      </div>
      {projectGroups.map(group => {
        const page = categoryPages[group.folder] || 0
        const pageCount = Math.ceil(group.projects.length / 4)
        const changePage = step => {
          setCategoryPages(current => ({
            ...current,
            [group.folder]: Math.max(0, Math.min(pageCount - 1, page + step)),
          }))
        }

        return (
          <ProjectCategory
            key={group.folder}
            group={group}
            page={page}
            onPageChange={changePage}
            onSelect={setIndex}
          />
        )
      })}

      {selected && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged image: ${labelOf(selected)}`}
          onClick={close}
          onTouchStart={e => { touchX.current = e.touches[0].clientX }}
          onTouchEnd={onTouchEnd}
        >
          <button
            ref={closeButtonRef}
            className="project-lightbox-close"
            type="button"
            aria-label="Close enlarged image"
            onClick={close}
          >
            ×
          </button>
          <button
            className="project-lightbox-nav prev"
            type="button"
            aria-label="Previous photo"
            onClick={e => { e.stopPropagation(); go(-1) }}
          >
            ‹
          </button>
          <img
            key={selected.image}
            className="project-lightbox-image"
            src={selected.image}
            alt={selected.alt || labelOf(selected)}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="project-lightbox-nav next"
            type="button"
            aria-label="Next photo"
            onClick={e => { e.stopPropagation(); go(1) }}
          >
            ›
          </button>
          <span className="project-lightbox-caption">{labelOf(selected)}</span>
        </div>
      )}
    </section>
  )
}