export async function getAllEvents () {
  const res = await fetch('http://localhost:3001/events/find')
  const data = await res.json()
  if (data.status === 1) return data.data.map(event => {
    if (event.isFeatured === '1') return {
      ...event,
      isFeatured: true,
    }
    return {
      ...event,
      isFeatured: false,
    }
  })
  else return []
}

export async function getFeaturedEvents () {
  const data = await getAllEvents()
  return data.filter(event => event.isFeatured)
}

export async function getEventById (id) {
  const data = await getAllEvents()
  return data.find((event) => event.eid === id) || null;
}

export async function getFilteredEvents (dataFilter) {
  const { year, month } = dataFilter
  const data = await getAllEvents()

  let filteredEvents = data.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
  })

  return filteredEvents
}