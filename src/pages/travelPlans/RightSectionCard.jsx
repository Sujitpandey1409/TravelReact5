import React, { useContext, useEffect, useState } from 'react';
import './RightSectionCard.css';
import { MdArrowForwardIos } from 'react-icons/md';
import MyComparisionCard from './MyComparisionCard';
import Drawer from './Drawer'
import { useNavigate } from 'react-router-dom';
import { PlanContext } from '../../contexts/PlanProvider';

const InsuranceCard = ({ comparisonData, setShowComparison, id, setComparisonData, companyLogo, companyName, plan, medicalExpenses, tripCancellation, baggageLoss, price }) => {
    const navigate = useNavigate()
    const [drawer, setDrawer] = useState(false)
    // useEffect(() => {
    //     console.log(comparisonData);
    // }, [comparisonData]);
    const handleBuyNow = ()=>{
        navigate('/travel-verification')
    }

    const handleChangeCompare = (e) => {
        if (e.target.checked) {
            const newData = {
                id,
                img: companyLogo,
                title: companyName,
                text: 'exploreGold',
            };
            setComparisonData([...comparisonData, newData]);
            setShowComparison(true)
        } else {
            const newData = comparisonData.filter((el) => el.id !== id);
            setComparisonData(newData);
            if (newData.length) setShowComparison(true)
        }

    };

    const checkIdExists = (state, idToCheck) => {
        return state.some(item => item.id === idToCheck);
      };

    return (
        <div className="card-container">
            <div className="card-header">
                <div className="d-flex">
                    <img src={companyLogo} alt="Company Logo" className="company-logo" />
                    <div className="company-name">{companyName}</div>
                </div>
                <label className="compare-label">
                    Compare
                    <input onChange={handleChangeCompare} checked={checkIdExists(comparisonData,id)} type="checkbox" />
                </label>
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-column">
                        <h2>{plan}</h2>
                        <p className="digital-process">Digital Claims Process</p>
                    </div>
                    <div className="price-section gap-3">
                        <div className="d-flex flex-column">
                            <span className="you-pay">You Pay</span>
                            <span className="price">₹ {price}</span>
                            <div className="per-person">per person</div>
                        </div>
                        <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="benefits-section">
                        <div className="benefit">
                            <p>Medical Expenses</p>
                            <p>${medicalExpenses}</p>
                        </div>
                        <div className="benefit">
                            <p>Trip Cancellation</p>
                            <p>${tripCancellation}</p>
                        </div>
                        <div className="benefit">
                            <p>Baggage Loss</p>
                            <p>${baggageLoss}</p>
                        </div>
                    </div>
                    <div onClick={()=>setDrawer(true)} className="view-features">View All Features <MdArrowForwardIos /></div>
                    {drawer&&<Drawer isOpen={drawer} handleClose={()=>setDrawer(false)} companyLogo={companyLogo} companyName={companyName}/>}
                </div>
            </div>
        </div>
    );
};

const RightSectionCard = ({ data },{ quotations }) => {
    const [showMore, setShowMore] = useState(false);
    // const [comparisonData, setComparisonData] = useState([]);
    const {comparisonData, setComparisonData} = useContext(PlanContext);
    const [showComparison, setShowComparison] = useState(false)


    const visibleCards = showMore ? data : data.slice(0, 4);

    const handleShowMore = () => {
        
        setShowMore(!showMore);
    };

    return (
        <div>   
            <div className="card-wrapper">
                {visibleCards.map((card, index) => (
                    <InsuranceCard
                        id={index}
                        comparisonData={comparisonData}
                        setShowComparison={setShowComparison}
                        setComparisonData={setComparisonData}
                        key={index}
                        companyLogo={card.companyLogo}
                        companyName={card.companyName}
                        plan={card.plan}
                        medicalExpenses={card.medicalExpenses}
                        tripCancellation={card.tripCancellation}
                        baggageLoss={card.baggageLoss}
                        price={card.price}
                    />
                    
                ))}

            </div>
            <button onClick={handleShowMore} className="show-more-btn">
                {showMore ? 'Show Less' : 'Show More'}
            </button>
            {comparisonData.length > 0 && showComparison && <MyComparisionCard comparisonData={comparisonData} setShowComparison={setShowComparison} />}
        </div>
    );
};

export default RightSectionCard;
