import React, { useContext } from 'react'
import './MyComparisionCard.css'
import { IoIosClose } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../../../assets/compare_card_cross.svg'
import { PlanContext } from '../../../contexts/PlanProvider'

function MyComparisionCard({ id, img, title, text, index }) {
    const {comparisonData, setComparisonData} = useContext(PlanContext)
    const navigate = useNavigate()
    const handleRemove = ()=>{
        const newData = comparisonData.filter((el)=> el.id!==id)
        setComparisonData(newData)
    }
    return (
        <>
            <div className={`compare-header-box-container d-flex flex-column justify-content-between ${index === 1 ? 'bg-2' : 'bg-1'}`}>
                <img onClick={handleRemove} src={closeIcon} alt="close" height={'17px'} width={'17px'} style={{position:'absolute', right:'2px', top:'2px', cursor:'pointer'}} />
                <div className="compare-card">
                    <div className="img-container"><img src={img} alt="image" /></div>
                    <div className="d-flex flex-column">
                        <div className="card-title">{title}</div>
                        <div className="card-text">{text}</div>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-between">
                    <div className="card-info-title-text-container align-items-start">
                        <div className="title">Sum Insured</div>
                        <div className="text">$250,000</div>
                    </div>
                    <div className="card-info-title-text-container align-items-end">
                        <div className="title">Premium</div>
                        <div className="text">₹5,354</div>
                    </div>
                </div>
                <div onClick={()=>{navigate('/travel-verification')}} className="compare-buy-button">Buy Now</div>
            </div>
        </>
    )
}
const MyComparisionBar = ({ comparisonData }) => {
    const navigate = useNavigate()
    const handleCompareNow = () => {
        comparisonData.length > 1 && navigate('/compare-plans')
    }
    return (
        <div className="">
            <div className="d-flex w-100 justify-content-between align-items-center flex-wrap gap-4">
                <div className="comparison-bottom-cards-container">
                    {comparisonData.length > 0 && comparisonData.map((el, i) => (
                        <MyComparisionCard key={i} id={i} index={i} img={el.img} title={el.title} text={el.text} dataLength={comparisonData.length} />
                    ))}
                    {comparisonData.length < 3 && <div className="comparison-card-add-plan">
                        <div className="plus-container"><FiPlus /></div>
                        Add Plan
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MyComparisionBar;
