import React, { useState } from 'react';

const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    // Add user message to the state
    setMessages([...messages, { role: 'user', content: input }]);
    
    // Call the GPT-3 API to get a response
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY',
      },
      body: JSON.stringify({
        prompt: input,
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    // Add GPT-3 response to the state
    setMessages([...messages, { role: 'gpt', content: data.choices[0].text.trim() }]);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatGPT;
