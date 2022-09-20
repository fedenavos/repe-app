import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUserData, updateUser } from '../db';
import Country from '../components/Country';
import '../styles/dashboard.css';
import '../styles/spinner.css';


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
            setError("Failed to logout");
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
            setError("Failed to Add Cromo");
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
            setError("Failed to Remove Cromo");
            console.log(error);
        }
    }

    const ToggleRemoveComponent = () => {
        console.log('Toggle remove mode', removeMode);
        return (
            <i 
                className={removeMode ? 'bi-toggle-on' : 'bi-toggle-off' }
                onClick={() => {
                    setRemoveMode(!removeMode);
                }}                     
                style={{ 
                    color: removeMode ? 'green' : 'grey', 
                    fontSize: '2rem', cursor: 'pointer' 
                }}
            ></i>
        )
    }

    return (
        <>
            <Card className='mb-4 mt-5'>
                <Card.Body className='profile-card-body'>
                    <h2 className="text-center">Profile</h2>
                    <strong>Username:</strong> { userData && userData.username} <br />
                    <strong>Email:</strong> { userData && userData.email}
                </Card.Body>
                <Card.Footer style={{ backgroundColor: "#CD6229"}}>
                    <div className="w-100 text-center mt-2">
                        <button className='main-button' onClick={handleLogout}>Log out</button>
                    </div>
                </Card.Footer>
            </Card>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleSort}>Sort by alphabetical order</Button>
            </div>
            {isLoading && 
                <div className="spinner-container">
                    <div className="loading-spinner"></div>
                </div>
            }
            {!isLoading &&
                <div className='album'>  
                    <hr></hr>       
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
                                    <div>
                                        <ToggleRemoveComponent /> <span className='toggle'>Modo eliminar</span>
                                    </div>
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
            }
        </>
    );
};


export default Dashboard;
