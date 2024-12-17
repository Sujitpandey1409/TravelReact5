import React, { createContext, useState } from 'react';

// Create a context
export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  // Shared state for vehicle and policy details
  const [detailPageData, setDetailPageData] = useState({
    selectedCountries: [],
    startDate: '',
    endDate: '',
    travelTypeToggle: '',
    travelType: '',
    purposeType: '',
    mobileNumber:'', 
    pinCode:'', 
    travelersCount:1, 
    travellers:[],
    visaToggle: '',
    visaType: 'NON_IMMIGRANT'
  });

  const [policyDetails, setPolicyDetails] = useState({
    policyExpiryDate: '',
    previousInsurer: '',
    policyType: 'comprehensive', // default is comprehensive
    claimsMade: 'yes', // default is yes
    permitType: 'private', // default is private
  });

  const [selectedInsurers, setSelectedInsurers] = useState('Kotak General Insurance');


  const value = {
    detailPageData,
    setDetailPageData,
    policyDetails,
    setPolicyDetails,
    selectedInsurers, setSelectedInsurers
  };

  return (
    <DetailContext.Provider value={value}>
      {children}
    </DetailContext.Provider>
  );
};
