import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function SolveProblemPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Access the passed data
  const { questionDetails } = location.state || {};
  console.log("questionDetails", questionDetails);

  // Local vars
  const [question, setQuestion] = useState(null);
  const [questionTitle, setQuestionTitle] = useState(null);
  const [traitsToEvaluate, setTraitsToEvaluate] = useState([""]);
  const [wordCount, setWordCount] = useState(0);
  const userResponse = useRef(null);

  // Function to count words
  const countWords = () => {
    if (userResponse.current) {
      const text = userResponse.current.value.trim();
      const words = text.split(/\s+/); // Split by spaces, tabs, or newlines
      setWordCount(text ? words.length : 0); // Set count, handle empty input
    }
  };

  const evaluate = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
        responseText: userResponse.current.value,
        traits: traitsToEvaluate,
      }),
    };
    try {
      /* Dummy API evaluate data
      const feedbackData = [
        {
                "trait": "Trait Two",
                "score": 4.5,
                "evaluation": "You got a score of 4.5 because..."
        },
        {
                "trait": "Trait Two",
                "score": 4.5,
                "evaluation": "You got a score of 4.5 because..."
        }
      ]
      */
      // Switch to feedback page
      const response = await fetch("/ai/evaluate", requestOptions);
      const feedbackData = await response.json();
      navigate("/feedback", { state: { responseData: feedbackData, problem: questionDetails } });
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  
  }

  const evaluateAnswer = () => {
    const responseText = userResponse.current?.value.trim(); // Get and trim the response

    // Check if the response is empty
    if (!responseText) {
      alert("Your answer cannot be empty. Please provide a response.");
      return; // Stop further execution
    }

    // Ask for confirmation before submitting
    const confirmSubmission = window.confirm("Are you sure you want to submit your response?");
    if (confirmSubmission) {
      evaluate();
    }
};

  // Set the value of `question`, etc... based on the passed questionDetails
  useEffect(() => {
    if (questionDetails && questionDetails.question && questionDetails.questionTitle) {
      setQuestion(questionDetails.question);
      setQuestionTitle(questionDetails.questionTitle);
      setTraitsToEvaluate(questionDetails.traits);
    }
  }, [questionDetails]);  // Only run when questionDetails change

    return (
      <div>
        {questionDetails && questionDetails.question && questionDetails.traits ? (
          <>
            <div className="card border-0 mb-3" style={{ borderRadius: 0, textAlign: "left" }}>
              <h3 className="card-header py-3 ps-5 border-0" style={{ backgroundColor: '#f7f7f7'}}>Problem: {questionTitle}</h3>
              <div className="card-body p-0" style={{ backgroundColor: '#d9d9d9' }}>
                <h5 className="card-text mt-4 mb-3 ps-5">
                  Question
                </h5>
                <p className="card-text pb-5 ps-5">
                  <div>{question}</div> 
                </p>
              </div>
            </div>
            <div className="card border-0 mb-3" style={{ borderRadius: 0, backgroundColor: "#f9f9f9", textAlign: "left" }}>
              <h3 className="card-header py-3 ps-5" style={{ backgroundColor: '#f7f7f7'}}>Your Answer:</h3>
              <div className="card-body ps-0">
                <p className="card-text">
                  <form className="ps-5 m-0">
                    <div className="mb-3">
                      <div className="form-floating">
                        <textarea
                          ref={userResponse}
                          onChange={countWords}
                          className="form-control"
                          placeholder="Write your answer here..."
                          id="userResponseArea"
                          style={{
                            height: '45vh',
                            border: "none",
                            backgroundColor: 'transparent',
                          }}
                          
                        ></textarea>
                        <label htmlFor="userResponseArea" style={{ opacity: 0.5 }}>Type your answer here...</label>
                      </div>
                    </div>
                    <p>Word Count: <b>{wordCount}</b> words</p>
                    <button type="button" className="btn btn-primary px-4 fw-semibold" style={{backgroundColor: '#5f6bd7'}} onClick={evaluateAnswer}>
                      Submit
                    </button>
                  </form>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div>No question selected</div>
        )}
      </div>
    );
}