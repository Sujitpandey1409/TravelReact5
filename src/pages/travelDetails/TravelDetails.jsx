import React from 'react'
import VehicleDetailsLeft from './TravelDetailsLeft'
import VehicleDetailsRight from './TravelDetailsRight'
import './TravelDetails.css'

function VehicleDetails() {
  return (
    <div className='vehicle-details-wrapper'>
    <div className="d-flex gap-2 vehicle-details-container" >
      <VehicleDetailsLeft />
      <VehicleDetailsRight />
    </div>
    </div>
  )
}

export default VehicleDetails