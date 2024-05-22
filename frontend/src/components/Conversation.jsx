
import React from "react";

const Conversation = ({ messages }) => {
  return (
    <div className="conversation">
      <h2>Conversation</h2>
      <div className="conversation-messages">
        <div className='user'>
          <h3>You</h3>
         Hello

        </div>
        <div className="bot"><h3>Chatbot</h3>Hello there, what can i help you?</div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "bot"}`}
          >
            {message.isUser ? <h3>You</h3> : <h3>Chatbot</h3>}
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
