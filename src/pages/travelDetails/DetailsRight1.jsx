import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import travelInsuranceIcon from '../../assets/insuranceIcon.png'
import VehicleDetailsCardHeader from './TravelDetailsCardHeader';
import DatePicker from "react-datepicker";
import { CiCalendarDate } from 'react-icons/ci';
import { DetailContext } from '../../contexts/DetailPageProvider';
import CountrySearch from './CountrySearch';
import CountrySelection from "./CountrySelection";
import { FiInfo } from 'react-icons/fi';

export default function DetailsRight1({ setIsCountries, setSelectedCountries, onCountrySelection, showComponent1, setShowComponent1, onProceed }) {

    // Validation Errors
    const [detailErrors, setDetailErrors] = useState({});

    const { detailPageData, setDetailPageData } = useContext(DetailContext);
    const { selectedCountries, startDate, endDate,travelTypeToggle, travelType, purposeType, visaType, visaToggle } = detailPageData;
    const [multiTripDuration, setMultiTripDuration] = useState(null);
    const [duration, setDuration] = useState();
    const [tripType, setTripType] = useState();
    const [maxTravelers, setMaxTravelers] = useState(0);
    const [isMultiTrip, setIsMultiTrip] = useState('no');
    
    // validations
  const validateDetails = () => {
    const errors = {};
    // if (!selectedCountries.length) errors.selectedCountries = 'Country selection is required';
    if (!purposeType) errors.purposeType = 'purpose is required';
    // if (!travelType) errors.travelType = 'Travel Type is required';
    
    if (travelTypeToggle !== 'yes') {
        if (!endDate) {
          errors.endDate = 'End Date is required';
        } else if (new Date(startDate) >= new Date(endDate)) {
          errors.endDate = 'End Date must be greater than Start Date';
        }
      }
    
    if (!startDate) errors.startDate = 'Start Date is required';
    return errors;
  };
  const HandleChangeStartDateInput = (date)=>{
    setDetailPageData({ ...detailPageData, startDate:date })
    setDetailErrors({...detailErrors, startDate:''})
}
const HandleChangeEndDateInput = (date)=>{
    setDetailPageData({ ...detailPageData, endDate:date })
    setDetailErrors({...detailErrors, endDate:''})
}

    const handleCountrySelection = (updatedCountries) => {
        // This function will be passed down to CountrySearch to update selectedCountries in the parent component
        console.log("Updated Selected Countries:", updatedCountries);
        setSelectedCountries(updatedCountries);  // Update selected countries in the parent
    };

    const [selectedSearchCountries, setSelectedSearchCountries] = useState([]);

    const handleSelectedSearchCountries = (updatedCountries) => {
        setSelectedSearchCountries(updatedCountries);
        console.log('Selected Countries in Parent:', updatedCountries);
        setDetailPageData({ ...detailPageData, selectedCountries: updatedCountries });
        //console.log(detailPageData);
        console.log(selectedSearchCountries, updatedCountries);
    };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    const errors = validateDetails();
    console.log(errors);
    console.log(multiTripDuration);
    
    if (Object.keys(errors).length === 0) {
      console.log("Proceed Hit ======================>",{
        "Destination:":selectedSearchCountries,
        "trip_startdate": startDate,
        "trip_enddate": endDate,
        "plantype":purposeType,
        
      });
      setShowComponent1(false)
    } 
      setDetailErrors(errors);

      setTripType(travelType === 'yes' ? 'MULTI' : 'SINGLE');
      setDuration(calculateDuration(startDate,endDate));
      
      
      const data = {
        selectedSearchCountries,
        startDate,
        endDate,
        purposeType,
        duration,
        isMultiTrip,
        maxTravelers,
        visaType,
    };
      onProceed(data);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Difference in days
};



    return (
        <Card className={`component component1 ${showComponent1 ? "component-shown" : "component-hidden"}`}>
            <VehicleDetailsCardHeader iconImage={travelInsuranceIcon}
                title={'Where are you travelling?'}
                text={'Your answers help us find the best plans for you!'} />
            <hr className='devider' />
            <CardBody className='detail-card-body'>
                <Form onSubmit={handleSubmitDetails}>
                    <Row form>
                        <Col >
                            {/* <FormGroup>
                                <CountrySearch countries={countries} />
                                {detailErrors.selectedCountries && <small className="text-danger">{detailErrors.selectedCountries}</small>}
                            </FormGroup> */}
                            {/* <Label>Select Countries</Label> */}
                            <CountrySearch
                                selectedSearchCountries={selectedSearchCountries}
                                setSelectedSearchCountries={handleSelectedSearchCountries}
                            />
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <div className="d-flex gap-2 flex-column">
                                <div className="detail-popular-texts-container">
                                    <h4>Popular Countries</h4>
                                    <span>(You can Select Multiple Countries)</span>
                                </div>
                                <CountrySelection />
                            </div>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="startDate" className="font-600">
                            Trip Start Date <span style={{ color: "red" }}> *</span>
                            </Label>
                            <div className="d-flex align-items-center" style={{ position: "relative", color: "#334BC2" }}>
                            <DatePicker
                                style={{ width: "100%" }}
                                selected={startDate}
                                onChange={HandleChangeStartDateInput}
                                className="form-control w-full"
                                id="startDate"
                                wrapperClassName="w-full"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Trip Start Date"
                            />
                            <span
                                className="input-icon"
                                onClick={() => document.querySelector("#startDate").focus()}
                                style={{ cursor: "pointer", position: "absolute" }}
                            >
                                <CiCalendarDate size={20} />
                            </span>
                            </div>
                            {detailErrors.startDate && <small className="text-danger">{detailErrors.startDate}</small>}
                        </FormGroup>
                        </Col>
                        <Col md={6}>
                        {travelTypeToggle != "yes" && (
                        <FormGroup>
                            <Label for="endDate" className="font-600">
                            Trip End Date <span style={{ color: "red" }}> *</span>
                            </Label>
                            <div className="d-flex align-items-center" style={{ position: "relative", color: "#334BC2" }}>
                            <DatePicker
                                style={{ width: "100%" }}
                                selected={endDate}
                                onChange={HandleChangeEndDateInput}
                                id="endDate"
                                name="endDate"
                                className="form-control w-full"
                                wrapperClassName="w-full"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Trip End Date"
                                disabled={travelType === "yes"} // Disable if multi-trip
                            />
                            <span
                                className="input-icon"
                                onClick={() => document.querySelector("#endDate").focus()}
                                style={{ cursor: "pointer", position: "absolute" }}
                            >
                                <CiCalendarDate size={20} />
                            </span>
                            </div>
                            {detailErrors.endDate && <small className="text-danger">{detailErrors.endDate}</small>}
                        </FormGroup>
                        )}
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                        <FormGroup>
                            <div className="detail-info-container">
                            <p>Travel Multiple times a Year? Get Cover all year around!</p>
                            <div className="d-flex gap-2">
                                <div className="info-icon-container">
                                <FiInfo />
                                </div>
                                <div className="d-flex gap-4 align-items-center">
                                <div className="toggle-switch">
                                    <Input
                                    type="checkbox"
                                    id="travelTypeToggle"
                                    checked={travelTypeToggle === "yes"}
                                    onChange={(e) => {
                                        setIsMultiTrip(e.target.checked ? "yes" : "no");
                                        setTripType(isMultiTrip);
                                        setDetailPageData({
                                        ...detailPageData,
                                        travelTypeToggle: isMultiTrip,
                                        travelType: isMultiTrip === "yes" ? "MULTI" : "SINGLE",
                                        endDate: isMultiTrip === "yes" ? null : endDate, // Clear endDate for multi-trip
                                        });
                                        if (isMultiTrip === "yes") setDuration(null); // Reset duration for multi-trip
                                    }}
                                    />
                                    <Label className="toggle-label" for="travelTypeToggle">
                                    <span className="toggle-inner">{travelTypeToggle === "yes" && "YES"}</span>
                                    <span className="toggle-switch-handle"></span>
                                    </Label>
                                </div>
                                </div>
                            </div>
                            </div>
                            {detailErrors.travelType && <small className="text-danger">{detailErrors.travelType}</small>}
                        </FormGroup>

                        {travelTypeToggle === "yes" && (
                            <FormGroup tag="fieldset">
                            <Label className="font-600">Choose Multi-Trip Duration</Label>
                            <div className="d-flex gap-4">
                                {["30", "45", "60"].map((value) => (
                                <FormGroup check key={value}>
                                    <Label check>
                                    <Input
                                        type="radio"
                                        name="multiTripDuration"
                                        value={value}
                                        checked={multiTripDuration === parseInt(value)}
                                        onChange={(e) => {
                                        const selectedDuration = parseInt(e.target.value);
                                        setMultiTripDuration(selectedDuration);
                                        setDuration(selectedDuration); // Update duration
                                        }}
                                    />
                                    {`${value} Days`}
                                    </Label>
                                </FormGroup>
                                ))}
                            </div>
                            </FormGroup>
                        )}
                        </Col>
                    </Row>

                    <Row form>
                        <Col>
                            <FormGroup>
                                <div className="detail-info-container">
                                    <p>Are you on an immigrant visa?</p>
                                    <div className="d-flex gap-2">
                                        <div className="info-icon-container">
                                            <FiInfo />
                                        </div>
                                        <div className="d-flex gap-4 align-items-center">
                                            <div className="toggle-switch">
                                                <Input
                                                    type="checkbox"
                                                    id="visaToggle"
                                                    checked={visaToggle === "yes"}
                                                    onChange={(e) => {
                                                        const isImmigrantVisa = e.target.checked ? "yes" : "no";
                                                        setDetailPageData({
                                                            ...detailPageData,
                                                            visaToggle: isImmigrantVisa,
                                                            visaType: isImmigrantVisa === "yes" ? "IMMIGRANT" : "NON_IMMIGRANT",
                                                        });
                                                        console.log(detailPageData.visaType);
                                                    }}
                                                />
                                                <Label className="toggle-label" for="visaToggle">
                                                    <span className="toggle-inner">{visaToggle === "yes" && "YES"}</span>
                                                    <span className="toggle-switch-handle"></span>
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                    {detailErrors.visaToggle && <small className="text-danger">{detailErrors.visaToggle}</small>}
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <FormGroup tag="fieldset">
                        <Label className='font-600'>Choose Purpose
                            <span style={{ color: "red" }}> *</span>
                        </Label>
                        <div className='d-flex gap-4'>
                            <FormGroup check>
                                <Label check inline>
                                    <Input
                                        type="radio"
                                        name="purposeType"
                                        value="Leisure/Business"
                                        checked={purposeType === 'Leisure/Business'}
                                        onChange={(e) => {
                                            setDetailPageData({ ...detailPageData, purposeType: e.target.value });
                                            setMaxTravelers(10);
                                            console.log(maxTravelers);
                                          }}                                    />
                                    Leisure/Business
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check inline>
                                    <Input
                                        type="radio"
                                        name="purposeType"
                                        value="Studies"
                                        checked={purposeType === 'Studies'}
                                        onChange={(e) => {setDetailPageData({ ...detailPageData, purposeType: e.target.value });
                                        setMaxTravelers(1);
                                        console.log(maxTravelers);
                                    }}
                                    />
                                    Studies
                                </Label>
                            </FormGroup>
                        </div>
                        {detailErrors.purposeType && <small className="text-danger text-start">{detailErrors.purposeType}</small>}

                    </FormGroup>
                    <Button className="proceed-button">Proceed</Button>
                </Form>
            </CardBody>
        </Card>
    )
}
