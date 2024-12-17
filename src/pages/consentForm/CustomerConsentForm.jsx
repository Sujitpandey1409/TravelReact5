import React from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import './CustomerConsentForm.css'
import consentIconTitle from '../../assets/consent_finhaat_logo.png'
import { useNavigate } from 'react-router-dom';
import LeftSectionCard from '../travelPlans/LeftSectionCard';
// import RightSectionCard from '../travelPlans/RightSectionCard';


const TravelInfoCard = () => {
    const navigate = useNavigate()
    const sectionStyle = {
        padding: '10px', // Inner padding for each block
        border: '1px dotted #cfcfcf', // Dotted border for each block
        borderRadius: '0', // No rounded corners for blocks to align seamlessly
        textAlign: 'left',
        margin: '0', // Remove gaps
    };

    const handleApprove = () => {
        navigate('/payment-status')
    }
    const handleReject = () => {
        navigate(-1)
    }

    return (
        <div className="d-flex flex-column mt-5 pt-5 w-100" style={{ minHeight: "90vh", background: "#F5F6F6", paddingLeft: '65px', }}>
            <div className="d-flex flex-column p-4" style={{
                background: '#FFF',
                boxShadow: '130px 10px 50px 20px rgba(0, 0, 0, 0.05)',
                width: '876px',
                borderRadius: '15px'
            }}>
                <div className="d-flex gap-2 align-items-center">
                    <div className="consent-header-icon-container"><img src={consentIconTitle} alt="imageIcon" /></div>
                    <div className="consent-title-text">Customer Consent form</div>
                </div>
                <hr />

                {/* Field for Customer Details */}
                <div className="d-flex flex-column gap-2 mb-4">
                    <div className="consent-detail-title-text">Customer Details</div>
                    <Card
                        style={{
                            borderRadius: '12px', // Rounded corners for the card itself
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            margin: 'auto',
                        }}
                    >
                        {/* Header */}
                        <CardHeader
                            className='consent-card-header-title'
                            style={{ background: 'linear-gradient(to right, #ffffff -11%, #b7a3765c 71%, #ffffff 95%)', }}
                        >
                            Shivani Shrivastava (Traveller-1)
                        </CardHeader>

                        {/* Body */}
                        <CardBody style={{ padding: '0', fontSize: '14px' }}>
                            <Row style={{ margin: '0', marginTop: '51px' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Full Name</p>
                                        <h6 className='consent-box-text'>Shivani</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Gender</p>
                                        <h6 className='consent-box-text'>Female</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Date of Birth</p>
                                        <h6 className='consent-box-text'>13 Oct 1998</h6>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: '0' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Passport No</p>
                                        <h6 className='consent-box-text'>IVIP24343775</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Nationality</p>
                                        <h6 className='consent-box-text'>Indian</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Visa Type</p>
                                        <h6 className='consent-box-text'>Tourist/Visitor Visa</h6>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>

                {/* Field for travel details */}
                <div className="d-flex flex-column gap-2 mb-4">
                    <div className="consent-detail-title-text">Travel Details</div>
                    <Card
                        style={{
                            borderRadius: '12px', // Rounded corners for the card itself
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            margin: 'auto',
                        }}
                    >
                        {/* Header */}
                        <CardHeader
                            className='consent-card-header-title'
                            style={{ background: 'linear-gradient(to right, #ffffff -11%, #b3c6f7 71%, #ffffff 95%)', }}
                        >
                            Shivani Shrivastava
                        </CardHeader>

                        {/* Body */}
                        <CardBody style={{ padding: '0', fontSize: '14px' }}>
                            <Row style={{ margin: '0', marginTop: '51px' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Country</p>
                                        <h6 className='consent-box-text'>Thailand</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Purpose</p>
                                        <h6 className='consent-box-text'>Leisure/Business</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Email ID</p>
                                        <h6 className='consent-box-text'>shivanishrivastava480@gmail.com</h6>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: '0' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip Start Date</p>
                                        <h6 className='consent-box-text'>22 Sep 2024</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip End Date</p>
                                        <h6 className='consent-box-text'>22 Oct 2024</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip Duration</p>
                                        <h6 className='consent-box-text'>1 Month</h6>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: '0' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Mobile No.</p>
                                        <h6 className='consent-box-text'>91-9205726239</h6>
                                    </div>
                                </Col>
                                <Col style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>No. of Traveller</p>
                                        <h6 className='consent-box-text'>2</h6>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ margin: '0' }}>
                                <Col style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-text'>Does any of the traveller(s) have pre-existing medical conditions?</p>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Yes</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>

                {/* Field for nominee details */}
                <div className="d-flex flex-column gap-2 mb-4">
                    <div className="consent-detail-title-text">Nominee Details</div>
                    <Card
                        style={{
                            borderRadius: '12px', // Rounded corners for the card itself
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            width: '100%',
                            margin: 'auto',
                        }}
                    >
                        {/* Header */}
                        <CardHeader
                            className='consent-card-header-title'
                            style={{ background: 'linear-gradient(to right, #ffffff -11%, #b7a3765c 71%, #ffffff 95%)', }}
                        >
                            Shivani Shrivastava
                        </CardHeader>

                        {/* Body */}
                        <CardBody style={{ padding: '0', fontSize: '14px' }}>
                            <Row style={{ margin: '0', marginTop: '51px' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Country</p>
                                        <h6 className='consent-box-text'>Thailand</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Purpose</p>
                                        <h6 className='consent-box-text'>Leisure/Business</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Email ID</p>
                                        <h6 className='consent-box-text'>shivanishrivastava480@gmail.com</h6>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: '0' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip Start Date</p>
                                        <h6 className='consent-box-text'>22 Sep 2024</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip End Date</p>
                                        <h6 className='consent-box-text'>22 Oct 2024</h6>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Trip Duration</p>
                                        <h6 className='consent-box-text'>1 Month</h6>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ margin: '0' }}>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Mobile No.</p>
                                        <h6 className='consent-box-text'>91-9205726239</h6>
                                    </div>
                                </Col>
                                <Col style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>No. of Traveller</p>
                                        <h6 className='consent-box-text'>2</h6>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ margin: '0' }}>
                                <Col style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-text'>Does any of the traveller(s) have pre-existing medical conditions?</p>
                                    </div>
                                </Col>
                                <Col md="4" style={{ padding: '0' }}>
                                    <div style={sectionStyle}>
                                        <p className='consent-box-title'>Yes</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
                <div className="consent-button-container">
                    <div className="reject-button-container" onClick={handleReject}>Reject</div>
                    <div className="approve-button-container" onClick={handleApprove}>Approve</div>
                </div>
            </div>
            <Col md={3} className='consent-right-sec-card-container' style={{position:'absolute', right:0}}>
                <LeftSectionCard IconImage={'SiTata'} title={'CH01CD7170'} text={'1210 BUS STR 48'} />
            </Col>
        </div>
    );
};

export default TravelInfoCard;
