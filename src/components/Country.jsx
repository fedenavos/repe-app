import React from 'react';
import Figu from './Figu';
import { useState, useEffect } from 'react';
import '../styles/country.css'


const Country = ({ figus, country, addFigu }) => {
    
    const [figusToShow, setFigusToShow] = useState([]);

    useEffect(() => {
        console.log('Country updated');
        const figusArray = [];
        let cantFigus = 29;
        if (country === 'FWC') cantFigus = 29;
        if (country === 'C') cantFigus = 6;

        for (let i = 0; i < cantFigus; i++) {
            figusArray.push(
                <Figu key={figus[0]*cantFigus+i} country={country} index={i+1} value={figus[i+1]} addFigu={addFigu} display={true}/>
            );
        }

        let cantEmpty = (4 - cantFigus % 4);
        for (let i = 1; i <= cantEmpty; i++) {
            figusArray.push(
                <Figu key={figus[0]*700+i*30} country={country} index={i*30+1} value={0} display={false} addFigu={() => {}}/>
            );
        }

        setFigusToShow(figusArray);

    }, [figus, country, addFigu]);

    return (
        <div className='country'>
            <h2 className='country-name'>{country !== 'C' ? country : 'COCA-COLA'}</h2> 
            { figusToShow }
        </div>
    );
};


export default Country;
