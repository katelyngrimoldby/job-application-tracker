import { State } from './state';
import { Job, User } from '../types';

export type Action =
  | {
      type: 'SET_JOB_LIST';
      payload: Job[];
    }
  | {
      type: 'SET_CURRENT_USER';
      payload: User;
    }
  | {
      type: 'CLEAR_CURRENT_USER';
      payload: null;
    };

export const setJobList = (payload: Job[]): Action => {
  return { type: 'SET_JOB_LIST', payload: payload };
};

export const setCurrentUser = (payload: User): Action => {
  return { type: 'SET_CURRENT_USER', payload: payload };
};

export const clearCurrentUser = (): Action => {
  return { type: 'CLEAR_CURRENT_USER', payload: null };
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
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_CURRENT_USER':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
