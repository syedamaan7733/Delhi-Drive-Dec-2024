import React, { useContext } from "react";
import FormContext from "./context/FormContext";

const Select = ({ name, label, options, multiple, error }) => {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (value) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value,
      error: null,
    });
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        multiple={multiple}
        value={state.values[name] || (multiple ? [] : "")}
        onChange={(e) => {
          const selectedValue = multiple
            ? Array.from(e.target.selectedOptions).map((opt) => opt.value)
            : e.target.value;
          handleChange(selectedValue);
        }}
        style={{
          width: "100%",
          padding: "8px",
          borderColor: error ? "red" : "#ccc",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div style={{ color: "red", fontSize: "0.8em" }}>{error}</div>}
    </div>
  );
};

export default Select;
