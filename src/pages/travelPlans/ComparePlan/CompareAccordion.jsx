import React, { useState } from 'react'
import { Button, Collapse, Card, CardBody, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import VehicleVerificationCardHeader from './TravelAccordionCardHeader'
import './CompareAccordion.css'
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { CiCalendarDate } from 'react-icons/ci';
import featIcon from '../../../assets/imgIconfeature.svg'
import crossIcon from '../../../assets/compare_cross.svg'



export default function CompareAccordion() {
    const navigate = useNavigate();
    const [stepsActiveState, setStepsActiveState] = useState('step1')






    return (
        <div className="container" style={{ padding: '0', fontSize: '14px', display: 'grid' }}>
            {/* Accordion Field for CKYC */}
            <div style={{ margin: '15px 0' }} id='CKYC'>
                <div onClick={() => setStepsActiveState('step1')}>
                    {stepsActiveState !== 'step1' && (
                        <VehicleVerificationCardHeader
                            title={'Trip Related Covers'}
                            downArrow={true}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step1'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Baggage Related Covers'} downArrow={false} />
                        <CardBody>
                            <Row>
                                <Col md={3}>
                                    <div className="d-flex gap-3 align-items-center justify-content-start">
                                        <img src={featIcon} alt="featureIcon" />
                                        <div className="feature-title">Medical Expenses</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start">
                                        <div className="feature-accordion-prices">$300,000</div>
                                        <div className="feature-accordion-prices-bottom-text">Deductible: $100</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start">
                                        <div className="feature-accordion-prices">$300,000</div>
                                        <div className="feature-accordion-prices-bottom-text">Deductible: $100</div>
                                    </div>
                                </Col>
                            </Row>
                            <hr style={{ position: 'static', width: '100%', marginTop: '11px' }} />
                            <Row>
                                <Col md={3}>
                                    <div className="d-flex gap-3 align-items-center justify-content-start">
                                        <img src={featIcon} alt="featureIcon" />
                                        <div className="feature-title">Baggage Loss</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start">
                                        <div className="feature-accordion-prices">$300</div>
                                        <div className="feature-accordion-prices-bottom-text">No Deductible</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start">
                                        <div className="feature-accordion-prices">$300,000</div>
                                        <div className="feature-accordion-prices-bottom-text">Deductible: Max 50% Per Bag/10% Per Item</div>
                                    </div>
                                </Col>
                            </Row>
                            <hr style={{ position: 'static', width: '100%', marginTop: '11px' }} />
                            <Row>
                                <Col md={3}>
                                    <div className="d-flex gap-3 align-items-center justify-content-start">
                                        <img src={featIcon} alt="featureIcon" />
                                        <div className="feature-title">Baggage Loss</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start">
                                        <div className="feature-accordion-prices">$250</div>
                                        <div className="feature-accordion-prices-bottom-text">Deductible: $25v</div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="d-flex flex-column align-items-start flex-start justify-content-center">
                                       <img src={crossIcon} alt='crossicon' />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Medical Related Covers */}
            <div style={{ margin: '15px 0' }} id='customer'>
                <div onClick={() => { setStepsActiveState('step3') }}>
                    {stepsActiveState !== 'step3' && (
                        <VehicleVerificationCardHeader
                            title={'Medical Related Covers'}
                            downArrow={true}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step3'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Trip Related Covers'} downArrow={false} />
                        <CardBody>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Medical History */}
            <div style={{ margin: '15px 0' }} id='vehicleDetail'>
                <div onClick={() => { setStepsActiveState('step2') }}>
                    {stepsActiveState !== 'step2' && (
                        <VehicleVerificationCardHeader
                            title={'Medical History'}
                            downArrow={true}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step2'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Baggage Related Covers'} downArrow={false} />
                        <CardBody style={{ position: 'relative' }}>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

            {/* Accordion Field for Medical Related Covers */}
            <div style={{ margin: '15px 0' }} id='nominee'>
                <div onClick={() => setStepsActiveState('step4')}>
                    {stepsActiveState !== 'step4' && (
                        <VehicleVerificationCardHeader
                            title={'Medical Related Covers'}
                            downArrow={true}
                        />
                    )}
                </div>
                <Collapse isOpen={stepsActiveState === 'step4'}>
                    <Card className='verification-card-style'>
                        <VehicleVerificationCardHeader title={'Other Features'} downArrow={false} />
                        <CardBody>
                        </CardBody>
                    </Card>

                </Collapse>
            </div>
        </div>
    )
}
