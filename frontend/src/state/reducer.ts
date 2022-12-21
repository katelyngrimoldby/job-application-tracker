import { State } from './state';
import { Job } from '../types';

export type Action = {
  type: 'SET_JOB_LIST';
  payload: Job[];
};

export const setJobList = (payload: Job[]): Action => {
  return { type: 'SET_JOB_LIST', payload: payload };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_JOB_LIST':
      return {
        ...state,
        jobs: {
          ...action.payload.reduce(
            (memo, job) => ({ ...memo, [job.id]: job }),
            {}
          ),
          ...state.jobs,
        },
      };
  }
};
