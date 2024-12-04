import React, { createContext, useReducer } from 'react';

// Form reducer for managing state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: action.error },
      };
    case 'RESET_FORM':
      return action.initialState;
    default:
      return state;
  }
};

const FormContext = createContext();

export const FormProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
