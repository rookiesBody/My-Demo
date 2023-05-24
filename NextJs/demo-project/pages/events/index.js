import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../helpers/api-util';
import EventsSearch from '../../components/events/events-search';

export default function Events(props) {
  const router = useRouter()
  const {events} = props
  console.log(events);

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const getEvents = await getAllEvents()

  return {
    props: {
      events: getEvents,
    },
    revalidate:180,
  }
}
