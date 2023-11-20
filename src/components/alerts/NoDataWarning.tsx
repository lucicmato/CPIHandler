import React from 'react';

import { Alert } from 'react-bootstrap';

interface NoDataWarningProps {
  message: string;
}

const NoDataWarning: React.FC<NoDataWarningProps> = ({ message }) => {
  return <Alert variant="warning">{message}</Alert>;
};

export default NoDataWarning;
