import React, { useState } from "react";
import axios from "axios";

function AskQuestion() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleButtonClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setApiResponse("");

    axios
      .post(process.env.NEXT_PUBLIC_QA_API, { query: textAreaValue })
      .then((response) => {
        setApiResponse(response.data.text);
      })
      .catch((error) => {
        setErrorMessage("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  return (
    <div>
      <textarea
        rows="3"
        cols="150"
        style={{ fontSize: "16px", lineHeight: "1.5em", padding: "10px" }}
        value={textAreaValue}
        onChange={handleTextAreaChange}
      />
      <button onClick={handleButtonClick}>Ask Question</button>
      {isLoading && <p>Loading...</p>}
      {apiResponse && <div>{apiResponse}</div>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default AskQuestion;
