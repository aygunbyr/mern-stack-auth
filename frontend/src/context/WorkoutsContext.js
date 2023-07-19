import { createContext, useReducer } from 'react';

const initialState = {
  workouts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { ...state, workouts: action.payload };

    case 'CREATE_WORKOUT':
      return {
        ...state,
        workouts: [action.payload, ...state.workouts], // adding new one to the top
      };

    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
