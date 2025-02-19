import { createContext, useContext, useReducer } from 'react';
import { Action } from './reducer';
import {
  Application,
  Interview,
  User,
  ApplicationFile,
  InterviewFile,
} from '../types';

export type State = {
  applications: Application[];
  interviews: Interview[];
  applicationFiles: ApplicationFile[];
  interviewFiles: InterviewFile[];
  user: User | null;
  theme: 'light' | 'dark';
};

const initialState: State = {
  applications: [],
  interviews: [],
  applicationFiles: [],
  interviewFiles: [],
  user: null,
  theme: window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light',
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
