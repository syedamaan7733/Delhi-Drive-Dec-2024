import React, { useContext } from 'react';
import FormContext from './context/FormContext';

const TextInput = ({ name, label, type = 'text', placeholder, validations, error }) => {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: name,
      value,
      error: null,
    });
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={state.values[name] || ''}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px',
          borderColor: error ? 'red' : '#ccc',
        }}
      />
      {error && <div style={{ color: 'red', fontSize: '0.8em' }}>{error}</div>}
    </div>
  );
};

export default TextInput;
