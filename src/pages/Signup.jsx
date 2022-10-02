import React, { useState, useRef } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../models/user.class';
import { addUser } from '../db.js';


const Signup = () => {

    const { signup } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Las contraseñas no coinciden');
        } 

        setError('');
        setLoading(true);
        signup(emailRef.current.value, passwordRef.current.value)
          .then(
              async (newUser) => {
                console.log(newUser.user.uid);
                let user = new User(newUser.user.uid, usernameRef.current.value, emailRef.current.value)
                user = JSON.parse(JSON.stringify(user));
                addUser(user);
                navigate('/login');
              })
          .catch(
            (error) => {
            setError('Error al crear la cuenta');
            console.log(error);
          })
          .finally(
            () => setLoading(false)
          );
    }


    return (
        <div style={{maxWidth : '400px', minWidth: '400px'}}>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Crear una cuenta</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirma la contraseña:</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </div>
      </div>
    );
};


export default Signup;
