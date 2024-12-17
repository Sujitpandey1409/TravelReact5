import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import VehicleDetails from './pages/travelDetails/TravelDetails';
import Header from './components/Header';
import VehiclePlans from './pages/travelPlans/TravelPlans';
import VehicleVerificationSteps from './pages/travelVerificationSteps/TravelVerificationSteps'
import CustomerConsentForm from './pages/consentForm/CustomerConsentForm';
import PaymentStatus from './pages/paymentStatus/PaymentStatus'
import ComparePlan from './pages/travelPlans/ComparePlan/ComparePlan';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<h1>Welcome to the Vehicle App</h1>} />
          <Route path="/travel-details" element={<VehicleDetails />} />
          {/* <Route path="/insurer-selection" element={<QuoteLoaderPage />} /> */}
          <Route path="/travel-plans" element={<VehiclePlans />} />
          <Route path="/travel-verification" element={<VehicleVerificationSteps />} />
          <Route path="/compare-plans" element={<ComparePlan />} />
          <Route path='/consent' element={<CustomerConsentForm/>}/>
          <Route path="/payment-status" element={<PaymentStatus status={true}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
