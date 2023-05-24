import React, { Fragment } from 'react'
import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

export default function EventDetailPage (props) {
  const { event } = props
  console.log(event);
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.eid} />
    </Fragment>
  )
}

export async function getStaticProps (context) {
  const { params } = context
  const eventId = params.eventId

  const getEvent = await getEventById(eventId)

  return {
    props: {
      event: getEvent,
    },
    revalidate:60,
  }
}

export async function getStaticPaths () {
  const events = await getFeaturedEvents()
  const eids = events.map(event => event.eid)
  const pathsWithParams = eids.map((id) => ({ params: { eventId: id } }));
  return {
    paths: pathsWithParams,
    fallback: 'blocking', //和true效果一样，会阻塞进程，新页面渲染完成后再放行
  }
}
