import React, { useContext } from 'react'
import { Col, Container, Row } from 'reactstrap'
import VehiclePlansLeft from '../TravelPlansLeft'
import './ComparePlan.css'
import { IoArrowBack } from 'react-icons/io5'
import compareBack from '../../../assets/compare_back.svg'
import MyComparisionBar from './MyComparisionCard'
import { PlanContext } from '../../../contexts/PlanProvider'
import { useNavigate } from 'react-router-dom'
import CompareAccordion from './CompareAccordion'

function ComparePlan() {
    const {comparisonData, setComparisonData} = useContext(PlanContext)
    const navigate = useNavigate()
    return (
        <div style={{ background: "#F5F6F6", minHeight: "90vh", marginTop: "61px", overflow: 'hidden', fontFamily: 'Mukta ' }}>
            <Container className='vehicle-plans-container'>
                <Row style={{ height: "90vh", overflow: "auto", position: 'relative' }}>
                    <Col md={3} className='left-section-container  d-flex flex-column gap-4'>
                        {/* left-section */}
                        <VehiclePlansLeft />
                    </Col>
                    <Col className='right-section-container '>
                        <div className="compare-plans-container">
                            <div className="compare-plans-header-card">
                                <div className="compare-header-box-container d-flex flex-column align-items-start gap-2">
                                    <div onClick={()=>navigate('/travel-plans')} className="compare-header-title-back"><img src={compareBack} /><h6 style={{marginBottom:0}}>Go back to plans</h6></div>
                                    <div className="compare-header-title-text">Plan comparison</div>
                                </div>
                                <MyComparisionBar comparisonData={comparisonData} />
                            </div>
                            <CompareAccordion />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ComparePlan