import React, { useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import './SortBy.css'

function SortBy(props) {
    const [selectedOption, setSelectedOption] = useState('default');

    const [open, setOpen] = useState('');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <div className='accordion-container-sort-by'>
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1"><div className="accordion-header-text">Sort By</div></AccordionHeader>
                    <AccordionBody accordionId="1">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* default */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortBy"
                                            value="default"
                                            checked={selectedOption === 'default'}
                                            onChange={() => setSelectedOption('default')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Default
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Frequent low-to-high */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortBy"
                                            value="low-to-high"
                                            checked={selectedOption === 'low-to-high'}
                                            onChange={() => setSelectedOption('low-to-high')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Premium Low to High
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Student high-to-low */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sortBy"
                                            value="high-to-low"
                                            checked={selectedOption === 'high-to-low'}
                                            onChange={() => setSelectedOption('high-to-low')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Premium High to Low
                                        </span>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default SortBy;