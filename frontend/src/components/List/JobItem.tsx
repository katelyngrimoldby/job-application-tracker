import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDateCalc from '../../hooks/useDateCalc';
import { Job } from '../../types';
import ArrowIcon from '../icons/ArrowIcon';

const ListJobItem = ({ job }: { job: Job }) => {
  const [visible, setVisible] = useState(false);
  const dateDiff = useDateCalc(job.applyDate);

  return (
    <li>
      <div>
        <span>{job.positionTitle}</span>
        <span>{job.company}</span>
        <span>{job.status}</span>
        <button onClick={() => setVisible(!visible)}>
          <ArrowIcon />
        </button>
      </div>
      <div>
        <span>{dateDiff ? `${dateDiff[0]} ${dateDiff[1]} ago` : 'today'}</span>
        <Link to={`/jobs/${job.id}`}>View Application</Link>
      </div>
    </li>
  );
};

export default ListJobItem;
