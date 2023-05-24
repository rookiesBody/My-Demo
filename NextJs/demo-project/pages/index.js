import React, { useEffect } from 'react'
import Head from 'next/head'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage(props) {
  const { events } = props

  return (
    <div>
      <Head>
        <title>测试demo</title>
        <meta name='demo' content='aaaaaabbbbccc' />
      </Head>
      <NewsletterRegistration />
      <EventList items={events}  />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate:1800,
  }
}
