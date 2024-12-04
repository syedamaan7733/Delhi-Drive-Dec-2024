import React from "react";
import { FormProvider } from "./context/FormContext";
import { FormContainer } from "./FormContainer";

const CustomForm = () => {
  const contactFormConfig = [
    {
      name: "fullName",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your name",
      validations: { required: true, minLength: 2 },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      validations: {
        required: true,
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
      },
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Enter your message",
      validations: { required: true, minLength: 10 },
    },
    {
      name: "department",
      type: "select",
      label: "Department",
      options: [
        { value: "sales", label: "Sales" },
        { value: "support", label: "Support" },
      ],
      validations: { required: true },
    },
  ];

  const initialState = {
    values: {},
    errors: {},
  };

  const handleFormSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  return (
    <FormProvider initialState={initialState}>
      <div className="border-2 my-28 p-4">
        <h1 class="py-12 bg-gradient-to-r from-slate-500 to-slate-800 inline-block text-3xl  text-transparent bg-clip-text underline font-bold">
          Assignment - II
        </h1>
        <h1>Contact Us</h1>
        <FormContainer config={contactFormConfig} onSubmit={handleFormSubmit} />
      </div>
    </FormProvider>
  );
};

export default CustomForm;
