import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Alert, Nav, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDataByUserName } from '../db';
import Country from '../components/Country';
import '../styles/dashboard.css';
import '../styles/spinner.css';
import { User } from '../models/user.class';


const FriendDashboard = () => {

    const [searched, setSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(new User());
    const [username, setUsername] = useState('');
    const [sortBy, setSortBy] = useState('pattern');

    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    if(!currentUser) {
        navigate('/login');
    }

    useEffect(() => {
        console.log('User data updated');
    }, [userData]);

    const handleLogout = () => {
        setError("");

        try {
            logout();
            navigate("/login");
        } catch (error) {
            setError("Error al cerrar sesión");
        }
    }

    const handleSort = () => {
        if(sortBy === 'pattern') {
            setSortBy('alphabetical');
        }
        else {
            setSortBy('pattern');
        }
    }

    const getUser = (e) => {
        e.preventDefault();
        getUserDataByUserName(username).then(
            (data) => {
                if (data) {
                    setUserData(data);
                    setIsLoading(false);
                    setSearched(true);
                }
                else {
                    setError('Usuario no encontrado: ' + username);
                    setIsLoading(false);
                    setUserData(new User());
                }
            }
        );
    }

    return (
        <>
            <Nav className='mt-3'>
                <Nav.Item>
                    <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <button className='main-button' onClick={handleLogout}>Cerrar sesión</button>
                </Nav.Item>
            </Nav>
            <Form className='m-4' onSubmit={ getUser }>
                <InputGroup>
                    <FormControl
                        placeholder="Busca el album de un amigo"
                        aria-label="Busca el album de un amigo"
                        aria-describedby="basic-addon2"
                        onChange={ (e) => setUsername(e.target.value) }
                    />
                </InputGroup>

                <button className='w-100 text-center mt-4 main-button' type="submit">Buscar</button>
            </Form>
            {!searched && <Alert variant='warning'> Ingrese el nombre de usuario de la persona que queres ver el album </Alert>}
            
            {error && <Alert variant="danger">{error}</Alert>}

            {userData.username &&
                <Card className='mb-4 mt-5'>
                    <Card.Body className='profile-card-body'>
                        <h2 className="text-center">Perfil</h2>
                        <strong>Username:</strong> { userData && userData.username} <br />
                        <strong>Email:</strong> { userData && userData.email}
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: "#CD6229"}}>
                        <div className="w-100 text-center mt-2">
                            
                        </div>
                    </Card.Footer>
                </Card>
            }
            
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleSort}>Ordenar {sortBy === 'alphabetical' ?  'por grupos' : 'alfabeticamente' }</Button>
            </div>
            {isLoading && 
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }
            {!isLoading && userData && 
                <div className='album'>  
                    {
                        userData.album && 
                            Object.keys(userData.album)
                            .sort((a, b) => {
                                if(sortBy === 'pattern') {
                                    return userData.album[a][0] - userData.album[b][0]
                                } else {
                                    return a.localeCompare(b);
                                }
                            })
                            .map((key, index) => {
                                return (
                                    <>
                                    <Country 
                                        key={index}
                                        figus={userData.album[key]} 
                                        country={key}
                                        addFigu={ () => {} }
                                    />
                                    </>
                                )
                            })
                    }
                </div>
            }
        </>
    );
};


export default FriendDashboard;
