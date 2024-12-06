import { useState } from 'react';
import ArrowIcon from './icons/ArrowIcon';
import styles from '../styles/components/Dropdown.module.css';

const Dropdown = ({
  values,
  startValue,
  handleChange,
  labelledBy,
}: {
  values: { label: string; value: string }[];
  startValue?: { label: string; value: string };
  handleChange: (value: string) => void;
  labelledBy?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(
    startValue ? startValue.label : values[0].label
  );

  const handleSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(event.currentTarget.innerText);
    handleChange(event.currentTarget.id);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.selectHead}
        aria-label='Select Status'
        type='button'
      >
        {selected}
        <ArrowIcon />
      </button>
      <ul
        className={open ? styles.optionsOpen : styles.options}
        role='listbox'
        aria-labelledby={labelledBy}
      >
        {values.map((e) => (
          <li role='option'>
            <button
              key={e.value}
              id={e.value}
              onClick={handleSelection}
              className={
                e.label === selected ? styles.activeOption : styles.option
              }
              type='button'
              data-testid={e.value}
            >
              {e.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
