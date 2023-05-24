import EventItem from './event-item';
import styles from './event-list.module.css';

function EventList (props) {
  const { items } = props

  return (
    <ul className={styles.list}>
      {
        items.map(event => <EventItem key={event.id || event.eid} event={event} />)
      }
    </ul>
  )
}

export default EventList;