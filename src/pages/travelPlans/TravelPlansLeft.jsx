import React from 'react'
import LeftSectionCard from './LeftSectionCard'
import { SiTata } from "react-icons/si";
import LeftSectionAdditionalDetail from './LeftSectionAdditionalDetail';
import './TravelPlansLeft.css'
import LeftSectionToggleExpand from './LeftSectionToggleExpand';
// import FilterAccordion from './FilterAccordion';
import SortBy from './SortBy';
import FilterAccordionLeft from './FilterAccordionLeft';

export default function VehiclePlansLeft() {
    return (
        <div className='vehicle-plan-left' style={{ overflowY:"auto", display:'grid', gap:'20px'}}>
            <LeftSectionCard IconImage={SiTata} title={'CH01CD7170'} text={'1210 BUS STR 48'} />
            <SortBy />
            <FilterAccordionLeft />
            {/* <FilterAccordion /> */}
        </div>
    )
}
