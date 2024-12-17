import React, { useContext, useState } from 'react';
import './CountrySelection.css';
import schegenImg from '../../assets/schegen.jpg';
import usaImg from '../../assets/usa.jpg';
import germanyImg from '../../assets/germany.jpg';
import thailandImg from '../../assets/thailand.jpg';
import singaporeImg from '../../assets/singapore.jpg';
import { DetailContext } from '../../contexts/DetailPageProvider';

const popularCountries = [
    { name: 'Schengen', image: schegenImg },
    { name: 'USA', image: usaImg },
    { name: 'Germany', image: germanyImg },
    { name: 'Thailand', image: thailandImg },
    { name: 'Singapore', image: singaporeImg },
];

const CountrySelection = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const { detailPageData, setDetailPageData, } = useContext(DetailContext);
    const { selectedCountries } = detailPageData;


    const handleSelection = (country) => {
        console.log(country);    
        if (selectedCountries.includes(country)) {
            const updatedArray = selectedCountries.filter((el)=>el!==country);
            setDetailPageData({ ...detailPageData, selectedCountries: updatedArray })
            
        }
        else {setDetailPageData({ ...detailPageData, selectedCountries: [...selectedCountries, country] })}
    };

    return (
        <div className="country-selection-container">
            {popularCountries.map((country, index) => (
                <label key={index} className={`country-card ${selectedCountries.includes(country.name) ? 'selected' : ''}`}>
                    <input
                        type="checkbox"
                        value={country.name}
                        checked={selectedCountries.includes(country.name)}
                        onChange={() => handleSelection(country.name)}
                    />
                    <img src={country.image} alt={country.name} className="country-image" />
                    <span className="country-name">{country.name}</span>
                </label>
            ))}
        </div>
    );
};

export default CountrySelection;
