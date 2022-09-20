import React from 'react';
import Figu from './Figu';
import { useState, useEffect } from 'react';
import '../styles/country.css'


const Country = ({ figus, country, addFigu, removeFigu }) => {
    
    const [figusToShow, setFigusToShow] = useState([]);

    // if (cantFigus === 19) {
    //     figusArray.push(
    //         <>
    //         <Figu country={country} index={cantFigus+1} key={cantFigus+1} value={figus[cantFigus+1]} />
    //         </>
    //     );
    // }

    useEffect(() => {
        console.log('Country updated');
        const figusArray = [];
        let cantFigus = 19;
        if (country === 'FWC') cantFigus = 29;
        if (country === 'C') cantFigus = 6;

        for (let i = 0; i < cantFigus; i++) {
            figusArray.push(
                <>
                <Figu key={figus[0]*19+i} country={country} index={i+1} value={figus[i+1]} addFigu={addFigu} removeFigu={removeFigu} />
                </>
            );
        }

        setFigusToShow(figusArray);

    }, [figus, country, addFigu]);

    return (
        <div className='country'>
            <h2 className='country-name'>{country}</h2> 
            { figusToShow }
        </div>
    );
};


export default Country;
