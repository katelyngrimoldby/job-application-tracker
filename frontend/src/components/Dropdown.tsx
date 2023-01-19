import { useState } from 'react';
import ArrowIcon from './icons/ArrowIcon';
import styles from '../styles/components/Dropdown.module.css';

const Dropdown = ({
  values,
  id,
  startValue,
  handleChange,
}: {
  values: { label: string; value: string }[];
  id: string;
  startValue?: { label: string; value: string };
  handleChange: (value: string) => void;
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
        id={id}
        onClick={() => setOpen(!open)}
        className={styles.selectHead}
        aria-label={'Select Status'}
        type='button'
      >
        {selected}
        <ArrowIcon />
      </button>
      <div className={open ? styles.optionsOpen : styles.options}>
        {values.map((e) => (
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
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
