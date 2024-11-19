import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FeedbackPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the passed data
  const { responseData = [], problem = null } = location.state || {};
  
  // Local vars
  const [question, setQuestion] = useState(null);
  const [questionTitle, setQuestionTitle] = useState(null);
  const [traitsToEvaluate, setTraitsToEvaluate] = useState([""]);

  const numCriterion = responseData ? responseData.length : 0;
  const numCriterionPassed = responseData ? responseData.filter(item => item.score >= 50).length : 0;
  const avgScore = responseData && numCriterion > 0 
    ? (responseData.reduce((sum, item) => sum + item.score, 0) / numCriterion).toFixed(2)
    : 0;
  
  /* Dummy data
  const problem ={
      "questionTitle": "Candidate Name",
      "question": "What's your name?",
      "traits": ["empathy", "confidence"]
    }

  const exampleProblems = [
    {
      "questionTitle": "Candidate Name",
      "question": "What's your name?",
      "traits": ["empathy", "confidence"]
    },
    {
      "questionTitle": "React Experience",
      "question": "Describe your experience with React.js",
      "traits": ["knowledgeable", "confidence"]
    },
  ]
  */

  // Helper function to determine the score color based on pass/fail
  const getScoreColor = (score) => {
    return score >= 50 ? '#498466' : '#B80C09'; // Green for pass, red for fail
  };

  const returnToProblem = (problem) => {
    navigate("/problem", {
      state: {
        questionDetails: {
          questionTitle: questionTitle,
          traits: traitsToEvaluate,
          question: question 
        }
      }
      });
  };

  useEffect(() => {
    if (problem && problem.question && problem.questionTitle) {
      setQuestion(problem.question);
      setQuestionTitle(problem.questionTitle);
      setTraitsToEvaluate(problem.traits);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {responseData && responseData.length > 0 ? (
        // Loop through the responseData list and display the traits and evaluations
        <div className="card border-0 mb-3" style={{ borderRadius: 0, backgroundColor: "#f9f9f9", textAlign: "left" }}>
          <h3 className="card-header py-3 ps-5" style={{ backgroundColor: '#f7f7f7'}}>Submission Evaluation</h3>
          <div className="card-body ps-0">
            <h6 className="card-text mt-4 mb-5 ps-5">
              Question: {questionTitle}
            </h6>
            <h5 className="card-text mt-4 mb-3 ps-5">
              Your Submission
            </h5>
            <p className="card-text ps-5">
              AVG Score: <span style={{ color: getScoreColor(avgScore) }}>{avgScore}%</span>
            </p>
            <p className="card-text pb-5 ps-5">
              Criterion Passed: {numCriterionPassed} / {numCriterion};
            </p>
            <h5 className="card-text mt-4 mb-3 ps-5">
              Criterion Evaluation Details
            </h5>
            <p className="card-text ps-5">
              {responseData.map((item, index) => (
                <div key={index} className="mb-5">
                  <h6>{item.trait}: <span style={{ color: getScoreColor(item.score) }}>{item.score.toFixed(2)}%</span></h6>
                  <p className="ps-2">{item.evaluation}</p>
                </div>
              ))}
              <button type="button" className="custom-button1 btn btn-primary mt-5" style={{backgroundColor: '#5f6bd7'}} onClick={returnToProblem}>
                <i className="fas fa-redo pe-3"></i>
                Try Again
              </button>
            </p>
          </div>
        </div>
      ) : (
        <p>No data received or no traits to display.</p>
      )}

    </div>
  );
}