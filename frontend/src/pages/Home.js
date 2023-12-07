import PageContent from "../components/PageContent";

import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
axios.defaults.baseURL = "http://localhost:8080";

const HomePage = () => {

  const [buttonState, setButtonState] = useState(1);


  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(buttonState === 1) {
      try {
        const result = await axios.post("/chatgpt", { prompt: input });
        console.log(result);
        setResponse(result.data.text);
      } catch (error) {
        console.error(error);
        setResponse("An error occurred while processing your request via Chat GPT");
      }
    } else{
      try {
        const result = await axios.post("/stack", { prompt: input });
        console.log(result);
        setResponse(result.data.text);
      } catch (error) {
        console.error(error);
        setResponse("An error occurred while processing your request via Stack");
      }
    }
  };

  return (
    <PageContent title="Question">
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Enter Your Error</label>
        <textarea
          className="question_area"
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="buttons">
          <button onClick={() => {setButtonState(1)}} type="submit">
            Chat GPT
          </button>
          <button onClick={() => {setButtonState(2)}} type="submit">
            Stack OverFlow
          </button>
        </div>
      </form>
      <div>
        {response && (
          <div>
            <h2>Generated Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default HomePage;
