import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Country from "./components/Country";
import Experience from "./components/Experience";
import axios from "axios";
import "./App.css";

const kbaseURL = "http://127.0.0.1:5000"; // Your backend API URL

// App Component: Handles routing and the global app structure
const App = () => {
  const [taskData, setTaskData] = useState([]);

  // Fetch all tasks on app load
  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${kbaseURL}/tasks`);
      setTaskData(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Call API to fetch tasks
  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Map Journal</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Country />} />
            <Route path="/experience/:country" element={<Experience />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;



