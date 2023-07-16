import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

const initialState = {
  workouts: null,
};

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      };

    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts], // adding new one to the top
      };

    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
