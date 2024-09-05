import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const RegisterEvent = () => {
  const { eventName } = useParams(); 
  const location = useLocation(); 
  const upcomingEvents = location.state?.upcomingEvents || []; 
  const [formData, setFormData] = useState({
    eventName: eventName || (upcomingEvents.length > 0 ? upcomingEvents[0].title : ''),
    name: '',
    email: '',
    rollNumber: '',
    department: 'CSE',
    year: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (eventName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        eventName
      }));
    }
  }, [eventName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4003/register-event', {
        ...formData,
      });
      alert(response.data.msg);
    } catch (error) {
      alert('Registration failed! ' + error.response?.data?.msg || error.message);
    }
  };

  return (
    <>
    <div className="outerhero">
        <Navbar data-aos="fade-up" data-aos-duration="3000"/>
       

      </div>
    <div className="registereventout">
    <div className="registerContainer">
      <h2 className="registerTitle">Register for <span className="reddo">Event</span> </h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label className="registerLabel">Select Event</label>
        <select
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className="registerSelect"
          required
        >
          {upcomingEvents.map((event, index) => (
            <option key={index} value={event.title}>
              {event.title}
            </option>
          ))}
        </select>

        <label className="registerLabel">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="registerInput"
          required
        />

        <label className="registerLabel">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="registerInput"
          required
        />

        <label className="registerLabel">Roll Number</label>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          className="registerInput"
          required
        />

        <label className="registerLabel">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="registerSelect"
        >
          <option value="CSE">CSE</option>
          <option value="CSE-AI">CSE-AI</option>
          <option value="Design">Design</option>
          <option value="Civil">Civil</option>
          <option value="Electrical">Electrical</option>
          <option value="B Pharma">B Pharma</option>
          <option value="Management">Management</option>
        </select>

        <label className="registerLabel">Year</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="registerInput"
          required
        />

        <label className="registerLabel">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="registerInput"
          required
        />

        <button type="submit" className="registerButton">Register</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default RegisterEvent;