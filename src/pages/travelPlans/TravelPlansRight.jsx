import React, { useContext, useEffect, useState } from 'react'
import './TravelPlansRight.css'
import { TbClipboardList } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";
import { Button } from 'reactstrap';
import RightSectionCard from './RightSectionCard';
// import AddBasicPlanPopUp from './AddBasicPlanPopUp';
import Drawer from './Drawer';
import LeftSectionCard from './LeftSectionCard';
import { SiTata } from 'react-icons/si';
import { VscSettings } from "react-icons/vsc";
import LeftSectionAdditionalDetail from './LeftSectionAdditionalDetail';
import { CgClose } from 'react-icons/cg';
import { PlanContext } from '../../contexts/PlanProvider';
import MyComparisionCard from './MyComparisionCard';
import { DetailContext } from '../../contexts/DetailPageProvider';

// const plansData = {
//   "benefitPlans": [
//     {
//       "planName": "Basic Plan",
//       "price": "4,500",
//       "benefits": [
//         "Roadside Assistance",
//         "Car Damages",
//         "Standalone Personal Accident"
//       ]
//     },
//     {
//       "planName": "Smart Plan",
//       "price": "6,800",
//       "benefits": [
//         "Roadside Assistance",
//         "Car Damages",
//         "Standalone Personal Accident",
//         "Tyre Protect",
//         "Return To Invoice"
//       ]
//     },
//     {
//       "planName": "Enhanced Plan",
//       "price": "9,500",
//       "benefits": [
//         "Roadside Assistance",
//         "Car Damages",
//         "Standalone Personal Accident",
//         "Car Damages",
//         "Tyre Protect",
//         "Return To Invoice"
//       ]
//     }
//   ]
// };

export default function VehiclePlansRight(quotations) {
  const{cardData} = useContext(PlanContext)
  const [isPlansBenefit, setPlanBenifit] = useState(false)
  // const [selectedPlan, setSelectedPlan] = useState('Basic Plan')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFetchedForResponsive, setIsFetchedForResponsive] = useState(true)
  const [showAdditionalDetail, setAdditional] = useState(false)
  const [isShowMore, setShowMore] = useState(false);
  const [comarisionData, setComarisionData]= useState([])
  const { vehicleDetails, policyDetails, detailPageData } = useContext(DetailContext);
  const {travelersCount} = detailPageData; //this will be fetched from backend to show travellers count


  
  
  const handleShowMoreForRightSecCard = (statusFromCard) => {
    setShowMore(statusFromCard)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    // setSelectedPlan()
    // console.log(planVal);
  };

  return (
    <>
      <Drawer isOpen={isDrawerOpen} handleClose={() => setIsDrawerOpen(false)} />
      {/* {isPlansBenefit && <AddBasicPlanPopUp isOpen={isPlansBenefit} handleClose={() => setPlanBenifit(false)} />} */}
      <div className={`d-flex flex-column gap-4 ${!isShowMore?'plan-details-right-sec-container':'plan-details-right-sec-container-h-full'}`}>
        <div className="plan-detail-header"><TbClipboardList size={17} /> Showing {23} plans for {travelersCount||1} member <div onClick={() => setAdditional(true)} className="settin-button-plan"><VscSettings /></div></div>
        {showAdditionalDetail&&<div className="left-section-AdditinalDetailcard-overlay">
          <div className="drawer-close-button additional-close-btn-responsive" onClick={()=>setAdditional(false)}><CgClose size={24} /></div>
          <LeftSectionAdditionalDetail showAdditionalDetail={showAdditionalDetail} setAdditional={setAdditional} />
        </div>}
        <div className="notification-bar-container">
          <div className="notification-icon-text">
            <a href="http://" target="_blank" rel="noopener noreferrer">Travelling to Thailand?</a>
            <p>Remember, travel insurance is mandatory! Secure your trip now</p>
          </div>
        </div>
        <div className="left-section-card-in-right-container">
          <LeftSectionCard classNameRightSec={'left-section-card-in-right'} isFetchedForResponsive={isFetchedForResponsive} setIsFetchedForResponsive={setIsFetchedForResponsive} IconImage={SiTata} title={'CH01CD7170'} text={'1210 BUS STR 48'} />
        </div>
        <div className='d-flex justify-content-between plan-cards-right'>
          {/* {plansData&&plansData.benefitPlans.map((plan, index) => (
            <RightSectionCard
              toggleDrawer={toggleDrawer}
              handleBenifit={(current) => { setPlanBenifit(true); setSelectedPlan(current) }}
              key={index}
              planName={plan.planName}
              benefits={plan.benefits}
              price={plan.price}
              handleShowMore={handleShowMoreForRightSecCard}
            />
          ))} */}
          <RightSectionCard 
          data={cardData}
          quotations={quotations}
          />
        </div>
      </div>
    </>
  )
}
