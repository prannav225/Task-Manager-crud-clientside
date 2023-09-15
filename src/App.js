import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="header">
          <h1 className="logo">Todo App</h1>
          <div className="btn">
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle toggleBtn"
            >
              {isDarkMode ? <FaSun className="sun" /> : <FaMoon />}
            </button>
          </div>
        </div>
        <TodoList/>
      </div>
  );
}

export default App;
