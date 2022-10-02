import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            login(emailRef.current.value, passwordRef.current.value)
              .then(
                () => {
                  navigate('/');
                })
              .catch(
                (error) => {
                  setError(error.message);
                  setLoading(false);
                });
        } catch (error) {
            setError('Error al iniciar sesión');
            setLoading(false);
        }

    }


    return (
        <div style={{maxWidth : '400px', minWidth: '400px'}}>
          <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Iniciar sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          No tienes una cuenta? <Link to="/signup">Registrate aquí</Link>
        </div>
      </div>
    );
};


export default Login;
