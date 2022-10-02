import React from 'react';
import Figu from './Figu';
import { useState, useEffect } from 'react';
import '../styles/country.css'


const Country = ({ figus, country, addFigu, removeFigu }) => {
    
    const [figusToShow, setFigusToShow] = useState([]);

    useEffect(() => {
        console.log('Country updated');
        const figusArray = [];
        let cantFigus = 19;
        if (country === 'FWC') cantFigus = 29;
        if (country === 'C') cantFigus = 6;

        for (let i = 0; i < cantFigus; i++) {
            figusArray.push(
                <>
                <Figu key={figus[0]*cantFigus+i} country={country} index={i+1} value={figus[i+1]} addFigu={addFigu} removeFigu={removeFigu} display={true}/>
                </>
            );
        }

        let cantEmpty = (4 - cantFigus % 4);
        for (let i = 0; i < cantEmpty; i++) {
            figusArray.push(
                <>
                <Figu key={figus[0]*30+i} country={country} index={i+1} value={0} display={false}/>
                </>
            );
        }

        setFigusToShow(figusArray);

    }, [figus, country, addFigu, removeFigu]);

    return (
        <div className='country'>
            <h2 className='country-name'>{country}</h2> 
            { figusToShow }
        </div>
    );
};


export default Country;
