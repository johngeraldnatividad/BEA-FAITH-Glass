const projectImageFiles = import.meta.glob('/images/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const sortedProjectFiles = Object.entries(projectImageFiles)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))

let nextProjectIndex = 0

export const projectGroups = Object.entries(
  sortedProjectFiles.reduce((groups, [path, image]) => {
    const folder = path.split('/')[2]
    groups[folder] ??= []
    groups[folder].push(image)
    return groups
  }, {}),
).map(([folder, images]) => {
  const title = ({
    cabinet: 'Cabinet',
    canopy: 'Canopy',
    screendoor: 'Screen Door',
    slidingdoor: 'Sliding Door',
    slidingwindow: 'Sliding Window',
  })[folder] || folder.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

  return {
    folder,
    title,
    projects: images.map(image => ({
      image,
      label: title,
      alt: `${title} work by Bea Faith`,
      index: nextProjectIndex++,
    })),
  }
})

export const projects = projectGroups.flatMap(group => group.projects)
export const screenDoorPhotos = projectGroups.find(group => group.folder === 'screendoor')?.projects.map(project => project.image) || []
export const slidingDoorPhotos = projectGroups.find(group => group.folder === 'slidingdoor')?.projects.map(project => project.image) || []
export const canopyPhotos = projectGroups.find(group => group.folder === 'canopy')?.projects.map(project => project.image) || []

export const business = {
  name: 'Bea Faith',
  fullName: 'BEA FAITH Glass Aluminum & Steel Works Fabrication',
  phone: '0991 848 9034',
  phoneHref: 'tel:+639918489034',
  facebook: 'https://www.facebook.com/profile.php?id=61567011511302',
  address: 'Tahanang Yaman Road, Brgy. Buenavista 2, General Trias, Philippines, 4107',
  email: 'Vbaccolcuenza@gmail.com',
  reviews: 3,
}

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'How we work' },
  { href: '#contact', label: 'Contact' },
]


export const offers = [
  'Screen Doors',
  'Window Screen',
  'Sliding Window',
  'Sliding Door',
  'Wall Mirror',
  'Shower Enclosure',
  'Aluminum Cabinet',
  'Gate Grills',
  'Kitchen Cabinet',
]

export const services = [
  { id: 'glass', title: 'Glass', cls: 'glass', photo: screenDoorPhotos[19],
    text: 'Windows, doors, partitions, shower enclosures, mirrors, railings and storefronts cut to size.' },
  { id: 'aluminum', title: 'Aluminum', cls: 'alum', photo: slidingDoorPhotos[2],
    text: 'Sliding and swing windows, doors, cabinets, canopies, facades and frames, light yet durable.' },
  { id: 'steel', title: 'Steel works', cls: 'steel', photo: canopyPhotos[3],
    text: 'Gates, grills, fences, stairs, trusses, roofing frames and strctural steel, welded and finished.' },
]

export const steps = [
  { title: 'Tell us what you need', text: 'Send your plan, photos or idea by call, message or the contact.' },
  { title: 'Site visit and quote', text: 'We measure on site and send a clear, itemized quotation.' },
  { title: 'Fabrication', text: 'Your order is cut, welded and assembled in our workshop.' },
  { title: 'Installation', text: 'Our team installs, checks and cleans up before we hand over.' },
]