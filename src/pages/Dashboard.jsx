import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserData, updateUser } from '../db';
import Country from '../components/Country';
import '../styles/dashboard.css';
import '../styles/spinner.css';
import HeaderComponent from '../components/HeaderComponent';


const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState({});
    const [sortBy, setSortBy] = useState('pattern');
    const [removeMode, setRemoveMode] = useState(false);

    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    if(!currentUser) {
        navigate('/login');
    }

    useEffect(() => {
        console.log('Page updated');
        if(currentUser) {
            getUserData(currentUser.uid).then(
                (data) => {
                    setUserData(data);
                    setIsLoading(false);
                }
            );
        }
    }, [currentUser]);

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

    const addFigurita = async (country, index) => {
        setError("");

        try {
            console.log('Añadiendo cromo ' + country + index);
            const newAlbum = userData.album;
            newAlbum[country][index] += 1;
            setUserData(
                {
                    ...userData,
                    album: newAlbum,
                }
            );
            await updateUser(userData);
            console.log("User updated");
            setIsLoading(false);

        } catch (error) {
            setError("Error al añadir cromo");
            console.log(error);
        }
    }


    const removeFigurita = async (country, index) => {
        setError("");

        try {
            console.log('Eliminando cromo ' + country + index);
            const newAlbum = userData.album;
            if (newAlbum[country][index] > 0) {
                newAlbum[country][index] -= 1;
                setUserData(
                    {
                        ...userData,
                        album: newAlbum,
                    }
                );
                await updateUser(userData);
                console.log("User updated");
            }
            else {
                return
            }
            setIsLoading(false);

        } catch (error) {
            setError("Error al eliminar cromo");
            console.log(error);
        }
    }

    const ToggleRemoveComponent = () => {
        return (
            <i 
                className={removeMode ? 'bi-toggle-on' : 'bi-toggle-off' }
                onClick={() => {
                    setRemoveMode(!removeMode);
                }}                     
                style={{ 
                    color: removeMode ? 'red' : 'grey',
                    fontSize: '2rem', cursor: 'pointer', margin: '0 1rem'
                }}
            ></i>
        )
    }

    return (
        <div>
            <HeaderComponent handleLogout={handleLogout} navItem={'friends'}></HeaderComponent>
            {error && <Alert variant="danger">{error}</Alert>}
            {isLoading && 
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }
            {!isLoading &&
            <>
                <Card className='mt-5'>
                    <Card.Body className='profile-card-body'>
                        <h2 className="text-center">Perfil</h2>
                        <strong>Username:</strong> { userData && userData.username} <br />
                        <strong>Email:</strong> { userData && userData.email}
                    </Card.Body>
                    {/* <Card.Footer style={{ backgroundColor: "#CD6229"}}>
                        <div className="w-100 text-center mt-2">
                            
                        </div>
                    </Card.Footer> */}
                </Card>
                <div className='album'> 
                    <div className='sticky'>
                        <div className='toggle mt-1'>
                            <ToggleRemoveComponent /> <span>Eliminar cromo</span>
                        </div>   
                        <div className="w-100 text-center">
                            <Button variant='link' onClick={handleSort}>Ordenar {sortBy === 'alphabetical' ?  'por grupos' : 'alfabeticamente' }</Button>
                        </div> 
                    </div>

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
                                        addFigu={ removeMode ? removeFigurita : addFigurita }
                                    />
                                    </>
                                )
                            })
                    }
                </div>
            </>
            }
        </div>
    );
};


export default Dashboard;
