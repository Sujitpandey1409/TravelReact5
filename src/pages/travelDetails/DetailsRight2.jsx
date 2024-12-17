import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import travelInsuranceIcon from '../../assets/insuranceIcon.png'
import VehicleDetailsCardHeader from './TravelDetailsCardHeader';
import DatePicker from "react-datepicker";
import { CiCalendarDate } from 'react-icons/ci';
import { DetailContext } from '../../contexts/DetailPageProvider';
import CountrySearch from './CountrySearch';
import CountrySelection from "./CountrySelection";
import { FiInfo, FiPlus, FiMinus } from 'react-icons/fi';
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import iconImage from '../../assets/travelBack.svg'
import axiosInstance from '../../api/axiosInstance';
import './DetailsRight2.css';
import ReactSelect from 'react-select/base';

// export default function DetailsRight2({ selectedCountries, startDate, endDate, duration, purposeType, showComponent1, setShowComponent1 }) {
export default function DetailsRight2({ pageData, showComponent1, setShowComponent1 }) {
    //const MAX_TRAVELERS = 10;

    const [detailErrors, setDetailErrors] = useState({});
    const { detailPageData, setDetailPageData } = useContext(DetailContext);
    const { mobileNumber, pinCode, travelersCount, travellers } = detailPageData;
    const [travelerCount, setTravelerCount]  = useState(travelersCount)
    const [isExpandedAdd, setExpandedAdd] = useState(false)
    const [ageType, setAgeType] = useState  (travellers);
    const [pincode, setPincode] = useState();

    const [planType, setPlanType] = useState("SINGLE");
    const [tripType, setTripType] = useState(); 

    const dropDownRef = useRef();
    const navigate = useNavigate();

    const { selectedSearchCountries, startDate, endDate, purposeType, duration, isMultiTrip, maxTravelers, visaType} = pageData;

    // validations
    const validateDetails = () => {
        const errors = {};

        // Mobile number validation (10 digits, starting with 6, 7, 8, or 9)
        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileNumber) {
            errors.mobileNumber = 'Mobile number is required';
        } else if (!mobilePattern.test(mobileNumber)) {
            errors.mobileNumber = 'Invalid mobile number';
        }

        // Pincode validation (6 digits)
        const pincodePattern = /^\d{6}$/;
        if (!pincode) {
            errors.pincode = 'Pin code is required';
        } else if (!pincodePattern.test(pincode)) {
            errors.pincode = 'Invalid pin code';
        }

        return errors;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding field in state
        setDetailPageData({
            ...detailPageData,
            [name]: value
        });

        // Clear error for the field being updated
        setDetailErrors({
            ...detailErrors,
            [name]: ''
        });

        // ================================================================
        console.log({
            "Destination:":selectedSearchCountries,
            "trip_startdate": startDate,
            "trip_enddate": endDate,
            "plantype": purposeType,

        });

    };

    const handlePinInputChange = (e) => {
        const value = e.target.value;
    
        // Allow only numbers and a maximum length of 6
        if (/^\d{0,6}$/.test(value)) {
            setPincode(value);
        }
    };
    
    

    // Increment function
    const handleIncrement = (key) => {
        setAgeType((prevState) => ({
            ...prevState,
            [key]: travelerCount < 10 ? prevState[key] + 1 : prevState[key], // Increment the value for the specific key
        }));
    };

    // Decrement function
    const handleDecrement = (key) => {
        setAgeType((prevState) => ({
            ...prevState,
            [key]: prevState[key] > 0 ? prevState[key] - 1 : 0, // Decrement, but keep the value >= 0
        }));
    };

    const [travelers, setTravelers] = useState([]); // Tracks traveler ages

    // Adds a new traveler
    const handleAddTraveler = () => {
        setTravelers((prevTravelers) => {
            if (prevTravelers.length < maxTravelers) {
                return [...prevTravelers, { age: "" }]; // Set age as empty string for new traveler
            }
            return prevTravelers; // Do nothing if the max limit is reached
        });
    };


    // const handleAgeChange = (index, age) => {
    //     setTravelers((prev) =>
    //         prev.map((traveler, i) => (i === index ? { ...traveler, age: parseInt(age, 10) || 0 } : traveler))
    //     );
    // };

    const handleAgeChange = (index, selectedAge) => {
        const currentDate = new Date();
        const dob = new Date(
            currentDate.getFullYear() - selectedAge,
            currentDate.getMonth(),
            currentDate.getDate()
        );
    
        // Update the traveler's age and dob
        const updatedTravelers = [...travelers];
        updatedTravelers[index] = {
            ...updatedTravelers[index],
            age: selectedAge,
            dob: dob.toISOString(), // Store dob in ISO format
        };
        setTravelers(updatedTravelers);
    };
    

    const handleRemoveLastTraveler = () => {
        setTravelers((prevTravelers) => {
            if (prevTravelers.length > 0) {
                return prevTravelers.slice(0, -1); // Removes the last traveler
            }
            return prevTravelers; // No change if the array is already empty
        });
    };

    const calculateDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Difference in days
    };


    // useEffect(() => {
    //     const totalCount = Object.values(ageType).reduce((acc, curr) => acc + curr, 0);
    //     setTravelerCount(totalCount);
    //   }, [ageType]);
    useEffect(() => {
        setTravelerCount(travelers.length)
    }, [travelers])

    // const handleSubmitDetails = (e) => {
    //     e.preventDefault();
    //     const errors = validateDetails();
    //     if (Object.keys(errors).length === 0) {
    //         // Proceed with form submission
    //         setDetailPageData({ ...detailPageData, travelersCount: travelerCount, travellers:ageType })
    //         console.log({
    //             mobileNumber,
    //             pinCode,
    //             travelerCount
    //         });
    //         // setShowComponent1(false)
    //         navigate('/travel-plans')
    //     }
    //     setDetailErrors(errors);
    // };

    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        const errors = validateDetails();

        let localPlanType = planType;
        let localTripType = tripType;

        if (travelerCount > 1) {
            localPlanType = "FAMILY";
        } else if (travelerCount === 1 && purposeType === "Leisure/Business") {
            localPlanType = "SINGLE";
        } else if (purposeType === "Studies") {
            localPlanType = "STUDENT";
        }
    
        if (isMultiTrip === 'yes') {
            localTripType = 'MULTI';
        } else {
            localTripType = 'SINGLE';
        }

    
        if (Object.keys(errors).length === 0) {
            try {
                // Step 1: Make a GET request to validate the pin code
                console.log(pincode)
                const response = await axiosInstance.get('/finhaatmaster/getpincodecheckMethod/'+pincode);
                const { errorCode, errorMessage } = response.data;
                
    
                if (errorCode === 100) {
                    // If errorCode is 100, allow proceeding with the POST request logic
                    const requestData = {
                        destination: selectedSearchCountries,
                        trip_startdate: startDate,
                        trip_enddate: endDate,
                        proposal_Person_mobile: mobileNumber,
                        plantype: localPlanType,
                        multitripDuration: null,
                        triptype: localTripType,
                        duration: duration,
                        visatype: visaType,
                        traveller: travelers.map((traveler) => ({
                            proposal_Person_dob: traveler.dob,
                            pincode: pincode,
                            MedicalHistory: "no",
                            medical_Details: null,
                            medOther: null,
                            Suffering_date: null,
                            Medication: null,
                        })),
                    };
    
                    // Proceed with the POST request
                    const postResponse = await axiosInstance.post('/finhaat/saveDetails', requestData);
                    console.log('API Response:', postResponse.data);
    
                    const { registrationId } = postResponse.data;
                    console.log("RequestID: ", registrationId);
    
                    // Update state and navigate to the next page
                    setDetailPageData({
                        ...detailPageData,
                        travelersCount: travelerCount,
                        travellers: ageType,
                    });
                    navigate('/travel-plans', { state: { registrationId } });
                } else {
                    // Step 2: Show an alert if errorCode is not 100
                    alert(errorMessage || 'Invalid pin code. Please try again.');
                }
            } catch (error) {
                console.error('Error during API validation or submission:', error.response || error.message);
                alert('An error occurred while processing your request. Please try again.');
            }
        } else {
            setDetailErrors(errors); // Display validation errors
        }
    };
    
    

    // Handle Click Outside to close the dropdown
    const handleClickOutside = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
            setExpandedAdd(false)
        }
        console.log('clicked outside', dropDownRef.current, '\n', e.target);
    }

    useEffect(() => {
        if (isExpandedAdd) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isExpandedAdd, handleClickOutside])

    // return (
    //     <Card className={`detail-right-container component component2 ${!showComponent1 ? "component-shown" : "component-hidden"}`}>
    //         <VehicleDetailsCardHeader icon={<MdArrowBackIosNew size={20} />}
    //             title={'How many people are travelling?'}
    //             text={'Your answers help us find the best plans for you!'}
    //             setShowComponent1={setShowComponent1}
    //             iconImage={iconImage} />
    //         <hr className='devider' />
    //         <CardBody className='detail-card-body'>
    //             <Form onSubmit={handleSubmitDetails} >
    //                 <Row form>
    //                     <Col md={6}>
    //                         <FormGroup>
    //                             <Label for="mobileNumber" className='font-600'>Mobile No
    //                                 <span style={{ color: "red" }}> *</span>
    //                             </Label>
    //                             <div className="d-flex align-items-center" style={{ position: 'relative', color: '#334BC2' }}>
    //                                 {/* Input field with calendar icon */}
    //                                 <input
    //                                     type='number'
    //                                     name="mobileNumber"
    //                                     style={{ width: '100%' }}
    //                                     onChange={handleInputChange}
    //                                     value={mobileNumber}
    //                                     className="form-control w-full"
    //                                     id='mobileNumber'
    //                                     wrapperClassName="w-full"
    //                                     placeholder="Enter Mobile No"
    //                                 />
    //                             </div>
    //                             {detailErrors.mobileNumber && <small className="text-danger">{detailErrors.mobileNumber}</small>}
    //                         </FormGroup>
    //                     </Col>
    //                     <Col md={6}>
    //                         <FormGroup>
    //                             <Label for="pinCode" className='font-600'>Pin Code
    //                                 <span style={{ color: "red" }}> *</span>
    //                             </Label>
    //                             <div className="d-flex align-items-center" style={{ position: 'relative', color: '#334BC2' }}>
    //                                 <input
    //                                     type='number'
    //                                     name="pinCode"
    //                                     style={{ width: '100%' }}
    //                                     onChange={handleInputChange}
    //                                     value={pinCode}
    //                                     id="pinCode"
    //                                     className="form-control w-full" /* Responsive input */
    //                                     wrapperClassName="w-full"
    //                                     placeholder="Enter Pin Code"
    //                                 />
    //                             </div>
    //                             {detailErrors.pinCode && <small className="text-danger">{detailErrors.pinCode}</small>}
    //                         </FormGroup>
    //                     </Col>
    //                 </Row>
    //                 {/* <Row form>
    //                     <Col>
    //                         <FormGroup>
    //                             <div className="detail-info-container p-4">
    //                                 <p>Total traveller(s): {travelerCount || 1}</p>
    //                                 <div onClick={()=>setExpandedAdd((prev)=>!prev)} className="d-flex gap-2 align-items-center" style={{ color: '#334BC2', cursor: 'pointer' }}>
    //                                     <FiPlus /><p style={{ color: '#334BC2' }}>Add travellers</p>
    //                                 </div>
    //                             </div>
    //                         </FormGroup>
    //                     </Col>
    //                 </Row> */}
    //                 {/* {isExpandedAdd&&<Card  className='position-absolute' style={{height:'271px', width:'94%', overflowY:'scroll'}}>
    //                     <div ref={dropDownRef} className="d-flex flex-column justify-content-center p-4 w-100 position-absolute" style={{background:'#ffff'}}>
    //                         {Object.entries(ageType).map(([key, value], i) => (
    //                             <div key={i} className="d-flex flex-column">
    //                                 <div className="d-flex justify-content-between align-items-center">
    //                                     <div style={{ fontSize: '16px', fontWeight: '600' }}>{key}</div>
    //                                     <div className="d-flex gap-2">
    //                                         <div className='minus-container' onClick={() => handleDecrement(key)}>-</div>
    //                                         {value}
    //                                         <div className="plus-container" onClick={() => handleIncrement(key)}>+</div>
    //                                     </div>
    //                                 </div>
    //                                 <hr />
    //                             </div>
    //                         ))}
    //                     <div className='text-small' style={{width:'45%'}}>Please enter the age bracket of the insured(s) as on traveller start date.</div>
    //                     <hr />
    //                     <div className="traveler-count-add-button-container"><Button onClick={()=>setExpandedAdd((prev)=>!prev)} className={`traveler-count-add-button ${travelerCount?'background-active':'background-inactive'}`}>Add</Button></div>    
    //                     </div>
    //                 </Card>} */}
    //                 <Row form>
    //                     <Col>
    //                         <FormGroup>
    //                             <div className="detail-info-container p-4">
    //                                 <p>Total traveller(s): {travelers.length}</p>
    //                                 <div
    //                                     onClick={handleAddTraveler}
    //                                     className="d-flex gap-2 align-items-center"
    //                                     style={{ color: '#334BC2', cursor: 'pointer' }}
    //                                 >
    //                                     <FiPlus />
    //                                     <p style={{ color: '#334BC2' }}>Add travellers</p>
    //                                 </div>
    //                             </div>
    //                         </FormGroup>
    //                     </Col>
    //                 </Row>

    //                 {/* Render traveler dropdowns */}
    //                 {travelers.map((traveler, index) => (
    //                     <Row key={index} className="align-items-center mb-2">
    //                         <Col md={10}>
    //                             <select
    //                                 className="form-control"
    //                                 value={traveler.age}
    //                                 onChange={(e) => handleAgeChange(index, e.target.value)}
    //                             >
    //                                 {/* Populate dropdown options */}
    //                                 {Array.from(
    //                                     { length: index === 0 ? 82 : 100 },
    //                                     (_, i) => (index === 0 ? 18 : 0) + i
    //                                 ).map((age) => (
    //                                     <option key={age} value={age}>
    //                                         {age}
    //                                     </option>
    //                                 ))}
    //                             </select>
    //                         </Col>
    //                         <Col md={2}>
    //                             <Button color="danger" onClick={() => handleRemoveTraveler(index)}>
    //                                 Remove
    //                             </Button>
    //                         </Col>
    //                     </Row>
    //                 ))}




    //                 <Button onClick={handleProceedClick} className="proceed-button">Proceed</Button>
    //             </Form>
    //         </CardBody>
    //     </Card>
    // )
    return (
        <Card className={`detail-right-container component component2 ${!showComponent1 ? "component-shown" : "component-hidden"}`}>
            <VehicleDetailsCardHeader
                icon={<MdArrowBackIosNew size={20} />}
                title={'How many people are travelling?'}
                text={'Your answers help us find the best plans for you!'}
                setShowComponent1={setShowComponent1}
                iconImage={iconImage}
            />
            <hr className="devider" />
            <CardBody className="detail-card-body">
                <Form onSubmit={handleSubmitDetails}>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="mobileNumber" className="font-600">
                                    Mobile No <span className="text-danger"> *</span>
                                </Label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        onChange={handleInputChange}
                                        value={mobileNumber}
                                        className="form-control"
                                        id="mobileNumber"
                                        placeholder="Enter Mobile No"
                                    />
                                </div>
                                {detailErrors.mobileNumber && <small className="text-danger">{detailErrors.mobileNumber}</small>}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="pinCode" className="font-600">
                                    Pin Code <span className="text-danger"> *</span>
                                </Label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        name="pinCode"
                                        onChange={handlePinInputChange}
                                        value={pincode}
                                        id="pinCode"
                                        className="form-control"
                                        placeholder="Enter Pin Code"
                                    />
                                </div>
                                {detailErrors.pinCode && <small className="text-danger">{detailErrors.pinCode}</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <div className="detail-info-container">
                                    <p>Total traveller(s): {travelers.length}</p>
                                    <div className="add-travelers">

                                        {travelers.length > 0 && (
                                            <FiMinus
                                                className="remove-traveler-icon"
                                                onClick={handleRemoveLastTraveler}
                                            />
                                        )}
                                        <p>Add/Remove travelers</p>
                                        <FiPlus
                                            className="add-traveler-icon"
                                            onClick={handleAddTraveler}
                                        />
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="traveler-dropdowns">
                        {travelers.map((traveler, index) => (
                            <div key={index} className="traveler-item">
                                <select
                                    className="form-control traveler-select"
                                    value={traveler.age}
                                    onChange={(e) => handleAgeChange(index, e.target.value)}
                                // size={5}
                                >
                                    <option value="" disabled>Select Traveler {index + 1} Age</option> {/* Default option */}
                                    {Array.from(
                                        { length: index === 0 ? 82 : 100 },
                                        (_, i) => (index === 0 ? 18 : 0) + i
                                    ).map((age) => (
                                        <option key={age} value={age}>
                                            {age} years
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                    </div>
                    <Button onClick={handleSubmitDetails} className="proceed-button">
                        Proceed
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );

}
