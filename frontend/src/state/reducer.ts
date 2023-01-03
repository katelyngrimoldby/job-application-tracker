import { State } from './state';
import { Job, User } from '../types';

export type Action =
  | {
      type: 'SET_JOB_LIST';
      payload: Job[];
    }
  | {
      type: 'ADD_JOB';
      payload: Job;
    }
  | {
      type: 'UPDATE_JOB';
      payload: Job;
    }
  | {
      type: 'REMOVE_JOB';
      payload: number;
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

export const addJob = (payload: Job): Action => {
  return { type: 'ADD_JOB', payload: payload };
};

export const updateJob = (payload: Job): Action => {
  return { type: 'UPDATE_JOB', payload: payload };
};

export const removeJob = (id: number): Action => {
  return { type: 'REMOVE_JOB', payload: id };
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
        jobs: action.payload,
      };
    case 'ADD_JOB':
      return {
        ...state,
        jobs: [action.payload, ...state.jobs],
      };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: [
          ...state.jobs.map((job) =>
            job.id !== action.payload.id ? job : action.payload
          ),
        ],
      };
    case 'REMOVE_JOB':
      return {
        ...state,
        jobs: [...state.jobs.filter((job) => job.id !== action.payload)],
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
