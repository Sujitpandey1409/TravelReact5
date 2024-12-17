import React, { useContext } from 'react'
import './MyComparisionCard.css'
import { IoIosClose } from 'react-icons/io'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import closeIcon from '../../assets/compare_card_cross.svg'
import { PlanContext } from '../../contexts/PlanProvider'


function MyComparisionCard({ id, img, title, text, index }) {
    const {comparisonData, setComparisonData} = useContext(PlanContext)
    console.log('comparision data',comparisonData.length);
    
    const handleRemove = () => {
        if(comparisonData.length>0){
        const newData = comparisonData.filter((el) => el.id !== id)
        setComparisonData(newData)}
    }
    return (
        <>
            <div className="comparison-bottom-cards-container">
                <div className="comparison-bottom-card">
                    <div className="img-container"><img src={img} alt="image" /></div>
                    <div className="d-flex flex-column">
                        <div className="card-title">{title}</div>
                        <div className="card-text">{text}</div>
                    </div>
                <img onClick={handleRemove} src={closeIcon} alt="close" height={'17px'} width={'17px'} style={{ position: 'absolute', right: '-13px', top: '6px', cursor: 'pointer', height:'17px' }} />
                </div>
                {index < 2 && <div className="vs-circle">VS</div>}
            </div>
        </>
    )
}
const MyComparisionBar = ({ comparisonData, setShowComparison }) => {
    const navigate = useNavigate()
    const handleCompareNow = () => {
        comparisonData.length > 1 && navigate('/compare-plans')
    }
    return (
        <div className="comparison-bottom-bar">
            <div className="comparison-bottom-header">
                <h2>My Comparison</h2>
                <div style={{ cursor: 'pointer', color: '#00000080' }} onClick={() => setShowComparison(false)}><IoIosClose size={25} /></div>
            </div>
            <div className="d-flex w-100 justify-content-between align-items-center flex-wrap gap-4">
                <div className="comparison-bottom-cards-container">
                    {comparisonData.length > 0 && comparisonData.map((el, i) => (
                        <MyComparisionCard key={i} id={i} index={i} img={el.img} title={el.title} text={el.text} dataLength={comparisonData.length} />
                    ))}
                    {comparisonData.length < 3 && <div className="comparison-bottom-card-add-plan">
                        <div className="plus-container"><FiPlus /></div>
                        Add Plan
                    </div>}
                </div>
                <div onClick={handleCompareNow} className={`compare-now-button ${comparisonData.length > 1 && 'btn-active'}`}>Compare Now</div>
            </div>
        </div>
    )
}

export default MyComparisionBar;
