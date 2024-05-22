
import React, { useState } from "react";
import History from "./History";
import Conversation from "./Conversation";
import axios from "axios";

// Function to get the CSRF token from the cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [currentMessageIndex, setCurrentMessageIndex] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessages(prevMessages => [...prevMessages, { text: input, isUser: true }]);
        setInput("");
        if (!input.trim()) return;
        // Send the user message to the server on localhost:8000/send with axios
        // fetch("http://localhost:8000/send/", {
        //     method: "POST",
        //     credentials: 'include',
        //     body: JSON.stringify({ message: input }),
        //     headers: {
        //         'X-CSRFToken': getCookie('csrftoken')  // Make sure to define getCookie() function

        //     }
        // })
        axios.post('http://localhost:8000/api/chatRugby', JSON.stringify({ message: input }),{
          headers: {
            "Content-Type": "application/vnd.api+json", "Accept": "application/vnd.api+json", 'Access-Control-Allow-Credentials': true },
        })
        .then((response) => {
          console.log(response.data.message);
          setMessages(prevMessages => [...prevMessages, { text: response.data.message, isUser: false }]);
        }
      )
        // .then((text) => {
        //     setMessages(prevMessages => [...prevMessages, { text: response.data.message), isUser: false }]);
        // })
        .catch((error) => {
          console.error("Error:", error);
        });

    // simulateBotResponse(input);
  };

  const simulateBotResponse = (userMessage) => {
    const botMessage = `Hi there! You said: "${userMessage}"`;
    setMessages([...messages, { text: botMessage, isUser: false }]);
  };

  return (
    <div className="chatbot-container">
      <History
        messages={messages}
        setCurrentMessageIndex={setCurrentMessageIndex}
      />
    <div class="container_right">
      <div class="conversation">
    <Conversation
      messages={currentMessageIndex !== null ? messages.slice(0, currentMessageIndex + 1) : messages}
    />
  </div>
  <form onSubmit={handleSubmit} class="input-form">
    <input
      type="text"
      value={input}
      onChange={handleInputChange}
      placeholder="Type a message..."
      class="input-field"
    />

    <button type="submit" className="send-button" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path></svg>
    </button>
  </form>
</div>
    </div>
  );
};

export default Chatbot;
