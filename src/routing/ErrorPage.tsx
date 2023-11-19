import React from 'react';

import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error: Error = useRouteError() as Error;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

type Error = {
  statusText?: string;
  message?: string;
};

export default ErrorPage;
