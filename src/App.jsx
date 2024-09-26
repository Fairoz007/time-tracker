// src/App.jsx
import React, { useState } from 'react';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import WorkForm from './components/WorkForm';

const App = () => {
  // State to manage user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to control the modal visibility for "Start new +"
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening and closing of the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle login
  const handleLogin = () => {
    // Set the state to true after a successful login
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="wrapper">
        {/* Only show the main application if authenticated */}
        {isAuthenticated ? (
          <>
            {/* Sidebar */}
            <aside className="sidebar">
              <h2>Time</h2>
              <div className="weekly-hours">
                <h3>Total Work Hours</h3>
                <div id="totalHours">Total hours: 00:00:00</div>
                {/* Add Work Button - Navigates to /work page */}
                <Link to="/work">
                  <button className="btn1">Add Work</button>
                </Link>
                {/* Start new button - Opens modal */}
                <button id="startNewButton" className="btn2" onClick={openModal}>
                  Start new +
                </button>
              </div>
              {/* Logout Button */}
              <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
            </aside>

            {/* Main Content */}
            <main className="content">
              <header className="content-header">
                <h1>My timesheets</h1>
              </header>

              {/* Section to Display Projects and Tasks */}
              <section id="timesheetSection" className="timesheets">
                {/* Projects will be dynamically inserted here */}
              </section>

              {/* Modal for Adding New Task (visible when isModalOpen is true) */}
              {isModalOpen && (
                <div id="modal" className="modal">
                  <div className="modal-content">
                    <span className="close-button" id="closeModal" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>Apply new</h2>
                    <form id="taskForm">
                      <div className="input-group">
                        <label htmlFor="work">Work</label>
                        <select id="work">
                          <option value="">Search and choose</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" placeholder="type.." />
                      </div>
                      <div className="input-group">
                        <label htmlFor="type">Work Type</label>
                        <select id="type">
                          <option value="Client">Client</option>
                          <option value="Internal">Internal</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-save">Save and start</button>
                    </form>
                  </div>
                </div>
              )}
            </main>
          </>
        ) : (
          <Routes>
            {/* If not authenticated, show the login page */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}

        {/* Define Routes for authenticated users */}
        {isAuthenticated && (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/work" element={<WorkForm />} />
            {/* Redirect to /work if authenticated */}
            <Route path="*" element={<Navigate to="/work" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
