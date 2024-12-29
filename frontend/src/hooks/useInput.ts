import { useState } from 'react';

const useInput = (type: string, initValue = '') => {
  const [value, setValue] = useState(initValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

export default useInput;
