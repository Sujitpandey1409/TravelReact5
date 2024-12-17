import React, { useState, useEffect } from 'react';
import './TravelDetailsRight.css';
import 'react-datepicker/dist/react-datepicker.css';
import DetailsRight1 from './DetailsRight1';
import DetailsRight2 from './DetailsRight2';

const VehicleDetailsRight = () => {
  const [countries, setCountries] = useState([]); // State to hold country data from API
  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [error, setError] = useState(null); // To handle any error
  const [selectedCountries, setSelectedCountries] = useState([]); // Selected countries
  const [startDate, setStartDate] = useState(null); // Start Date
  const [endDate, setEndDate] = useState(null); // End Date
  const [duration, setDuration] = useState();
  const [purposeType, setPurposeType] = useState(''); // Purpose Type
  const [tripType, setTripType] = useState();
  const [pageData, setPageData] = useState({});

  const [showComponent1, setShowComponent1] = useState(true); // Toggle between components

  // const handleCountrySelection = (countries) => {
  //   setSelectedCountries(countries); // Update the state with selected countries
  //   console.log("Selected Countries in TravelDetailsRight:", countries);
  // };

  const handleProceed = (data) => {

    const { selectedSearchCountries, startDate, endDate, purposeType, duration, tripType} = data;
    setPageData(data);

    setSelectedCountries(selectedSearchCountries);
    setStartDate(startDate);
    setEndDate(endDate);
    setDuration(duration);
    setPurposeType(purposeType);
    setTripType(tripType);

    console.log(selectedCountries,startDate,endDate,purposeType);
    //setShowComponent1(false); // Hide DetailsRight1 and show DetailsRight2
  };

  useEffect(() => {
    console.log(showComponent1); // Debugging toggle state
  }, [showComponent1]);

  return (
    <div className="container" style={{ background: '#F4F4F4', paddingTop: '30px' }}>
      {loading && <div>Loading countries...</div>}
      {error && <div className="error">{error}</div>}

      <DetailsRight1
        setIsCountries={setCountries}
        showComponent1={showComponent1}
        setShowComponent1={setShowComponent1}
        onProceed={handleProceed}
      />
      <DetailsRight2
        // countries={countries}
        // setIsCountries={setCountries}
        selectedCountries={selectedCountries}
        startDate={startDate}
        endDate={endDate}
        duration={duration}
        purposeType={purposeType}
        pageData={pageData}
        showComponent1={showComponent1}
        setShowComponent1={setShowComponent1}
      />
    </div>
  );
};

export default VehicleDetailsRight;
