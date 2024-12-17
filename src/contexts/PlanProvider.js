import React, { createContext, useState } from 'react';
import logo1 from '../assets/Tata_AIG@2x.svg'
import logo2 from '../assets/ICICI_Lombard@2x.jpg'
import logo3 from '../assets/Care_Health@2x.svg'

// Create a context
export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  //cards data for plan right section card will be fetched from backend
  const [cardData, setCardData] = useState([
    {
      "id": 108,
      "companyLogo": "https://public-upload-data.s3.ap-south-1.amazonaws.com/images/Digitlogo.jpg",
      "companyName": "DIGIT",
      "plan": "1LK- International Plan",
      "medicalExpenses": 500000,
      "tripCancellation": 2000,
      "baggageLoss": 1000,
      "price": 50,
      "covers": []
    },
    {
      "id": 1,
      "companyLogo": logo2,
      "companyName": 'ICICI Lombard',
      "plan": "$100k Travel Insurance",
      "medicalExpenses": 300000,
      "tripCancellation": 1500,
      "baggageLoss": 500,
      "price": 40,
      "covers": []
    },
    {
      "id": 2,
      "companyLogo": logo3,
      "companyName": "Care Health",
      "plan": "$100k Travel Insurance",
      "medicalExpenses": 1000000,
      "tripCancellation": 5000,
      "baggageLoss": 2000,
      "price": 70,
      "covers": []
    }
  ])

  const [comparisonData, setComparisonData] = useState([]);



  // Shared state for vehicle plan details
  const [plansData, setPlansData] = useState({
    "benefitPlans": [
      {
        "planName": "Basic Plan",
        "price": "4,500",
        "benefits": [
          "Roadside Assistance",
          "Car Damages",
          "Standalone Personal Accident"
        ]
      },
      {
        "planName": "Smart Plan",
        "price": "6,800",
        "benefits": [
          "Roadside Assistance",
          "Car Damages",
          "Standalone Personal Accident",
          "Zero Depreciation",
          "Tyre Protect"
        ]
      },
      {
        "planName": "Enhanced Plan",
        "price": "9,500",
        "benefits": [
          "Roadside Assistance",
          "Car Damages",
          "Standalone Personal Accident",
          "Tyre Protect",
          "Return To Invoice",
          "Zero Depreciation"
        ]
      }
    ]
  });

  const [selectedPlan, setSelectedPlan] = useState('Basic Plan')

  const allBenefits = ['roadside assistance', 'zero depreciation', 'standalone personal accident', 'car damages', 'tyre protect', 'return to invoice', 'key protect']



  const value = {
    plansData, setPlansData, selectedPlan, setSelectedPlan, allBenefits, cardData, setCardData, comparisonData, setComparisonData
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};
