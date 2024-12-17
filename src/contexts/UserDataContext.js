import React, { createContext, useState } from "react";

// Create context
export const UserDataContext = createContext();

// Provider component
export const UserDataProvider = ({ children }) => {
  // Individual states without default values
  const [destination, setDestination] = useState(null);
  const [tripStartDate, setTripStartDate] = useState(null);
  const [tripEndDate, setTripEndDate] = useState(null);
  const [proposalPersonMobile, setProposalPersonMobile] = useState(null);
  const [planType, setPlanType] = useState(null);
  const [tripType, setTripType] = useState(null);
  const [duration, setDuration] = useState(null);
  const [visaType, setVisaType] = useState(null);
  const [multiTripDuration, setMultiTripDuration] = useState(null);
  const [traveller, setTraveller] = useState(null);

  return (
    <UserDataContext.Provider
      value={{
        destination,
        setDestination,
        tripStartDate,
        setTripStartDate,
        tripEndDate,
        setTripEndDate,
        proposalPersonMobile,
        setProposalPersonMobile,
        planType,
        setPlanType,
        tripType,
        setTripType,
        duration,
        setDuration,
        visaType,
        setVisaType,
        multiTripDuration,
        setMultiTripDuration,
        traveller,
        setTraveller,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
