import React from 'react';

export const NotFoundPage = () => {
  return (
    <div className="mt-5 p-5 not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;