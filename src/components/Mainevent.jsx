import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EventDropdown from './EventDropdown';
import p1 from "../assets/images/p1.jpeg"
import p2 from "../assets/images/r2.jpeg"
import p3 from "../assets/images/r1.jpeg"
import p4 from "../assets/images/p2.jpeg"
import p5 from "../assets/images/p5.png"
import p6 from "../assets/images/p6.png"

const Mainevent = () => {
  const [selectedOption, setSelectedOption] = useState('upcoming');
  const upcomingEvents = [
    { 
      title: 'Google Conference 2024', 
      date: 'March 10, 2024', 
      description: 'A conference about the future of technology.', 
      imageUrl: p4 
    },
    { 
      title: 'Techtalks 2024', 
      date: 'April 5, 2024', 
      description: 'A Techtalks for innovative developers.', 
      imageUrl: p5 
    },
    { 
      title: 'Virtual Reality 2024', 
      date: 'May 12, 2024', 
      description: 'A workshop on AI and Virtual Reality.', 
      imageUrl: p6 
    }
  ];

  const pastEvents = [
    { 
      title: 'Sandbox 2.0 2023', 
      date: 'March 10, 2023', 
      description: 'A Hackathon solving real-life problems.', 
      imageUrl: p1 
    },
    { 
      title: 'Avinya AI 2023', 
      date: 'April 5, 2023', 
      description: 'A hackathon for innovative developers through AI.', 
      imageUrl: p3 
    },
    { 
      title: 'Design O tech 3.0 2023', 
      date: 'May 12, 2023', 
      description: 'A hackathon for innovative & enthusiasts Developers', 
      imageUrl: p2 
    }
  ];
  const navigate = useNavigate();
  


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="app" id='events'>
      <div className="header">
        <div className="headerText">Our <span className='reddo'>Events</span> </div>
        <EventDropdown onSelect={handleOptionSelect} />
      </div>
      <div className="content">
        {selectedOption === 'upcoming' ? (
          <>
            <h2 className="eventTitle">Upcoming Events</h2> {/* Added title */}
            <div className="eventsGrid">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="eventCard">
                  <img src={event.imageUrl} alt={event.title} className="eventImage" />
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.description}</p>
                  <button onClick={() => navigate(`/registerev/${event.title}`,{state:{upcomingEvents}})} className="registerButton">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="eventTitle">Past Events</h2> {/* Added title */}
            <div className="eventsGrid">
              {pastEvents.map((event, index) => (
                <div key={index} className="eventCard">
                  <img src={event.imageUrl} alt={event.title} className="eventImage" />
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mainevent;
