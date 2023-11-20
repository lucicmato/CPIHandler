import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Form, Container, Button, Alert } from 'react-bootstrap';

const LogIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('boxlog@boxlog.hr');
  const [password, setPassword] = useState('boxlog@boxlog.hr');
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError('');
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="login-form p-4">
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" onClick={onSubmit}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LogIn;
