import React, { useContext, useCallback } from "react";
import FormContext from "./context/FormContext";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Select from "./Select";

const validate = {
  required: (value) => value !== undefined && value !== null && value !== "",
  minLength: (value, min) => value.length >= min,
  pattern: (value, regex) => new RegExp(regex).test(value),
};

export const FormContainer = ({ config, onSubmit }) => {
  const { state, dispatch } = useContext(FormContext);

  const validateField = useCallback(
    (name) => {
      const field = config.find((f) => f.name === name);
      if (!field) return null;

      const value = state.values[name];
      let error = null;

      if (field.validations) {
        Object.entries(field.validations).forEach(([rule, ruleValue]) => {
          let isValid = false;
          switch (rule) {
            case "required":
              isValid = validate.required(value);
              error = !isValid ? "This field is required" : error;
              break;
            case "minLength":
              isValid = validate.minLength(value, ruleValue);
              error = !isValid ? `Minimum length is ${ruleValue}` : error;
              break;
            case "pattern":
              isValid = validate.pattern(value, ruleValue);
              error = !isValid ? "Invalid format" : error;
              break;
          }
        });
      }

      dispatch({
        type: "UPDATE_FIELD",
        field: name,
        value: state.values[name],
        error,
      });

      return error;
    },
    [config, state.values, dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    let isValid = true;

    config.forEach((field) => {
      const fieldError = validateField(field.name);
      if (fieldError) {
        errors[field.name] = fieldError;
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit(state.values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {config.map((field) => {
        switch (field.type) {
          case "text":
          case "email":
            return (
              <TextInput
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                validations={field.validations}
                error={state.errors[field.name]}
              />
            );
          case "textarea":
            return (
              <TextArea
                key={field.name}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                error={state.errors[field.name]}
              />
            );
          case "select":
            return (
              <Select
                key={field.name}
                name={field.name}
                label={field.label}
                options={field.options}
                multiple={field.multiple}
                error={state.errors[field.name]}
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};
