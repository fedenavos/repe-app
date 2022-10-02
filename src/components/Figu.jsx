import React from 'react';
import '../styles/figu.css';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';


const Figu = ({ country, index, value, addFigu, removeFigu, display }) => {

    const [style, setStyle] = useState({});
    const [figuValue, setFiguValue] = useState(0);


    useEffect(() => {
        console.log('Figu updated');
        setFiguValue(value);
        if (figuValue > 0) {
            setStyle(
                {
                    backgroundColor: "#EB742E",
                    color: "cornsilk",
                }
            );
        } else {
            setStyle({});
        }
    }, [value, figuValue]);

    const handleClick = (e) => {
        e.preventDefault();
        if (e.type === 'click') {
            addFigu(country, index);
        } else if (e.type === 'contextmenu') {
            removeFigu(country, index);
        }
        
    }

    return (
        <div className={ display ? 'figu' : 'no-figu' } onClick={handleClick} style={style}>
            {display &&
                <Col>
                    <Row>
                        <p className='figu-name'>{country}</p>
                    </Row>
                    <Row>
                        <p>{index}</p>
                    </Row>
                </Col> 
            }
            
        </div>
    );
};


export default Figu;
