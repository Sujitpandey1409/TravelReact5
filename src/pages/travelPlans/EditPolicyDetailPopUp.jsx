import React, { useContext, useEffect, useRef, useState } from 'react';
import './EditPolicyDetailPopUp.css';
import { Button, Card, CardBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { IoMdClose } from 'react-icons/io';
import { DetailContext } from '../../contexts/DetailPageProvider';
import DatePicker from 'react-datepicker';
import { CiCalendarDate } from 'react-icons/ci';

export default function EditPolicyDetailPopUp({ handleClose, isOpen, setFuelType }) {
    const { vehicleDetails, setVehicleDetails, detailPageData, setDetailPageData } = useContext(DetailContext);
    const { startDate, endDate, purposeType, travelType, mobileNumber, mailId, travelersCount } = detailPageData;

    const [startDatePopUp, setstartDatePopUp] = useState();
    const [endDatePopUp, setendDatePopUp] = useState();
    const [purposeTypePopUp, setpurposeTypePopUp] = useState(purposeType);
    const [travelTypePopUp, setTravelTypePopUp] = useState(travelType);
    const [mobileNumberPopUp, setmobileNumberPopUp] = useState(mobileNumber);
    const [mailIdPopUp, setmailIdPopUp] = useState(mailId);
    const [travelersCountPopUp, settravelersCountPopUp] = useState(travelersCount);

    const popUpRef = useRef(null);

    // Validation errors
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setmailIdPopUp(value);
        } else {
            setmobileNumberPopUp(value);
        }
    };

    const validateDates = () => {
        let valid = true;
        let validationErrors = {};

        if (!startDatePopUp) {
            validationErrors.startDatePopUp = 'Start Date is required';
            valid = false;
        }

        if (!endDatePopUp) {
            validationErrors.endDatePopUp = 'End Date is required';
            valid = false;
        } else if (new Date(startDatePopUp) >= new Date(endDatePopUp)) {
            validationErrors.endDatePopUp = 'End Date must be greater than Start Date';
            valid = false;
        }

        if (!purposeTypePopUp) {
            validationErrors.purposeTypePopUp = 'Travelling Purpose is required';
            valid = false;
        }

        if (!travelTypePopUp) {
            validationErrors.travelTypePopUp = 'Travelling type is required';
            valid = false;
        }

        if (!mobileNumberPopUp) {
            validationErrors.mobileNumberPopUp = 'Mobile Number is required';
            valid = false;
        }

        if (!mailIdPopUp) {
            validationErrors.mailIdPopUp = 'Email ID is required';
            valid = false;
        }

        if (!travelersCountPopUp) {
            validationErrors.travelersCountPopUp = "Traveller's Count is required";
            valid = false;
        }

        setErrors(validationErrors);
        return valid;
    };

    const handleSubmitPolicyDetails = (e) => {
        e.preventDefault();

        if (!validateDates()) {
            console.log('validation errors')
            return;
        }

        setFuelType(startDatePopUp);
        setDetailPageData({
            ...detailPageData,
            startDate: startDatePopUp,
            endDate: endDatePopUp,
            purposeType: purposeTypePopUp,
            mobileNumber: mobileNumberPopUp,
            mailId: mailIdPopUp,
            travelersCount: travelersCountPopUp
        });
        setVehicleDetails({ ...vehicleDetails, variant: endDatePopUp });

        console.log({
            startDatePopUp,
            endDatePopUp,
            purposeTypePopUp,
            mobileNumberPopUp,
            mailIdPopUp,
            travelersCountPopUp,
        });
        handleClose();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popUpRef.current && !popUpRef.current.contains(e.target)) {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleClose]);

    return (
        <div className="edit-policy-detail-popUp-container">
            <Card>
                <div ref={popUpRef} className="edit-policy-detail-popUp">
                    <div className="padding-header">
                        <span onClick={handleClose} className="close-Button">
                            <IoMdClose size={21} />
                        </span>
                        <p style={{ fontWeight: '700', fontSize: '17px' }}>Edit Policy Detail</p>
                    </div>
                    <hr />
                    <CardBody>
                        <Form onSubmit={handleSubmitPolicyDetails}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">Start Date</Label>
                                        <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={startDatePopUp}
                                                onChange={(date) => setstartDatePopUp(date)}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="DD/MM/YYYY"
                                            />
                                            <span className="input-icon" style={{ cursor: 'pointer', position: 'absolute' }}>
                                                <CiCalendarDate size={20} />
                                            </span>
                                        </div>
                                        {errors.startDatePopUp && <p className="text-danger">{errors.startDatePopUp}</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">End Date</Label>
                                        <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={endDatePopUp}
                                                onChange={(date) => setendDatePopUp(date)}
                                                className="form-control"
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="DD/MM/YYYY"
                                            />
                                            <span className="input-icon" style={{ cursor: 'pointer', position: 'absolute' }}>
                                                <CiCalendarDate size={20} />
                                            </span>
                                        </div>
                                        {errors.endDatePopUp && <p className="text-danger">{errors.endDatePopUp}</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">Travel Purpose</Label>
                                        <Input
                                            type="select"
                                            value={purposeTypePopUp}
                                            onChange={(e) => setpurposeTypePopUp(e.target.value)}
                                        >
                                            <option value="">Select Purpose</option>
                                            <option value="Leisure/Business">Leisure/Business</option>
                                            <option value="Studies">Studies</option>
                                        </Input>
                                        {errors.purposeTypePopUp && <p className="text-danger">{errors.purposeTypePopUp}</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">Travel Type</Label>
                                        <Input
                                            type="select"
                                            value={travelTypePopUp}
                                            onChange={(e) => setTravelTypePopUp(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="Multiple">Multiple</option>
                                            <option value="Single">Single</option>
                                        </Input>
                                        {errors.travelTypePopUp && <p className="text-danger">{errors.travelTypePopUp}</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">Mobile Number</Label>
                                        <Input
                                            type="number"
                                            name="mobileNumber"
                                            value={mobileNumberPopUp}
                                            onChange={handleInputChange}
                                            placeholder="Enter Mobile No"
                                        />
                                        {errors.mobileNumberPopUp && <p className="text-danger">{errors.mobileNumberPopUp}</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="font-600">Email ID</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={mailIdPopUp}
                                            onChange={handleInputChange}
                                            placeholder="Enter Email ID"
                                        />
                                        {errors.mailIdPopUp && <p className="text-danger">{errors.mailIdPopUp}</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="plan-edit-policy-btn-container">
                                <Button onClick={handleClose} outline className="cancel-button">Cancel</Button>
                                <Button type="submit" className="proceed-button">Proceed</Button>
                            </div>
                        </Form>
                    </CardBody>
                </div>
            </Card>
        </div>
    );
}
