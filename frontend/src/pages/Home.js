import PageContent from "../components/PageContent";

import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
axios.defaults.baseURL = "http://localhost:8080";

const HomePage = () => {

  const [buttonState, setButtonState] = useState(1);
  const [input, setInput] = useState("");
  
  const [response, setResponse] = useState(false);
  const [output, setOutput] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedValue = encodeURIComponent(input);
    console.log(encodedValue);
  
    if (buttonState === 1) {
      try {
        console.log("hii bsdk");
        const result = await axios.post("/chatgpt", { prompt: input });
        console.log(result.data.prompt);
        console.log(result);
        setOutput(result.data.text);
      } catch (error) {
        console.error(error);
        console.log(error);
        setResponse(true);
        setOutput("An error occurred while processing your request via Chat GPT");
      }
    } else {
      try {
        console.log("Fetching data from /stack");
        const result = await axios.get(`https://api.stackexchange.com/2.3/search?order=asc&sort=votes&intitle=${encodedValue}&site=stackoverflow`); // Assuming it's a GET request
        console.log(result.data);
        setResponse(true)
        setOutput(result.data.items);
        console.log(`////////////${output}`)
      //  console.log(typeof result.data);
      
      } catch (error) {
        console.error(error);
        setResponse(true);
        setOutput("An error occurred while fetching data from /stack");
      }
    }
  };
  
  return (
    <PageContent title="Question">
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Enter Your Question</label>
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
      <h2>Output:</h2>
      <ul>
        {output?.slice(0, 10).map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

    </PageContent>
  );
};

export default HomePage;
