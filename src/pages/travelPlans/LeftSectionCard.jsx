// LeftSectionCard.js
import React, { useContext, useState } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import { FaEdit, FaExclamationTriangle } from 'react-icons/fa';
import { FiEdit3 } from "react-icons/fi";
import EditPolicyDetailPopUp from './EditPolicyDetailPopUp';
import { FaChevronDown, FaTreeCity } from 'react-icons/fa6';
import { DetailContext } from '../../contexts/DetailPageProvider';

const LeftSectionCard = ({ title, text, classNameRightSec, isFetchedForResponsive,
    setIsFetchedForResponsive }) => {
    const [fuelType, setFuelType] = useState('');
    const [existingInsurer, setExistingInsurer] = useState('');
    const [isEditPolicyDetailPopUp, setEditPolicyPopUp] = useState(false)
    const [existingPolicyDate, setExistingPolicyDate] = useState('');
    const [previousNCB, setPreviousNCB] = useState('');
    const { vehicleDetails, policyDetails, detailPageData } = useContext(DetailContext);
    const { selectedCountries, startDate, endDate, purposeType, travelType, mobileNumber, mailId, travelersCount } = detailPageData;
    const { policyExpiryDate } = policyDetails;
    let startingDate = startDate ? startDate.toLocaleDateString('en-IN') : '';
    let endingDate = endDate ? endDate.toLocaleDateString('en-IN') : '';
    let travellingType = travelType ? travelType==='yes':''

    // const { variant } = vehicleDetails;
    return (
        <>
            {isEditPolicyDetailPopUp && <EditPolicyDetailPopUp
                isOpen={isEditPolicyDetailPopUp}
                fuelType={fuelType}
                setFuelType={setFuelType}
                existingPolicyDate={existingPolicyDate}
                previousNCB={previousNCB}
                setPreviousNCB={setPreviousNCB}
                setExistingPolicyDate={setExistingPolicyDate} handleClose={() => setEditPolicyPopUp(() => false)} />}
            <Card className={`custom-card ${classNameRightSec}`}>
                {/* Header Section */}
                <CardBody style={{ padding: '20px', position: 'relative' }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex gap-2">
                        <div className="custom-card-title-icon">
                            <FaTreeCity size={29} />
                        </div>
                        <div className="d-flex flex-column">
                            <h6 style={{ fontSize: "16px", fontWeight: '700' }}>{selectedCountries[0]||'Select a Country'}</h6>
                            <p className='title-text'>{selectedCountries.length?`+ ${selectedCountries.length-1} More`:'0 country selected'}</p>
                        </div>
                        </div>
                        <div onClick={() => setEditPolicyPopUp(true)} className="edit-icon">
                            <FiEdit3 />
                        </div>
                    </div>
                    <hr className='left-card-seperator' />
                </CardBody>
                {/* Body Section */}
                {!isFetchedForResponsive ? <><CardBody className='d-flex justify-content-center' style={{ padding: '20px', position: "relative", marginTop: "-45px" }}>
                    <div className="left-card-detail-container">
                        <div className="column-text">
                            <div className="column-text-title-info">
                                <h5>Total Member</h5>
                                <p>{travelersCount || '-'}</p>
                                <h5>Start Date</h5>
                                <p>{startingDate || '-'}</p>
                                <h5>Travel Type</h5>
                                <p>{travelType?'Multiple':'Once' || '-'}</p>
                                <h5>Mail ID</h5>
                                <p style={{textTransform:'lowercase'}}>{mailId || '-'}</p>
                            </div>
                        </div>
                        <div className="column-text">
                            <div className="column-text-title-info">
                                <h5>Travel Purpose</h5>
                                <p>{purposeType || '-'}</p>
                                <h5>End Date</h5>
                                <p>{endingDate || '-'}</p>
                                <h5>Mobile No.</h5>
                                <p>{mobileNumber || '- '}</p>
                            </div>
                        </div>
                    </div>

                </CardBody>

                    {/* Footer Section */}
                    {/* <div className='triangle-warning-icon'>
                        <FaExclamationTriangle style={{ color: '#E01A1A', marginRight: '10px' }} />
                        <span style={{ color: '#E01A1A', fontWeight: 'bold' }}>Inspection Required</span>
                    </div> */}
                    </> 
                    : 
                    <p className='right-show-more d-flex gap-2' onClick={() => setIsFetchedForResponsive(false)}>Show More <FaChevronDown /></p>
                }
            </Card>
        </>
    );
}

export default LeftSectionCard;
