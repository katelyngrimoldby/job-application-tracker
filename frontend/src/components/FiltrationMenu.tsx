import { useState } from 'react';
import ArrowIcon from './icons/ArrowIcon';
import styles from '../styles/components/FiltrationMenu.module.css';

const sort = [
  { value: 'company-asc', label: 'Company Name (asc.)' },
  { value: 'company-desc', label: 'Company Name (desc.)' },
  { value: 'position-asc', label: 'Position Title (asc.)' },
  { value: 'position-desc', label: 'Position Title (desc.)' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];
const filter = [
  'applied',
  'assessments',
  'interviewing',
  'offered',
  'rejected',
];

const FiltrationMenu = (
  {
    handleChange,
  }: {
    handleChange: (name: string, value: string) => void;
  },
  toFilter: boolean
) => {
  const [visible, setVisible] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.name, event.target.value);
  };

  return (
    <aside className={visible ? styles.sidebarVisible : styles.sidebar}>
      <button
        onClick={() => setVisible(!visible)}
        className={visible ? styles.buttonVisible : styles.button}
        aria-label={visible ? 'Close sidebar' : 'Open sidebar'}
      >
        <ArrowIcon />
      </button>
      <div className={styles.content}>
        {toFilter ? (
          <fieldset>
            <legend>Filter</legend>
            <div>
              <input
                type='radio'
                name='filter'
                id='none'
                value=''
                onChange={onChange}
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
                  onChange={onChange}
                />
                <label htmlFor={e}>{e}</label>
              </div>
            ))}
          </fieldset>
        ) : null}
        <fieldset>
          <legend>Sort</legend>
          {sort.map((e) => (
            <div key={e.value}>
              <input
                type='radio'
                name='sort'
                id={e.value}
                value={e.value}
                onChange={onChange}
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
