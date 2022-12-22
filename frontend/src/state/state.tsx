import { createContext, useContext, useReducer } from 'react';
import { Action } from './reducer';
import { Job, User } from '../types';

export type State = {
  jobs: { [id: string]: Job };
  user: User | null;
};

const initialState: State = {
  jobs: {},
  user: null,
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
