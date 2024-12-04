import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { CustomTable } from "./Components/Advanced Table/CustomTable";
import CustomForm from "./Components/Input Form/CustomForm";
import { DateContainer } from "./Components/DatePicker/DateContainer";
function App() {
  return (
    <>
      {/* Assignment 1 */}
      <h1 class="bg-gradient-to-r from-slate-500 to-slate-800 inline-block text-3xl  text-transparent bg-clip-text underline font-bold">
        Assignment - I
      </h1>
      <CustomTable />

      <CustomForm />

      {/* Assignment 3*/}
      <DateContainer />
    </>
  );
}

export default App;
