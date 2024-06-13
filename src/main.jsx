import React from "react";
import ReactDOM from "react-dom/client";
import Calendar from "./components/Calendar.jsx";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);
