import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";
import React, { useState, useEffect } from "react";

import { getAuthToken } from "../util/auth";
import axios from "axios";

const token = getAuthToken();

axios.defaults.baseURL = "http://localhost:8080";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [historyOutput, setHistoryOutput] = useState("");

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get("ENDPOINT", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = response.data;
        setHistoryData(result);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };
    fetchHistoryData();
  }, []);

  const handleClick = async (itemName) => {
    try {
      const result = await axios.post("ENDPOINT", { prompt: itemName });
      console.log(result);
      setHistoryOutput(result.data.text);
    } catch (error) {
      console.error(error);
      setHistoryOutput(
        "An error occurred while processing your request via Stack"
      );
    }
  };

  const data = [
    { id: 1, name: "ReactJS" },
    { id: 2, name: "NodeJS" },
    { id: 3, name: "NextJS" },
  ];

  return (
    <PageContent title="History">
      {/* Display the fetched data */}
      <ul>
        {historyOutput ? (
          <div>{setHistoryOutput}</div>
        ) : (
          data.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleClick(item.name)}>
                {item.name}
              </button>
            </li>
          ))
        )}
      </ul>
    </PageContent>
  );
};

export default HistoryPage;
