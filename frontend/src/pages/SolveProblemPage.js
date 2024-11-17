import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function SolveProblemPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // Access the passed data
  const { questionDetails } = location.state || {};

  const [question, setQuestion] = useState(null);
  const [traitsToEvaluate, setTraitsToEvaluate] = useState([""]);
  const [userResponse, setUserResponse] = useState('');

  const evaluate = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        responseText: userResponse,
        traits: traitsToEvaluate,
      }),
    };
    try {
      const response = await fetch("/ai/evaluate", requestOptions);
      const feedbackData = await response.json();
  
      // Switch to feedback page
      navigate("/feedback", { state: { responseData: feedbackData } });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
  }

  // Evaluate user's answer on button click
  const evaluateAnswer= (e) => {
    evaluate();
  };

  // Handle change event to update the state when the user types
  const handleTextChange = (event) => {
    setUserResponse(event.target.value);
  };

  // Set the value of `question` based on the passed questionDetails
  useEffect(() => {
    if (questionDetails && questionDetails.question) {
      setQuestion(questionDetails.question);
      setTraitsToEvaluate(questionDetails.traits);
    }
  }, [questionDetails]);  // Only run when questionDetails change

    return (
      <>
        <h1>Solve Problem Page</h1>
        {questionDetails && questionDetails.question && questionDetails.traits ? (
          <>
            <div className="card">
              <h5 className="card-header">Question 1</h5>
              <div className="card-body">
                <p className="card-text">
                  <div>{question}</div> 
                </p>
              </div>
            </div>
            <div>
              <form>
                <div className="mb-3">
                  <div className="form-floating">
                    <textarea
                      value={userResponse}
                      onChange={handleTextChange}
                      className="form-control"
                      placeholder="Write your answer here..."
                      id="userResponseArea"
                      style={{ height: "300px" }}
                    ></textarea>
                    <label htmlFor="userResponseArea">My Response</label>
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={evaluateAnswer}>
                  Submit
                </button>
              </form>
            </div>
          </>
        ) : (
          <div>No question selected</div>
        )}
      </>
    );
}