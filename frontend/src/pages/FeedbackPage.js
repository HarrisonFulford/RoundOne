import { useLocation } from 'react-router-dom';

export default function FeedbackPage() {
  const location = useLocation();
  
  // Access the passed data
  const { responseData } = location.state || {};

  return (
    <div>
      <h1>Answer Feedback</h1>

      {responseData && responseData.length > 0 ? (
        // Loop through the responseData list and display the traits and evaluations
        responseData.map((item, index) => (
          <div key={index}>
            <h6>{item.trait}: {item.score}%</h6>
            <p>{item.evaluation}</p>
          </div>
        ))
      ) : (
        <p>No data received or no traits to display.</p>
      )}
    </div>
  );
}