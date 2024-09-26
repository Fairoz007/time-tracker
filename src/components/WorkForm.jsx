// src/components/WorkForm.jsx
import React, { useState } from 'react';
import '../styles/work.css';

const WorkForm = () => {
  // State for managing form input values
  const [workDetails, setWorkDetails] = useState({
    workName: '',
    workDescription: '',
    department: '',
    type: '',
  });

  // State for handling loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle change in form input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setWorkDetails((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!workDetails.workName || !workDetails.workDescription || !workDetails.department || !workDetails.type) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(''); // Clear previous error message

      // Retrieve the token from localStorage (ensure it's stored when the user logs in)
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User is not authenticated. Please log in.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(workDetails),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Work added successfully') {
          alert('Work has been added successfully!');
          setWorkDetails({ workName: '', workDescription: '', department: '', type: '' });
        } else {
          setErrorMessage('Failed to add work. Please try again.');
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to add work. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the work. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <section className="work-form">
      <h2>Add New Work</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form id="workForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="workName">Work Name</label>
          <input
            type="text"
            id="workName"
            value={workDetails.workName}
            onChange={handleChange}
            placeholder="Enter work name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="workDescription">Work Description</label>
          <textarea
            id="workDescription"
            value={workDetails.workDescription}
            onChange={handleChange}
            placeholder="Enter work description"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            value={workDetails.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select id="type" value={workDetails.type} onChange={handleChange} required>
            <option value="" disabled>Select type</option>
            <option value="Client">Client</option>
            <option value="Internal">Internal</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-save" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Work'}
        </button>
      </form>
    </section>
  );
};

export default WorkForm;
