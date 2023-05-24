import { useRef } from 'react';

import Button from '../ui/button';
import styles from './events-search.module.css';

function EventsSearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);    
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor='month'>Month</label>
          <select id='month' ref={monthInputRef}>
            <option value='1'>一月</option>
            <option value='2'>二月</option>
            <option value='3'>三月</option>
            <option value='4'>四月</option>
            <option value='5'>五月</option>
            <option value='6'>六月</option>
            <option value='7'>七月</option>
            <option value='8'>八月</option>
            <option value='9'>九月</option>
            <option value='10'>十月</option>
            <option value='11'>十一月</option>
            <option value='12'>十二月</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}

export default EventsSearch;