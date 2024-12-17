import React, { useState } from 'react'
import { Button, Collapse, Card, CardBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import VehicleVerificationCardHeader from './TravelVerificationCardHeader'
import './TravelVerificationsCardsAccordion.css'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { CiCalendarDate } from 'react-icons/ci';
import userIcon from '../../assets/mdi_user.svg'
import checkedIcon from '../../assets/lets-icons_check-fill.svg'

const dataTravellersNameAge = [{ age: '20', name: '' }, { age: '25', name: '' }, { age: '21', name: '' },]


export default function VehicleVerificationsCardsAccordion({ stepsActiveState,
    setStepsDoneState,
    stepsDoneState,
    toggleCKYCDetails,
    handleSubmitCKYCDetails,
    toggleVehicleDetails,
    handleSubmitVehicleDetails,
    toggleCustomerDetails,
    handleSubmitCustomerDetails,
    toggleNomineeDetails,
    handleSubmitNomineeDetails, sbmttActn, setSbmttActn }) {
    const navigate = useNavigate();
    // states for form CKYC fields
    const [policyType, setPolicyType] = useState('CKYC');
    const [ckyc, setCkyc] = useState('');
    const [panCard, setPanCard] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [otherId, setOtherId] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [passportNo, setPassportNo] = useState('');
    const [passportFileNo, setPassportFileNo] = useState('');

    // states for form Medical History fields
    const [healthIssue, setHealthIssue] = useState(false);

    // State for form Customer Detail fields
    const [FullName, setFullName] = useState('');
    const [cDateOfBirth, setCDateOfBirth] = useState('');
    const [Nationality, setNationality] = useState('Indian');
    const [cPassportNo, setCPassportNo] = useState('');
    const [visaType, setvisaType] = useState('Tourist');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [cAddress, setCAddress] = useState('')
    const [gender, setGender] = useState('');
    const [immigrant, setImmigrant] = useState(false);
    const [occupation, setOccupation] = useState('');
    const [email, setEmail] = useState('');
    const [crelationship, setCRelationship] = useState('');
    const [selfNominee, setSelfNominee] = useState(false);
    const [courseDuration, setCourseDuration] = useState();
    const [semestersCount, setSemestersCount] = useState();

    // Travellers Count will be fetched from backend 
    const [travellersCountNameData, setTravelerCountNameData] = useState(dataTravellersNameAge)
    const [selectedTraveller, setSelectedTraveller] = useState(0)
    const [doneTraveller, setDoneTraveller] = useState([])

    // State for form Nominee fields
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [nomineeAge, setNomineeAge] = useState('');
    const [relationship, setRelationship] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');


    // Define states for validation errors
    const [errorsKyc, setErrorsKyc] = useState({});
    const [errorsHealthDta, setErrorsHealthDta] = useState({});
    const [errorsCustomer, setErrorsCustomer] = useState({});
    const [errorsNominee, setErrorsNominee] = useState({});
    // const [sbmttActn, setSbmttActn] = useState(false)

    const countErrors = (errors) => {
        return Object.values(errors).filter((error) => error !== '').length;
    };
    const clearTravellersFields = () => {
        setHealthIssue(false)
        setFullName('')
        setCDateOfBirth('')
        setNationality('Indian')
        setCPassportNo('')
        setvisaType('Tourist')
        setMaritalStatus('')
        setCAddress('')
        setGender('')
        setImmigrant(false)
        setOccupation('')
        setEmail('')
        setCRelationship('')
        setSelfNominee(false)
        setCourseDuration('')
        setSemestersCount('')
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setNomineeAge('')
        setRelationship('')
        setPinCode('')
        setCity('')
        setErrorsKyc('')
        setErrorsHealthDta('')
        setErrorsCustomer('')
        setErrorsNominee('')
    }

    const validateFormCkyc = () => {
        const newErrors = {};

        if (!policyType) {
            newErrors.policyType = 'Please select a CKYC option';
        }

        if (policyType === 'CKYC' && !ckyc) {
            newErrors.ckyc = 'Please provide the ID for the selected "CKYC" option';
        }

        if (policyType === 'PAN' && !panCard) {
            newErrors.panCard = 'PAN Card number is required';
        } else if (policyType === 'PAN' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCard)) {
            newErrors.panCard = 'Please enter a valid PAN Card number';
        }

        if (policyType === 'Aadhar' && !aadharNumber) {
            newErrors.aadharNumber = 'Aadhar number is required';
        } else if (policyType === 'Aadhar' && !/^\d{12}$/.test(aadharNumber)) {
            newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
        }

        if (policyType === 'Passport') {
            if (!passportNo || passportNo.trim() === '') {
                newErrors.passportNo = 'Passport No is required';
            } else if (!/^[a-zA-Z0-9]+$/.test(passportNo)) {
                newErrors.passportNo = 'Passport No can only contain letters and numbers';
            } else if (passportNo.length < 8 || passportNo.length > 9) {
                newErrors.passportNo = 'Passport No must be 8–9 characters long';
            }

            if (!passportFileNo || passportFileNo.trim() === '') {
                newErrors.passportFileNo = 'Passport File No is required';
            } else if (!/^[a-zA-Z0-9]+$/.test(passportFileNo)) {
                newErrors.passportFileNo = 'Passport File No can only contain letters and numbers';
            } else if (passportFileNo.length < 5 || passportFileNo.length > 10) {
                newErrors.passportFileNo = 'Passport File No must be 5–10 characters long';
            }
        }

        if (policyType === 'Other' && !otherId) {
            newErrors.otherId = 'Please provide the ID for the selected "Other" option';
        }

        if (!dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }

        if (!agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms';
        }

        setErrorsKyc(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitCkyc = (e) => {
        e.preventDefault();
        if (validateFormCkyc()) {
            // If validation passes, proceed with form submission
            const formData = {
                policyType,
                panCard,
                aadharNumber,
                otherId,
                dateOfBirth,
                agreeTerms
            };
            handleSubmitCKYCDetails(formData);
        }
    };


    const validateFormVehicle = () => {
        const newErrors = {};
        if (!healthIssue) {
            newErrors.healthInfo = 'Health Status is required';
        }
        setErrorsHealthDta(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitVehicle = (e) => {
        e.preventDefault();
        if (validateFormVehicle()) {
            // If validation passes, proceed with form submission
            const formData = {
                healthIssue
            };
            handleSubmitVehicleDetails(formData);
        }
    };

    // Validation logic
    const validateFormCustomer = () => {
        const newErrors = {};

        if (!FullName) {
            newErrors.fullName = 'Full Name is required';
        }
        // if (!mobileNumber) {
        //     newErrors.mobileNumber = 'Mobile Number is required';
        // } else if (!/^\d{10}$/.test(mobileNumber)) {
        //     newErrors.mobileNumber = 'Mobile Number must be 10 digits';
        // }
        if (!cPassportNo || cPassportNo.trim() === '') {
            newErrors.cPassportNo = 'Passport Number is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(cPassportNo)) {
            newErrors.cPassportNo = 'Passport Number can only contain letters and numbers';
        } else if (cPassportNo.length < 8 || cPassportNo.length > 9) {
            newErrors.cPassportNo = 'Passport Number must be 8–9 characters long';
        }


        if (!Nationality) {
            // newErrors.Nationality = 'Nationality is required';
        }

        if (!visaType) {
            // newErrors.visaType = 'Visa Type is required';
        }

        if (!maritalStatus) {
            newErrors.maritalStatus = 'Marital Status is required';
        }

        if (!gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!cDateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }
        if (!cAddress) {
            newErrors.address = 'Address is required';
        }
        if (!occupation) {
            newErrors.occupation = 'Occupation is required'
        }
        if (!email) {
            newErrors.email = 'Email is required'
        }
        if (!crelationship) {
            // newErrors.relationship = 'Relationshoip with Applicant required'
        }
        if (!semestersCount || semestersCount === 'select') {
            newErrors.semestersCount = 'No of Semesters are required'
        }
        if (!courseDuration) {
            newErrors.courseDuration = 'Course duration is are required'
        }


        setErrorsCustomer(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitCustomer = (e) => {
        e.preventDefault();
        if (validateFormCustomer()) {
            const formData = {
                FullName,
                Nationality,
                cPassportNo,
                dateOfBirth,
                visaType,
                gender
            };
            handleSubmitCustomerDetails(formData); // Pass form data to parent handler
        }
    };

    // Validation logic
    const validateFormNominee = () => {
        const newErrors = {};

        if (!firstName) {
            newErrors.firstName = 'Nominee First Name is required';
        }
        if (!lastName) {
            newErrors.lastName = 'Nominee Last Name is required';
        }
        if (!pinCode) {
            newErrors.pinCode = 'Nominee Pin Code is required';
        }
        if (!middleName) {
            newErrors.middleName = 'Nominee Middle Name is required';
        }

        if (!nomineeAge) {
            newErrors.nomineeAge = 'Nominee Age is required';
        }
        if (nomineeAge < 18) {
            newErrors.nomineeAge = 'Nominee Age must be greater than qual to 18';
        }

        if (!relationship) {
            newErrors.relationship = 'Relationship is required';
        }
        if (!city) {
            newErrors.city = 'City is required';
        }

        setErrorsNominee(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle validation error while whole form submit
    const handleValidationErrors = () => {

        // Scroll to the specific element
        const scrollTo = (id) => {
            const element = document.querySelector(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        let errorFound = false;  // To stop after the first error is found

        // Switch case to check errors in sequence
        switch (true) {
            case countErrors(errorsNominee) > 0:
                scrollTo('#nominee');
                toggleNomineeDetails();
                errorFound = true;
                break;

            case countErrors(errorsHealthDta) > 0 || healthIssue.length == 0:
                scrollTo('#vehicleDetail');
                toggleVehicleDetails();
                errorFound = true;
                break;

            case countErrors(errorsKyc) > 0 || dateOfBirth.length == 0:
                scrollTo('#CKYC');
                toggleCKYCDetails();
                errorFound = true;
                break;

            case countErrors(errorsCustomer) > 0 || FullName.length == 0:
                scrollTo('#customer');
                toggleCustomerDetails();
                errorFound = true;
                break;

            default:
                break;
        }

        // If an error is found, stop further execution
        if (errorFound) {
            setSbmttActn(true) // to add blinking action
            return;
        }
    };

    const handleSubmitNominee = (e) => {
        e.preventDefault();
        if (validateFormNominee() && validateFormCkyc() && validateFormCustomer() && validateFormVehicle()) {
            const formData = {
                FullName,
                cDateOfBirth,
                Nationality,
                cPassportNo,
                visaType,
                maritalStatus,
                cAddress,
                gender,
                immigrant,
                occupation,
                email,
                crelationship,
                selfNominee,
                courseDuration,
                semestersCount,
                firstName,
                middleName,
                lastName,
                nomineeAge,
                relationship,
                pinCode,
            };
            //***************** * Selected Traveller Actions * *************

            setDoneTraveller((prev) =>
                prev.some((traveller) => traveller === selectedTraveller)
                    ? prev // If already exists, return the current state
                    : [...prev, selectedTraveller] // Otherwise, add the new traveller
            );

            setTravelerCountNameData((prev) =>
                prev.map((item, index) =>
                    index === selectedTraveller ? { ...item, name: FullName } : item
                )
            );
            selectedTraveller < travellersCountNameData.length && setSelectedTraveller((prev) => prev + 1)
            handleSubmitNomineeDetails(formData); // Pass form data to parent handler
            clearTravellersFields()
            setStepsDoneState({ step1: true, step2: false, step3: false, step4: false })
            console.log('doneTraveller=', doneTraveller, 'travellersCountNameData=', travellersCountNameData)
            doneTraveller.length === travellersCountNameData.length - 1 ? navigate('/consent') : toggleCustomerDetails() // Redirect to payment status page after submission successful of all travellers
        }
        handleValidationErrors()
    };




    return (
        <div className="container" style={{ background: '#F4F4F4', padding: '0', fontSize: '14px', display: 'grid' }}>
            {/* Accordion Field for CKYC */}
            <div style={{ margin: '15px 0' }} id='CKYC'>
                <div onClick={toggleCKYCDetails}>
                    {stepsActiveState !== 'step1' && (
                        <VehicleVerificationCardHeader
                            title={'CKYC of the Customer'}
                            downArrow={true}
                            done={stepsDoneState.step1}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step1'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'CKYC OF the Customer'} downArrow={false} />
                        <CardBody>
                            <Form onSubmit={handleSubmitCkyc}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup tag="fieldset">
                                            <Label className='font-600'>
                                                Enter CKYC Detail<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex gap-4">
                                                {['CKYC', 'PAN', 'Aadhar', 'Passport', 'Other'].map(option => (
                                                    <FormGroup check key={option}>
                                                        <Label check inline className='custom-label-radio'>
                                                            <Input
                                                                type="radio"
                                                                name="policyType"
                                                                value={option}
                                                                checked={policyType === option}
                                                                onChange={(e) => {
                                                                    setPolicyType(e.target.value);
                                                                    // Reset the related fields when option changes
                                                                    setPanCard('');
                                                                    setAadharNumber('');
                                                                    setPassportFileNo('')
                                                                    setPassportNo('')
                                                                    setOtherId('');
                                                                    setErrorsKyc({})
                                                                }}
                                                            />
                                                            {option}
                                                        </Label>
                                                    </FormGroup>
                                                ))}
                                            </div>
                                            {errorsKyc.policyType && <div className="text-danger">{errorsKyc.policyType}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {/* Dynamic Inputs based on CKYC Option */}
                                <Row form>
                                    {policyType === 'CKYC' && (
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="ckyc" className='font-600'>
                                                    CKYC<span style={{ color: "red" }}> *</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="ckyc"
                                                    placeholder='Enter CKYC Number'
                                                    id="ckyc"
                                                    value={ckyc}
                                                    invalid={errorsKyc.ckyc}
                                                    onChange={(e) => { setCkyc(e.target.value); setErrorsKyc({ ...errorsKyc, ckyc: '' }) }}
                                                    className={`custom-input form-control ${sbmttActn && (!ckyc || errorsKyc.ckyc) ? 'blink-error' : ''}`}
                                                />
                                                {errorsKyc.ckyc && <div className="text-danger">{errorsKyc.ckyc}</div>}
                                            </FormGroup>
                                        </Col>
                                    )}
                                    {policyType === 'PAN' && ( //pass file n
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="panCard" className='font-600'>
                                                    PAN Card<span style={{ color: "red" }}> *</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="panCard"
                                                    placeholder='Enter PAN Card Number'
                                                    id="panCard"
                                                    value={panCard}
                                                    invalid={errorsKyc.panCard}
                                                    onChange={(e) => { setPanCard(e.target.value); setErrorsKyc({ ...errorsKyc, panCard: '' }) }}
                                                    className={`custom-input form-control ${sbmttActn && (!panCard || errorsKyc.panCard) ? 'blink-error' : ''}`}
                                                />
                                                {errorsKyc.panCard && <div className="text-danger">{errorsKyc.panCard}</div>}
                                            </FormGroup>
                                        </Col>
                                    )}

                                    {policyType === 'Aadhar' && (
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="aadharNumber" className='font-600'>
                                                    Aadhar Number<span style={{ color: "red" }}> *</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="aadharNumber"
                                                    placeholder='Enter 12-digit Aadhar Number'
                                                    id="aadharNumber"
                                                    value={aadharNumber}
                                                    invalid={errorsKyc.aadharNumber}
                                                    onChange={(e) => { setAadharNumber(e.target.value); setErrorsKyc({ ...errorsKyc, aadharNumber: '' }) }}
                                                    className={`custom-input form-control ${sbmttActn && (!aadharNumber || errorsKyc.aadharNumber) ? 'blink-error' : ''}`}
                                                />
                                                {errorsKyc.aadharNumber && <div className="text-danger">{errorsKyc.aadharNumber}</div>}
                                            </FormGroup>
                                        </Col>
                                    )}
                                    {policyType === 'Passport' && (
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="passportNo" className='font-600'>
                                                        Passport No<span style={{ color: "red" }}> *</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="passportNo"
                                                        placeholder='Enter Passport Number'
                                                        id="passportNo"
                                                        value={passportNo}
                                                        invalid={errorsKyc.passportNo}
                                                        onChange={(e) => { setPassportNo(e.target.value); setErrorsKyc({ ...errorsKyc, passportNo: '' }) }}
                                                        className={`custom-input form-control ${sbmttActn && (!passportNo || errorsKyc.passportNo) ? 'blink-error' : ''}`}
                                                    />
                                                    {errorsKyc.passportNo && <div className="text-danger">{errorsKyc.passportNo}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="passportFileNo" className='font-600'>
                                                        passport File No<span style={{ color: "red" }}> *</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        name="passportFileNo"
                                                        placeholder='Enter Passport File Number'
                                                        id="passportFileNo"
                                                        value={passportFileNo}
                                                        invalid={errorsKyc.passportFileNo}
                                                        onChange={(e) => { setCkyc(e.target.value); setErrorsKyc({ ...errorsKyc, passportFileNo: '' }) }}
                                                        className={`custom-input form-control ${sbmttActn && (!passportFileNo || errorsKyc.passportFileNo) ? 'blink-error' : ''}`}
                                                    />
                                                    {errorsKyc.passportFileNo && <div className="text-danger">{errorsKyc.passportFileNo}</div>}
                                                </FormGroup>
                                            </Col>
                                        </Row>)}

                                    {policyType === 'Other' && (
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="otherId" className='font-600'>
                                                    Other ID<span style={{ color: "red" }}> *</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    name="otherId"
                                                    placeholder='Enter ID for Other Option'
                                                    id="otherId"
                                                    value={otherId}
                                                    invalid={errorsKyc.otherId}
                                                    onChange={(e) => { setOtherId(e.target.value); setErrorsKyc({ ...errorsKyc, otherId: '' }) }}
                                                    className={`custom-input form-control ${sbmttActn && (!otherId || errorsKyc.otherId) ? 'blink-error' : ''}`}
                                                />
                                                {errorsKyc.otherId && <div className="text-danger">{errorsKyc.otherId}</div>}
                                            </FormGroup>
                                        </Col>
                                    )}

                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="dateOfBirth" className='font-600'>
                                                Date of Birth<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                                {/* Input field with calendar icon */}
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    selected={dateOfBirth}
                                                    id='dateOfBirth'
                                                    wrapperClassName="w-full"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DD/MM/YYYY"
                                                    onChange={(date) => setDateOfBirth(date)}
                                                    maxDate={new Date()}
                                                    className={`form-control w-full custom-input form-control ${sbmttActn && (!dateOfBirth || errorsKyc.dateOfBirth) ? 'blink-error' : ''}`}
                                                />
                                                <span
                                                    className="input-icon"
                                                    onClick={() => document.querySelector('#dateOfBirth').focus()}
                                                    style={{ cursor: 'pointer', position: 'absolute' }}
                                                >
                                                    <CiCalendarDate size={20} />
                                                </span>
                                            </div>
                                            {/* <Input
                                                type="date"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            /> */}
                                            {errorsKyc.dateOfBirth && <div className="text-danger">{errorsKyc.dateOfBirth}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row form>
                                    <Col md={6}>
                                        <FormGroup check>
                                            <Input
                                                type="checkbox"
                                                name="agree"
                                                id="agree"
                                                checked={agreeTerms}
                                                onChange={(e) => { setAgreeTerms(e.target.checked); setErrorsKyc({ ...errorsKyc, agreeTerms: '' }) }}
                                            />
                                            <label style={{ fontSize: '12px', color: '#0E233C80', margin: '4px' }} htmlFor="agree">
                                                By continuing I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
                                            </label>
                                            {errorsKyc.agreeTerms && <div className="text-danger">{errorsKyc.agreeTerms}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Button type="submit" className="proceed-button">Proceed</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Customer Details */}
            <div style={{ margin: '15px 0' }} id='customer'>
                <div onClick={toggleCustomerDetails}>
                    {stepsActiveState !== 'step2' && (
                        <VehicleVerificationCardHeader
                            title={'Customer Detail'}
                            downArrow={true}
                            done={stepsDoneState.step2}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step2'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Customer Detail'} downArrow={false} />
                        <div className="d-flex gap-3 flex-wrap" style={{ padding: '0 16px', color: '#334BC2' }}>
                            {travellersCountNameData && travellersCountNameData.map((el, i) => {
                                return (<div onClick={() => {
                                    // Logic to handle on clicking/swiching any traveller tab
                                    setSelectedTraveller(i); clearTravellersFields();
                                    if (doneTraveller.includes(i)) {
                                        setStepsDoneState({ step1: true, step2: true, step3: true, step4: true })
                                    }
                                    else if (doneTraveller.includes(0)) {
                                        setStepsDoneState({ step1: true, step2: false, step3: false, step4: false })
                                    }
                                    else {
                                        if (validateFormCkyc()) {
                                            setStepsDoneState({ step1: true, step2: false, step3: false, step4: false })
                                        }
                                        else {
                                            setStepsDoneState({ step1: false, step2: false, step3: false, step4: false })
                                        }
                                    }
                                }}
                                    className="travellers-bar-card p-2"
                                    style={{ border: selectedTraveller === i ? '1px solid #334BC2' : '' }}>
                                    {doneTraveller.includes(i) ? <img src={checkedIcon} alt="travellerIcon" /> : <img src={userIcon} alt="travellerIcon" />}
                                    <h6 style={{ fontSize: '16px', fontWeight: '600', margin: '0' }}>{el.name ? el.name : `Traveller ${i + 1}`} {`(${el.age} Yrs)`}</h6>
                                    {doneTraveller.includes(i) && <h4 className='edit'>Edit</h4>}
                                </div>)
                            })}
                        </div>
                        <CardBody>
                            <Form onSubmit={handleSubmitCustomer}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstName" className='font-600'>
                                                enter Full Name
                                            </Label>
                                            <Input
                                                placeholder='Full Name'
                                                type="text"
                                                id="fullName"
                                                value={FullName}
                                                onChange={(e) => { setFullName(e.target.value); setErrorsCustomer({ ...errorsCustomer, fullName: '' }) }}
                                                invalid={errorsCustomer.fullName}
                                                className={`form-control ${sbmttActn && (errorsCustomer.fullName || !FullName) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.fullName && <div className="text-danger">{errorsCustomer.fullName}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup tag="fieldset">
                                            <Label className='font-600'>
                                                Select Gender<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex gap-4">
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="Male"
                                                            checked={gender === 'Male'}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        />
                                                        Male
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="Female"
                                                            checked={gender === 'Female'}
                                                            onChange={(e) => { setGender(e.target.value); setErrorsCustomer({ ...errorsCustomer, gender: '' }) }}
                                                        />
                                                        Female
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="Other"
                                                            checked={gender === 'Other'}
                                                            onChange={(e) => { setGender(e.target.value); setErrorsCustomer({ ...errorsCustomer, gender: '' }) }}
                                                        />
                                                        Other
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                            {errorsCustomer.gender && <div className="text-danger">{errorsCustomer.gender}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="dateOfBirth" className='font-600'>
                                                Date of Birth<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                                {/* Input field with calendar icon */}
                                                <DatePicker
                                                    style={{ width: '100%' }}
                                                    selected={cDateOfBirth}
                                                    id='cdateOfBirth'
                                                    wrapperClassName="w-full"
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="DD/MM/YYYY"
                                                    onChange={(date) => setCDateOfBirth(date)}
                                                    maxDate={new Date()}
                                                    className={`form-control w-full custom-input form-control ${sbmttActn && (!cDateOfBirth || errorsCustomer.dateOfBirth) ? 'blink-error' : ''}`}
                                                />
                                                <span
                                                    className="input-icon"
                                                    onClick={() => document.querySelector('#cdateOfBirth').focus()}
                                                    style={{ cursor: 'pointer', position: 'absolute' }}
                                                >
                                                    <CiCalendarDate size={20} />
                                                </span>
                                            </div>
                                            {/* <Input
                                                type="date"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            /> */}
                                            {errorsCustomer.dateOfBirth && <div className="text-danger">{errorsCustomer.dateOfBirth}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Nationality" className='font-600'>
                                                Nationality<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Pin Code'
                                                type="select"
                                                id="Nationality"
                                                value={Nationality}
                                                onChange={(e) => { setNationality(e.target.value); setErrorsCustomer({ ...errorsCustomer, Nationality: '' }) }}
                                                invalid={errorsCustomer.Nationality}
                                                className={`form-control ${sbmttActn && (errorsCustomer.Nationality || !Nationality) ? 'blink-error' : ''}`}
                                            >
                                                <option value="Indian">Indian</option>
                                                <option value="Japanese">Japanese</option>
                                            </Input>
                                            {errorsCustomer.Nationality && <div className="text-danger">{errorsCustomer.Nationality}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="address" className='font-600'>
                                                passport No
                                            </Label>
                                            <Input
                                                placeholder='Enter Passport No/'
                                                type="text"
                                                id="cPassportNo"
                                                value={cPassportNo}
                                                onChange={(e) => { setCPassportNo(e.target.value); setErrorsCustomer({ ...errorsCustomer, cPassportNo: '' }) }}
                                                invalid={errorsCustomer.cPassportNo}
                                                className={`form-control ${sbmttActn && (errorsCustomer.cPassportNo || !cPassportNo) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.cPassportNo && <div className="text-danger">{errorsCustomer.cPassportNo}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="state" className='font-600'>
                                                Select Visa Type<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Tourist/Visitor Visa'
                                                type="select"
                                                id="state"
                                                value={visaType}
                                                onChange={(e) => { setvisaType(e.target.value); setErrorsCustomer({ ...errorsCustomer, visaType: '' }) }}
                                                invalid={errorsCustomer.state}
                                                className={`form-control ${sbmttActn && (errorsCustomer.visaType || !visaType) ? 'blink-error' : ''}`}
                                            >
                                                <option value="Tourist">Tourist</option>
                                                <option value="Visitor">Visitor</option>
                                            </Input>
                                            {errorsCustomer.visaType && <div className="text-danger">{errorsCustomer.visaType}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="maritalStatus" className='font-600'>
                                                Marital Status<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Marital Status'
                                                type="text"
                                                id="maritalStatus"
                                                value={maritalStatus}
                                                onChange={(e) => { setMaritalStatus(e.target.value); setErrorsCustomer({ ...errorsCustomer, maritalStatus: '' }) }}
                                                invalid={errorsCustomer.maritalStatus}
                                                className={`form-control ${sbmttActn && (errorsCustomer.maritalStatus || !maritalStatus) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.maritalStatus && <div className="text-danger">{errorsCustomer.maritalStatus}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="address" className='font-600'>
                                                Address<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Address'
                                                type="text"
                                                id="address"
                                                value={cAddress}
                                                onChange={(e) => { setCAddress(e.target.value); setErrorsCustomer({ ...errorsCustomer, cAddress: '' }) }}
                                                invalid={errorsCustomer.address}
                                                className={`form-control ${sbmttActn && (errorsCustomer.address || !cAddress) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.cAddress && <div className="text-danger">{errorsCustomer.cAddress}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="occupation" className='font-600'>
                                                Occupation<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Occupation'
                                                type="text"
                                                id="occupation"
                                                value={occupation}
                                                onChange={(e) => { setOccupation(e.target.value); setErrorsCustomer({ ...errorsCustomer, occupation: '' }) }}
                                                invalid={errorsCustomer.occupation}
                                                className={`form-control ${sbmttActn && (errorsCustomer.occupation || !occupation) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.occupation && <div className="text-danger">{errorsCustomer.occupation}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email" className='font-600'>
                                                Email<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Email'
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value); setErrorsCustomer({ ...errorsCustomer, email: '' }) }}
                                                invalid={errorsCustomer.email}
                                                className={`form-control ${sbmttActn && (errorsCustomer.email || !email) ? 'blink-error' : ''}`}
                                            />
                                            {errorsCustomer.email && <div className="text-danger">{errorsCustomer.email}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="courseDuration" className='font-600'>
                                                Course Duration<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Enter Course Duration'
                                                type="number"
                                                id="courseDuration"
                                                value={courseDuration}
                                                onChange={(e) => { setCourseDuration(e.target.value); setErrorsCustomer({ ...errorsCustomer, courseDuration: '' }) }}
                                                invalid={errorsCustomer.courseDuration}
                                                className={`form-control ${sbmttActn && (errorsCustomer.courseDuration || !courseDuration) ? 'blink-error' : ''}`}
                                            >
                                                {/* <option value="Indian">Indian</option>
                                                <option value="Japanese">Japanese</option> */}
                                            </Input>
                                            {errorsCustomer.courseDuration && <div className="text-danger">{errorsCustomer.courseDuration}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="semestersCount" className='font-600'>
                                                No of Semesters<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Pin Code'
                                                type="select"
                                                id="semestersCount"
                                                value={semestersCount}
                                                onChange={(e) => { setSemestersCount(e.target.value); setErrorsCustomer({ ...errorsCustomer, semestersCount: '' }) }}
                                                invalid={errorsCustomer.semestersCount}
                                                className={`form-control ${sbmttActn && (errorsCustomer.semestersCount || !semestersCount) ? 'blink-error' : ''}`}
                                            >
                                                <option value="select">Select</option>
                                                <option value="first">1</option>
                                                <option value="second">2</option>
                                                <option value="third">3</option>
                                                <option value="fourth">4</option>
                                            </Input>
                                            {errorsCustomer.semestersCount && <div className="text-danger">{errorsCustomer.semestersCount}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="relationship" className='font-600'>
                                                Relationship With Applicant<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Relationship'
                                                type="select"
                                                id="relationship"
                                                value={relationship}
                                                onChange={(e) => { setRelationship(e.target.value); setErrorsCustomer({ ...errorsCustomer, relationship: '' }) }}
                                                invalid={errorsCustomer.Nationality}
                                                className={`form-control ${sbmttActn && (errorsCustomer.relationship || !relationship) ? 'blink-error' : ''}`}
                                            >
                                                <option value="Self">Self</option>
                                                <option value="Spouse">Spouse</option>
                                            </Input>
                                            {errorsCustomer.nationality && <div className="text-danger">{errorsCustomer.nationality}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup tag="fieldset">
                                            <Label className='font-600'>
                                                Select if immigrant<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex gap-4">
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="immigrant"
                                                            value={true}
                                                            checked={immigrant}
                                                            onChange={(e) => setImmigrant(true)}
                                                        />
                                                        Yes
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="immigrant"
                                                            value={false}
                                                            checked={!immigrant}
                                                            onChange={(e) => { setImmigrant(false); setErrorsCustomer({ ...errorsCustomer, immigrant: '' }) }}
                                                        />
                                                        No
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup tag="fieldset">
                                            <Label className='font-600'>
                                                Select self as nominee<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex gap-4">
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="NomineeSelf"
                                                            value={true}
                                                            checked={selfNominee}
                                                            onChange={(e) => setSelfNominee(true)}
                                                        />
                                                        Yes
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="NomineeSelf"
                                                            value={false}
                                                            checked={!selfNominee}
                                                            onChange={(e) => { setSelfNominee(false); setErrorsCustomer({ ...errorsCustomer, immigrant: '' }) }}
                                                        />
                                                        No
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="submit" className="proceed-button">Proceed</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Health */}
            <div style={{ margin: '15px 0' }} id='vehicleDetail'>
                <div onClick={toggleVehicleDetails}>
                    {stepsActiveState !== 'step3' && (
                        <VehicleVerificationCardHeader
                            title={'Medical History'}
                            downArrow={true}
                            done={stepsDoneState.step3}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step3'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Medical History'} downArrow={false} />
                        <CardBody style={{ position: 'relative' }}>
                            <hr />
                            <div className="title-medicle-history">Does any of the traveller(s) have pre-existing medical conditions?</div>
                            <div className="title-medicle-text">Select YES if any of the traveller(s) have health issues for which they need to take regular medication as part of the long-term treatment.</div>
                            <Form onSubmit={handleSubmitVehicle}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup tag="fieldset">
                                            <Label className='font-600 mt-4'>
                                                Does Patient have health issues?<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <div className="d-flex gap-4">
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value='false'
                                                            checked={healthIssue === 'false'}
                                                            onChange={(e) => { setHealthIssue('false'); setErrorsHealthDta({ ...errorsHealthDta, healthInfo: '' }) }}
                                                        />
                                                        No
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check inline className='custom-label-radio'>
                                                        <Input
                                                            type="radio"
                                                            name="gender"
                                                            value="true"
                                                            checked={healthIssue === 'true'}
                                                            onChange={(e) => { setHealthIssue('true'); setErrorsHealthDta({ ...errorsHealthDta, healthInfo: '' }) }}
                                                        />
                                                        Yes
                                                    </Label>
                                                </FormGroup>
                                            </div>
                                            {errorsHealthDta.healthInfo && <div className="text-danger">{errorsHealthDta.healthInfo}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="submit" className="proceed-button">Proceed</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Nominee Detail */}
            <div style={{ margin: '15px 0' }} id='nominee'>
                <div onClick={toggleNomineeDetails}>
                    {stepsActiveState !== 'step4' && (
                        <VehicleVerificationCardHeader
                            title={'Nominee Detail'}
                            downArrow={true}
                            done={stepsDoneState.step4}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step4'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Nominee of the Customer'} downArrow={false} />
                        <CardBody>
                            <Form onSubmit={handleSubmitNominee}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstName" className='font-600'>
                                                First Name
                                            </Label>
                                            <Input
                                                placeholder='First Name'
                                                type="text"
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => { setFirstName(e.target.value); setErrorsNominee({ ...errorsNominee, firstName: '' }) }}
                                                invalid={errorsNominee.firstName}
                                                className={`form-control ${sbmttActn && (errorsNominee.firstName || !firstName) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.firstName && <div className="text-danger">{errorsNominee.firstName}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="middleName" className='font-600'>
                                                Middle Name<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Middle Name'
                                                type="text"
                                                id="middleName"
                                                value={middleName}
                                                onChange={(e) => { setMiddleName(e.target.value); setErrorsNominee({ ...errorsNominee, middleName: '' }) }}
                                                invalid={errorsNominee.middleName}
                                                className={`form-control ${sbmttActn && (errorsNominee.middlename || !middleName) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.middleName && <div className="text-danger">{errorsNominee.middleName}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="lastName" className='font-600'>
                                                Last Name
                                            </Label>
                                            <Input
                                                placeholder='Last Name'
                                                type="text"
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => { setLastName(e.target.value); setErrorsNominee({ ...errorsNominee, lastName: '' }) }}
                                                invalid={errorsNominee.lastName}
                                                className={`form-control ${sbmttActn && (errorsNominee.lastName || !lastName) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.lastName && <div className="text-danger">{errorsNominee.lastName}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="pinCode" className='font-600'>
                                                Pin Code<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Pin Code'
                                                type="number"
                                                id="pinCode"
                                                value={pinCode}
                                                onChange={(e) => { setPinCode(e.target.value); setErrorsNominee({ ...errorsNominee, pinCode: '' }) }}
                                                invalid={errorsNominee.pinCode}
                                                className={`form-control ${sbmttActn && (errorsNominee.lastName || !lastName) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.lastName && <div className="text-danger">{errorsNominee.lastName}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label for="city" className='font-600'>
                                                City<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='City'
                                                type="text"
                                                id="city"
                                                value={city}
                                                onChange={(e) => { setCity(e.target.value); setErrorsNominee({ ...errorsNominee, city: '' }) }}
                                                invalid={errorsNominee.city}
                                                className={`form-control ${sbmttActn && (errorsNominee.city || !city) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.city && <div className="text-danger">{errorsNominee.city}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="nomineeAge" className='font-600'>
                                                Nominee Age<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Nominee Age'
                                                type="number"
                                                id="nomineeAge"
                                                value={nomineeAge}
                                                onChange={(e) => { setNomineeAge(e.target.value); setErrorsNominee({ ...errorsNominee, nomineeAge: '' }) }}
                                                invalid={errorsNominee.nomineeAge}
                                                className={`form-control ${sbmttActn && (errorsNominee.nomineeAge || !nomineeAge) ? 'blink-error' : ''}`}
                                            />
                                            {errorsNominee.nomineeAge && <div className="text-danger">{errorsNominee.nomineeAge}</div>}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="relationship" className='font-600'>
                                                Relationship<span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                placeholder='Relationship'
                                                type="text"
                                                id="relationship"
                                                value={relationship}
                                                onChange={(e) => { setRelationship(e.target.value); setErrorsNominee({ ...errorsNominee, relationship: '' }) }}
                                                invalid={errorsNominee.relationship}
                                                className={`form-control ${sbmttActn && (errorsNominee.relationship || !relationship) ? 'blink-error' : ''}`}

                                            />
                                            {errorsNominee.relationship && <div className="text-danger">{errorsNominee.relationship}</div>}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="submit" className="proceed-button">Proceed</Button>
                            </Form>
                        </CardBody>
                    </Card>

                </Collapse>
            </div>
        </div>
    )
}
