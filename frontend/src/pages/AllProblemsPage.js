import { useNavigate } from 'react-router-dom';

export default function AllProblemsPage() {
  const navigate = useNavigate();
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
  const goToProblem = (problem) => {
    navigate("/problem", {
      state: {
        // ***Will need to get details from database
        questionDetails: problem
      }
    });
  };

  return (
      <>
        <h1>Problems Page</h1>
        {exampleProblems.map((problem, index) => (
          <div className="card" key={index}>
            <h5 className="card-header">{problem.questionTitle}</h5>
            <div className="card-body">
              <p className="card-text">
                <div>Description: {problem.question}</div> 
              </p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => goToProblem(problem)}>
              Try Now
            </button>
          </div>
        ))}
      </>
  );
}