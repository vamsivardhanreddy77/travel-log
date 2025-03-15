import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogList from "./components/LogList";
import AddLog from "./components/AddLog";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">🌍 Travel Log</h1>
        <Routes>
          <Route path="/" element={<LogList />} />
          <Route path="/add-log" element={<AddLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
