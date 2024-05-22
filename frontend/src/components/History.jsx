
import React from "react";

const Sidebar = ({ messages, setCurrentMessageIndex }) => {
  return (
    <div className="sidebar">
      <h2>Conversation History</h2>
      <ul>
        {/* {messages.map((message, index) => (
          <li key={index} onClick={() => setCurrentMessageIndex(index)}>
            {message.text}
          </li>
        ))} */}
     
      <li className="message-item">Harlequins' Danny Care Announces New Career</li>
      <li  className="message-item">Joe Marler's Retirement Plan</li>
      <p className="date-heading">Aujourd'hui</p>
      </ul>
      <ul>
      <li className="message-item">Owen Farrell's Return</li>
      <p className="date-heading">Hier</p>
      </ul>
    </div>
  );
};

export default Sidebar;
