import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMount } from 'ahooks';
import EventList from '../../components/events/event-list'
import { getFilteredEvents, getAllEvents } from '../../helpers/api-util'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

export default function FilteredEventsPage (props) {
  const router = useRouter()
  const [events, setEvents] = useState()

  // const { data, error } = useSWR('http://localhost:3001/events/find', fetch)

  // useEffect(() => {
  //   if (data) {
  //     setEvents(data)
  //   }
  // }, [data])
  useMount(async () => {
    const data = await getAllEvents()
    setEvents(data)
  })

  const eventSlugList = router.query.slug
  if (!events || !eventSlugList) {
    return <p className='center'>Loding...</p>
  }

  const numYear = +eventSlugList[0]
  const numMonth = +eventSlugList[1]

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>搜索无效，请重新搜索...</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>返回</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>未找到当前时间段的内容，请重新搜索...</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>返回</Button>
        </div>
      </Fragment>
    )
  }

  const getDate = new Date(numYear, numMonth - 1)

  return (
    <Fragment>
      <ResultsTitle date={getDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

// export async function getServerSideProps (context) {
//   const { params } = context
//   const filterData = params.slug

//   const numYear = +filterData[0]
//   const numMonth = +filterData[1]

//   if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//     }
//   }

//   const eventsList = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: eventsList,
//       hasError: false,
//       date: {
//         year: numYear,
//         month: numMonth,
//       }
//     }
//   }
// }
