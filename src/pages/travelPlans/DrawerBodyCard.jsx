import React from 'react';
import { Card, CardBody, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DrawerBodyCard.css'
import DrawerAccordion from '../../components/DrawerAccordion'

const DrawerBodyCard = ({ title }) => {
  return (
    <Card className='drawer-body-card-container'>
      <div className='drawer-body-card-header'>
        <h6>
          {title}
        </h6>
      </div>

      <CardBody style={{ paddingTop: '60px' }}>
        <DrawerAccordion/>
      </CardBody>
    </Card>
  );
};

export default DrawerBodyCard;
