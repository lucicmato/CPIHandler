import { log } from 'console';
import React from 'react';

import { Alert } from 'react-bootstrap';

//TODO: finish implementation

interface SuccessMessageProps {
  showMessage: boolean;
}
const SuccessMessage: React.FC<SuccessMessageProps> = ({ showMessage }) => {
  const [showSuccess, setShowSuccess] = React.useState(showMessage);

  // Optionally, you can use setTimeout to hide the success message after a certain time
  setTimeout(() => {
    setShowSuccess(false);
  }, 5000); // Hides the success message after 3 seconds (3000 milliseconds)

  return (
    <div>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Your action was successful!
        </Alert>
      )}
    </div>
  );
};

export default SuccessMessage;
