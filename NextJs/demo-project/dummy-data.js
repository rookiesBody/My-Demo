const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: '张三的幸福生活',
    description: '张三每天都很幸福开心, 直到有一天他遇到了他的好基友李四...',
    location: '北京一环天安门城墙内',
    date: '2021-05-15',
    image: 'images/coding-event1.jpg',
    isFeatured: true,
  },
  {
    id: 'e2',
    title: '张三自传',
    description: '张三的自我介绍...',
    location: '北京一环天安门城墙内',
    date: '2021-05-22',
    image: 'images/coding-event2.jpg',
    isFeatured: false,
  },
  {
    id: 'e3',
    title: '李四的旅游日记',
    description: '李四游历世界的介绍，其中叙述了他在祖国每个地方留下足迹的记录...',
    location: '冰岛',
    date: '2022-11-15',
    image: 'images/coding-event3.jpg',
    isFeatured: true,
  },
]

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter(event => event.isFeatured)
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dataFilter) {
  const { year, month } = dataFilter

  let filteredEvents = DUMMY_EVENTS.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === year && eventDate.getMonth() === month -1
  })

  return filteredEvents
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}