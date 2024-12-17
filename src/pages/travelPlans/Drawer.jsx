import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import './Drawer.css';
import { IoMdClose } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import logo from "../../assets/quta-logo.png";
import { BsDownload, BsFillShareFill } from "react-icons/bs";
import DrawerBodyCard from './DrawerBodyCard';
import { useNavigate } from 'react-router-dom';
import { PlanContext } from '../../contexts/PlanProvider';
import FAQAccordion from './DrawerFaques';


export default function Drawer({ isOpen, handleClose, companyLogo, companyName }) {
    const drawerRef = useRef(null);
    // const { plansData, selectedPlan, allBenefits } = useContext(PlanContext)
    const [isPremiumPage, setDrawerPage] = useState(true)
    const [notAddedBenefits, setNotAddedBenefits] = useState([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const addedBenefits = plansData.benefitPlans
    //         .find(planData => planData.planName === selectedPlan)
    //         ?.benefits.map(benefit => benefit.toLowerCase()) || [];
    //     // const allBenefits = ['roadside assistance', 'zero depreciation', 'standalone personal accident', 'car damages', 'tyre protect', 'return to invoice', 'key protect']
    //     const remainingBenefits = allBenefits.filter((el) => !addedBenefits.includes(el))
    //     setNotAddedBenefits(remainingBenefits)
    //     console.log(selectedPlan, notAddedBenefits, plansData, addedBenefits);
    // }, [selectedPlan, plansData])
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the click happened outside the drawer, close it
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                handleClose();
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, handleClose])
    return (
        <div className={`drawer-overlay ${isOpen ? 'open' : ''}`}>
            <div className="drawer-container-with-close">
                <div className="drawer-close-button" onClick={handleClose}><CgClose size={24} /></div>
                <div ref={drawerRef} className="drawer">
                    <div className="plan-drawer-header">
                        <div className="d-flex w-100">
                            <div className={`drawer-header-text-container ${isPremiumPage ? 'active-page' : ''}`} onClick={() => setDrawerPage(true)}>Plan Benefits
                            </div>
                            <div className={`drawer-header-text-container ${!isPremiumPage ? 'active-page' : ''}`} onClick={() => setDrawerPage(false)}>FAQs
                            </div>
                        </div>
                    </div>
                    {isPremiumPage ? <div className="drawer-body" style={{ paddingBottom: '200px' }}>
                        <div className="share-download-container d-none">
                            <div className='drawer-share-button d-flex gap-2'> <BsFillShareFill /><div className="hide">Share</div></div>
                            <div className='drawer-share-button d-flex gap-2'> <BsDownload /><div className="hide">Download</div></div>
                        </div>
                        <div className="unique-info-card-container">
                            <div className="unique-header">
                                <div className="unique-title">What's unique about this plan?</div>
                                <div className="d-flex gap-1">
                                    <div className="plan-img"><img src={companyLogo} alt="" /></div>
                                    <div className="unique-plan-name">{companyName}</div>
                                </div>
                            </div>
                            <div className="unique-body">
                                <div className="life-threatening-text">
                                    Life Threatning Condition due to PED -
                                </div>
                                <span className="coverage-text">
                                    Coverage of up to $10,000 is offered if a life-threatening condition arises due to Pre-existing disease.
                                </span>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-4">
                            <DrawerBodyCard title={'Important Features'} />
                        </div>
                    </div> :
                        <><div className="drawer-body">
                            {/* Faq */}
                            <FAQAccordion />
                        </div></>
                    }
                    {/* <div className="drawer-footer-container">
                    <div className="drawer-footer">
                        <div className="drawer-footer-logo">
                            <img src={logo} alt="Insurance Logo" className="logo-image" />
                        </div>
                        <hr className='editArrowSeperator' style={{ width: '50px' }} />
                    </div>
                    <div className="drawer-footer-value-container">
                        <div className="drawer-footer-value-card">
                            <h6>Cover Value(IDV)</h6>
                            <p>₹34,45,994</p>
                        </div>
                        <div className="drawer-footer-value-card">
                            <h6>Final Premium</h6>
                            <p>₹34,45,994</p>
                        </div>
                    </div>
                    <Button onClick={() => navigate('/vehicle-verification')} primary className='buy-now-button drawer-footer-buy-responsive'>Buy Now</Button>
                </div> */}
                </div>
            </div>
        </div>
    );
}
