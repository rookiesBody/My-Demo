import Image from 'next/image';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import styles from './event-item.module.css';

function EventItem (props) {
  const { event } = props

  const humanReadableDate = new Date(event.date).toLocaleDateString('zh', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const exploreLink = `/events/${event.id || event.eid}`

  return (
    <li className={styles.item}>
      <Image src={'/' + event.image} alt={event.title} width={250} height={160} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{event.title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{event.location}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>查看详情</span>
            <span className={styles.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem;