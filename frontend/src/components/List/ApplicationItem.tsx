import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateCalc from '../../hooks/useDateCalc';
import { Application } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';

const ListApplicationItem = ({ application }: { application: Application }) => {
  const [visible, setVisible] = useState(false);
  const dateDiff = useDateCalc(application.applyDate);

  return (
    <li>
      <div>
        <span>{application.positionTitle}</span>
        <span>{application.company}</span>
        <span>{application.status}</span>
        <button onClick={() => setVisible(!visible)}>
          <ArrowIcon />
        </button>
      </div>
      <div>
        <span>{dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'today'}</span>
        <Link to={`/applications/${application.id}`}>View Application</Link>
      </div>
    </li>
  );
};

export default ListApplicationItem;
