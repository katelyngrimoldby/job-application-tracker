import { State } from './state';
import {
  Application,
  Interview,
  User,
  ApplicationFile,
  InterviewFile,
} from '../types';

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
      type: 'SET_APPLICATIONFILE_LIST';
      payload: ApplicationFile[];
    }
  | {
      type: 'ADD_APPLICATIONFILE';
      payload: ApplicationFile;
    }
  | {
      type: 'UPDATE_APPLICATIONFILE';
      payload: ApplicationFile;
    }
  | {
      type: 'REMOVE_APPLICATIONFILE';
      payload: number;
    }
  | {
      type: 'SET_INTERVIEWFILE_LIST';
      payload: InterviewFile[];
    }
  | {
      type: 'ADD_INTERVIEWFILE';
      payload: InterviewFile;
    }
  | {
      type: 'UPDATE_INTERVIEWFILE';
      payload: InterviewFile;
    }
  | {
      type: 'REMOVE_INTERVIEWFILE';
      payload: number;
    }
  | {
      type: 'SET_CURRENT_USER';
      payload: User;
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

export const setApplicationFileList = (payload: ApplicationFile[]): Action => {
  return { type: 'SET_APPLICATIONFILE_LIST', payload: payload };
};

export const addApplicationFile = (payload: ApplicationFile): Action => {
  return { type: 'ADD_APPLICATIONFILE', payload: payload };
};

export const updateApplicationFile = (payload: ApplicationFile): Action => {
  return { type: 'UPDATE_APPLICATIONFILE', payload: payload };
};

export const removeApplicationFile = (id: number): Action => {
  return { type: 'REMOVE_APPLICATIONFILE', payload: id };
};

export const setInterviewFileList = (payload: InterviewFile[]): Action => {
  return { type: 'SET_INTERVIEWFILE_LIST', payload: payload };
};

export const addInterviewFile = (payload: InterviewFile): Action => {
  return { type: 'ADD_INTERVIEWFILE', payload: payload };
};

export const updateInterviewFile = (payload: InterviewFile): Action => {
  return { type: 'UPDATE_INTERVIEWFILE', payload: payload };
};

export const removeInterviewFile = (id: number): Action => {
  return { type: 'REMOVE_INTERVIEWFILE', payload: id };
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
    case 'SET_APPLICATIONFILE_LIST':
      return {
        ...state,
        applicationFiles: action.payload,
      };
    case 'ADD_APPLICATIONFILE':
      return {
        ...state,
        applicationFiles: [action.payload, ...state.applicationFiles],
      };
    case 'UPDATE_APPLICATIONFILE':
      return {
        ...state,
        applicationFiles: [
          ...state.applicationFiles.map((applicationFile) =>
            applicationFile.id !== action.payload.id
              ? applicationFile
              : action.payload
          ),
        ],
      };
    case 'REMOVE_APPLICATIONFILE':
      return {
        ...state,
        applicationFiles: [
          ...state.applicationFiles.filter(
            (applicationFile) => applicationFile.id !== action.payload
          ),
        ],
      };
    case 'SET_INTERVIEWFILE_LIST':
      return {
        ...state,
        interviewFiles: action.payload,
      };
    case 'ADD_INTERVIEWFILE':
      return {
        ...state,
        interviewFiles: [action.payload, ...state.interviewFiles],
      };
    case 'UPDATE_INTERVIEWFILE':
      return {
        ...state,
        interviewFiles: [
          ...state.interviewFiles.map((interviewFile) =>
            interviewFile.id !== action.payload.id
              ? interviewFile
              : action.payload
          ),
        ],
      };
    case 'REMOVE_INTERVIEWFILE':
      return {
        ...state,
        interviewFiles: [
          ...state.interviewFiles.filter(
            (interviewFile) => interviewFile.id !== action.payload
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
