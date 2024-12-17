import React, { useState, useContext } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import featIcon from '../assets/imgIconfeature.svg'
import { PlanContext } from '../contexts/PlanProvider';
import './DrawerAccordion.css'
import { Col } from 'reactstrap';


const data = [
    {
        title: "Medical Expenses",
        amount: "$300,000",
        deductible: "$100"
    },
    {
        title: "Baggage Loss",
        amount: "$300,000",
        deductible: "$100"
    },
    {
        title: "Loss Of Passport",
        amount: "$300,000",
        deductible: "$100"
    },
    {
        title: "Trip Cancellation",
        amount: "$300,000",
        deductible: "$100"
    }
];

const CustomAccordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const { cardData, setCardData } = useContext(PlanContext);

    const covers = [
        {
            "coverName": "Trip Cancellation",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Missed Connection",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Personal Accident",
            "benefits": null,
            "limits_and_SumInsured": "$ 10000",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Loss of Passport",
            "benefits": null,
            "limits_and_SumInsured": "$ 250",
            "coverPath": null,
            "deductible_and_TimeExcess": "$25"
        },
        {
            "coverName": "Emergency Medical Treatment and Evacuation",
            "benefits": null,
            "limits_and_SumInsured": "$ 50000",
            "coverPath": null,
            "deductible_and_TimeExcess": "$50"
        },
        {
            "coverName": "Emergency Accidental Treatment and Evacuation",
            "benefits": null,
            "limits_and_SumInsured": "$ 50000",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Daily Cash Allowance (Per day/Max 5 days)",
            "benefits": null,
            "limits_and_SumInsured": "$50",
            "coverPath": null,
            "deductible_and_TimeExcess": "2 Days"
        },
        {
            "coverName": "Emergency Dental Treatment",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Accidental Death and Disability (Common Carrier)",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Personal Liability & Bail Bond",
            "benefits": null,
            "limits_and_SumInsured": "$ 15000",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Home Buildings and Contents",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Financial Emergency Cash",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Bounced Bookings",
            "benefits": null,
            "limits_and_SumInsured": null,
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Common Carrier Delay",
            "benefits": null,
            "limits_and_SumInsured": "INR 1000",
            "coverPath": null,
            "deductible_and_TimeExcess": "6 Hours"
        },
        {
            "coverName": "Delay of Checked-in Baggage",
            "benefits": null,
            "limits_and_SumInsured": "$ 100",
            "coverPath": null,
            "deductible_and_TimeExcess": "6 Hours"
        },
        {
            "coverName": "Total loss of Checked-in Baggage",
            "benefits": null,
            "limits_and_SumInsured": "$ 300",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Trip Abandonment",
            "benefits": null,
            "limits_and_SumInsured": "$500",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        },
        {
            "coverName": "Adventure Activities",
            "benefits": null,
            "limits_and_SumInsured": "Covered",
            "coverPath": null,
            "deductible_and_TimeExcess": null
        }
    ]

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div style={{ margin: 'auto', overflow: 'hidden' }}>
            {covers.map((item, index) => (
                <div key={index} style={{ padding: '16px 0', borderBottom: index !== covers.length - 1 ? '1px solid #E0E0E0' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', width: '100%' }} onClick={() => toggle(index)}>
                        {/* Icon and Title */}
                        <Col md={4} ms={3}>
                            <div className='d-flex align-items-center'>
                                <div className='drawerAccordionCircleIConContainer'>
                                    <img src={featIcon} alt="icon" style={{ width: '37px', height: '37px' }} />
                                </div>
                                <span className='drawerAccordionCoverName'>{item.coverName}</span>
                            </div>
                        </Col>

                        {/* Amount and Deductible */}
                        <Col md={4}>
                            <div className='d-flex align-items-center justify-content-end'>
                                <div style={{ textAlign: 'right', }}>
                                    <div className='drawerAccordionAmount'>{item.amount}</div>
                                    <div className='drawerAccordionDeductibleText'>Deductible: {item.limits_and_SumInsured}</div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} style={{textAlign:'right'}}>
                            {openIndex === index ? <IoIosArrowDropup className='arrow-up-expanded' style={{ margin: 0 }} /> :
                                <IoIosArrowDropdown className='arrow-up-expanded' style={{ color: "#0000004D", margin: 0 }} />
                            }
                        </Col>
                    </div>

                    {/* Accordion Body */}
                    {
                        openIndex === index && (
                            <div className='drawerAccordionBody'>
                                Additional information about {item.coverName} can be displayed here.
                            </div>
                        )
                    }
                </div >
            ))}
        </div >
    );
};

export default CustomAccordion;
