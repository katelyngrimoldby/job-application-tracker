import { State } from './state';
import { Application, Interview, User } from '../types';

export type Action =
  | {
      type: 'SET_APPLICATION_LIST';
      payload: Application[];
    }
  | {
      type: 'ADD_APPLICATION';
      payload: Application;
    }
  | {
      type: 'UPDATE_APPLICATION';
      payload: Application;
    }
  | {
      type: 'REMOVE_APPLICATION';
      payload: number;
    }
  | {
      type: 'SET_CURRENT_USER';
      payload: User;
    }
  | {
      type: 'SET_INTERVIEW_LIST';
      payload: Interview[];
    }
  | {
      type: 'ADD_INTERVIEW';
      payload: Interview;
    }
  | {
      type: 'UPDATE_INTERVIEW';
      payload: Interview;
    }
  | {
      type: 'REMOVE_INTERVIEW';
      payload: number;
    }
  | {
      type: 'CLEAR_CURRENT_USER';
      payload: null;
    }
  | {
      type: 'UPDATE_THEME';
      payload: null;
    };

export const setApplicationList = (payload: Application[]): Action => {
  return { type: 'SET_APPLICATION_LIST', payload: payload };
};

export const addApplication = (payload: Application): Action => {
  return { type: 'ADD_APPLICATION', payload: payload };
};

export const updateApplication = (payload: Application): Action => {
  return { type: 'UPDATE_APPLICATION', payload: payload };
};

export const removeApplication = (id: number): Action => {
  return { type: 'REMOVE_APPLICATION', payload: id };
};

export const setInterviewList = (payload: Interview[]): Action => {
  return { type: 'SET_INTERVIEW_LIST', payload: payload };
};

export const addInterview = (payload: Interview): Action => {
  return { type: 'ADD_INTERVIEW', payload: payload };
};

export const updateInterview = (payload: Interview): Action => {
  return { type: 'UPDATE_INTERVIEW', payload: payload };
};

export const removeInterview = (id: number): Action => {
  return { type: 'REMOVE_INTERVIEW', payload: id };
};

export const setCurrentUser = (payload: User): Action => {
  return { type: 'SET_CURRENT_USER', payload: payload };
};

export const clearCurrentUser = (): Action => {
  return { type: 'CLEAR_CURRENT_USER', payload: null };
};

export const updateTheme = (): Action => {
  return { type: 'UPDATE_THEME', payload: null };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_APPLICATION_LIST':
      return {
        ...state,
        applications: action.payload,
      };
    case 'ADD_APPLICATION':
      return {
        ...state,
        applications: [action.payload, ...state.applications],
      };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: [
          ...state.applications.map((application) =>
            application.id !== action.payload.id ? application : action.payload
          ),
        ],
      };
    case 'REMOVE_APPLICATION':
      return {
        ...state,
        applications: [
          ...state.applications.filter(
            (application) => application.id !== action.payload
          ),
        ],
      };
    case 'SET_INTERVIEW_LIST':
      return {
        ...state,
        interviews: action.payload,
      };
    case 'ADD_INTERVIEW':
      return {
        ...state,
        interviews: [action.payload, ...state.interviews],
      };
    case 'UPDATE_INTERVIEW':
      return {
        ...state,
        interviews: [
          ...state.interviews.map((interviews) =>
            interviews.id !== action.payload.id ? interviews : action.payload
          ),
        ],
      };
    case 'REMOVE_INTERVIEW':
      return {
        ...state,
        interviews: [
          ...state.interviews.filter(
            (interview) => interview.id !== action.payload
          ),
        ],
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
    case 'UPDATE_THEME':
      return { ...state, theme: state.theme == 'dark' ? 'light' : 'dark' };
    default:
      return state;
  }
};
