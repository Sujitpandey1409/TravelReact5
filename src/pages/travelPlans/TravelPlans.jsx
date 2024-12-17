import React, { useContext, useEffect, useState } from 'react'
import './TravelPlans.css'
import { Col, Container, Row } from 'reactstrap'
import VehiclePlansLeft from './TravelPlansLeft';
import VehiclePlansRight from './TravelPlansRight';
import EditPolicyDetailPopUp from './EditPolicyDetailPopUp';
import Drawer from './Drawer';
import { useLocation } from 'react-router-dom';
// import getQuote from '../../api/getQuoteController';
// import axiosInstance from '../../api/axiosInstance';
import { PlanContext } from '../../contexts/PlanProvider';

function VehiclePlans() {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //   const toggleDrawer = () => {
  //       setIsDrawerOpen(!isDrawerOpen);
  //   };

  const location = useLocation();
  const { registrationId } = location.state || {};
  const [quotations, setQuotations] = useState();
  const { cardData, setCardData} = useContext(PlanContext);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    if (registrationId) {
      console.log('Registration ID:', registrationId);

      const eventSource = new EventSource(
        `http://localhost:9040/Quote/getQuote/${registrationId}/15000/200000`
      );

      const combinedQuotations = []; // Temporary array to store quotations

      // Handle the 'QUOTATION' event
      eventSource.addEventListener('QUOTATION', (event) => {
        const quoteData = JSON.parse(event.data); // Parsing the data into a JS object

        combinedQuotations.push(quoteData);
        
        // Update the state with a combined JSON object
        setQuotations([...combinedQuotations]); // Ensure a new array reference for React state
        console.log('Combined Quotations:', combinedQuotations);

        const cardDataArray = combinedQuotations.map((quote) => ({
            id: quote.plancode,
            companyLogo: quote.logo,
            companyName: quote.insuranceName,
            plan: quote.planName,
            medicalExpenses: quote.medicalCover,
            tripCancellation: 3000, // Example static value
            baggageLoss: 1500, // Example static value
            price: quote.totalPremium,
            covers: quote.covers,
          }));
    
          console.log("CardDataArray:", cardDataArray);
          setCardData(cardDataArray);

      });

      

      // Handle the 'COMPLETE' event
      eventSource.addEventListener('COMPLETE', (event) => {
        console.log('Received COMPLETE:', event.data);
        eventSource.close(); // Close the connection when the stream is complete
      });

      // Handle errors
      eventSource.onerror = (error) => {
        console.error('Error with EventSource:', error);
        eventSource.close(); // Close the connection on error
      };

      // Clean up the EventSource when the component is unmounted or registrationId changes
      return () => {
        eventSource.close();
      };
    } else {
      console.log('No Registration ID found.');
    }
  }, [registrationId]);




    return (
      <div style={{ background: "#F5F6F6", minHeight: "90vh", marginTop: "61px", overflow: 'hidden', fontFamily:'Mukta ' }}>
        <Container className='vehicle-plans-container'>
          <Row style={{ height: "90vh", overflow: "auto", position: 'relative' }}>
            <Col md={3} className='left-section-container  d-flex flex-column gap-4'>
              {/* left-section */}
              <VehiclePlansLeft />
            </Col>
            <Col className='right-section-container '>
              {/* right-section */}
              {/* <VehiclePlansRight toggleDrawer={toggleDrawer} /> */}
              {/* <Drawer isOpen={isDrawerOpen} handleClose={toggleDrawer} /> */}
              <VehiclePlansRight  
                quotations={quotations}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  export default VehiclePlans