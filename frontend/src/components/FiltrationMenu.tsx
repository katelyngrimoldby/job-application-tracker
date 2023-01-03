import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useStateValue, setJobList } from '../state';
import { getAll } from '../services/jobs';
import { User } from '../types';
import toggleArrow from '../assets/menu-down.svg';
import styles from '../styles/components/FiltrationMenu.module.css';

const sort = [
  { value: 'company-asc', label: 'Company Name (asc.)' },
  { value: 'company-desc', label: 'Company Name (desc.)' },
  { value: 'position-asc', label: 'Position Title (asc.)' },
  { value: 'position-desc', label: 'Position Title (desc.)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];
const filter = ['applied', 'interviewing', 'offered', 'rejected'];

const FiltrationMenu = ({ user }: { user: User }) => {
  const [visible, setVisible] = useState(false);
  const [, dispatch] = useStateValue();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      searchParams.set(event.target.name, event.target.value);
      setSearchParams(searchParams);
    } else {
      if (searchParams.get('filter')) {
        searchParams.delete(event.target.name);
        setSearchParams(searchParams);
      }
    }
    const params = location.search.toString();

    try {
      const jobs = await getAll(user.token, params);
      dispatch(setJobList(jobs));
    } catch (err) {
      if (isAxiosError(err)) {
        console.log(err.response?.data.error);
        //  setError(err.response?.data.error);
        //  setTimeout(() => setError(''), 5000);
      }
    }
  };
  return (
    <aside className={visible ? styles.sidebarVisible : styles.sidebar}>
      <button
        onClick={() => setVisible(!visible)}
        className={visible ? styles.buttonVisible : styles.button}
      >
        <img
          src={toggleArrow}
          alt={visible ? 'Close sidebar' : 'Open sidebar'}
          width='24'
          height='24'
        />
      </button>
      <div className={styles.content}>
        <fieldset>
          <legend>Filter</legend>
          <div>
            <input
              type='radio'
              name='filter'
              id='none'
              value=''
              onChange={handleChange}
            />
            <label htmlFor='none'>No Filter</label>
          </div>
          {filter.map((e) => (
            <div key={e}>
              <input
                type='radio'
                name='filter'
                id={e}
                value={e}
                onChange={handleChange}
              />
              <label htmlFor={e}>{e}</label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Sort</legend>
          {sort.map((e) => (
            <div key={e.value}>
              <input
                type='radio'
                name='sort'
                id={e.value}
                value={e.value}
                onChange={handleChange}
              />
              <label htmlFor={e.value}>{e.label}</label>
            </div>
          ))}
        </fieldset>
      </div>
    </aside>
  );
};

export default FiltrationMenu;
