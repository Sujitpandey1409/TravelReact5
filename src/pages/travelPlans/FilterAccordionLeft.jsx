import React, { useState } from 'react';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem, FormGroup, Label, Input
} from 'reactstrap';
import './FilterAccordionLeft.css'

function FilterAccordionLeft(props) {
    const [open, setOpen] = useState('');
    const [selectedOptionPlanType, setSelectedOptionPlanType] = useState('single-trip');
    const [selectedOptionSumInsured, setSelectedOptionSumInsured] = useState('default');
    const [selectedOptionVisaType, setSelectedOptionVisaType] = useState('tourist');
    const [selectedOptionCoverage, setSelectedOptionCoverage] = useState([]);
    const [selectedOptionTravelPurpose, setSelectedOptionTravelPurpose] = useState([]);
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const handleCheckboxChangeCoverage = (value) => {
        setSelectedOptionCoverage((prev) => {
            if (prev.includes(value)) {
                // Remove the value if already present
                return prev.filter((item) => item !== value);
            } else {
                // Add the value if not present
                return [...prev, value];
            }
        });
    };

    const handleCheckboxChangeTravelPurpose = (value) => {
        setSelectedOptionTravelPurpose((prev) => {
            if (prev.includes(value)) {
                // Remove the value if already present
                return prev.filter((item) => item !== value);
            } else {
                // Add the value if not present
                return [...prev, value];
            }
        });
    };

    return (
        <div className='filter-accordion-left-container'>
            <div className="filter-accordion-title-filter">Filters</div>
            <hr className='filter-accordion-left-devider' />
            {/* ***********Accordion for Plan Type*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1"><div className="filter-accordion-left-title">Plan Type</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="1">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* Single Trip Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="plan"
                                            value="single-trip"
                                            checked={selectedOptionPlanType === 'single-trip'}
                                            onChange={() => setSelectedOptionPlanType('single-trip')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Single Trip Plans
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Frequent Flyer Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="plan"
                                            value="frequent-flyer"
                                            checked={selectedOptionPlanType === 'frequent-flyer'}
                                            onChange={() => setSelectedOptionPlanType('frequent-flyer')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Frequent Flyer Plans
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Student Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="plan"
                                            value="student"
                                            checked={selectedOptionPlanType === 'student'}
                                            onChange={() => setSelectedOptionPlanType('student')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Student Plans
                                        </span>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

            {/* ***********Accordion for Sum Insured*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="2"><div className="filter-accordion-left-title">Sum Insured</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="2">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* Single Trip Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sum insured"
                                            value="default"
                                            checked={selectedOptionSumInsured === 'default'}
                                            onChange={() => setSelectedOptionSumInsured('default')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            default
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Frequent Flyer Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sum insured"
                                            value="$50,000"
                                            checked={selectedOptionSumInsured === '$50,000'}
                                            onChange={() => setSelectedOptionSumInsured('$50,000')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            $50,000
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Student Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sum insured"
                                            value="$100,000"
                                            checked={selectedOptionSumInsured === '$100,000'}
                                            onChange={() => setSelectedOptionSumInsured('$100,000')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            $100,000
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Student Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sum insured"
                                            value="$150,000"
                                            checked={selectedOptionSumInsured === '$150,000'}
                                            onChange={() => setSelectedOptionSumInsured('$150,000')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            $150,000
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Student Plans */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="sum insured"
                                            value="$200,000"
                                            checked={selectedOptionSumInsured === '$200,000'}
                                            onChange={() => setSelectedOptionSumInsured('$200,000')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            $200,000
                                        </span>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

            {/* ***********Accordion for Insurer*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="3"><div className="filter-accordion-left-title">Insurer</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="3">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                <span className='left-plan-radio-button-text'>
                                    Insurer
                                </span>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

            {/* ***********Accordion for Visa Type*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="4"><div className="filter-accordion-left-title">Visa Type</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="4">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* Tourist/Visitor Visa */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="tourist"
                                            checked={selectedOptionVisaType === 'tourist'}
                                            onChange={() => setSelectedOptionVisaType('tourist')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Tourist/Visitor Visa
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Short Term Work Visa */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="shortTerm"
                                            checked={selectedOptionVisaType === 'shortTerm'}
                                            onChange={() => setSelectedOptionVisaType('shortTerm')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Short Term Work Visa
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Long Term Work Visa */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="longTerm"
                                            checked={selectedOptionVisaType === 'longTerm'}
                                            onChange={() => setSelectedOptionVisaType('longTerm')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Long Term Work Visa
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Dependent Vise */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="dependent"
                                            checked={selectedOptionVisaType === 'dependent'}
                                            onChange={() => setSelectedOptionVisaType('dependent')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Dependent Vise
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Deplomatic Visa */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="longTerm"
                                            checked={selectedOptionVisaType === 'deplomaticVisa'}
                                            onChange={() => setSelectedOptionVisaType('deplomaticVisa')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Deplomatic Visa
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Expat Visa */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="radio"
                                            name="visaType"
                                            value="expat"
                                            checked={selectedOptionVisaType === 'expat'}
                                            onChange={() => setSelectedOptionVisaType('expat')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Expat Visa
                                        </span>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            {/* ***********Accordion for Coverages*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="5"><div className="filter-accordion-left-title">Coverages</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="5">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* Pre-Existing Disease Covered */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="preExistingDisease"
                                            checked={selectedOptionCoverage.includes('preExistingDisease')}
                                            onChange={() => handleCheckboxChangeCoverage('preExistingDisease')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Pre-Existing Disease Covered
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Adventure Sports Covered */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="adventureSportsCovered"
                                            checked={selectedOptionCoverage.includes('adventureSportsCovered')}
                                            onChange={() => handleCheckboxChangeCoverage('adventureSportsCovered')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Adventure Sports Covered
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Card Fraud */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="cardFraud"
                                            checked={selectedOptionCoverage.includes('cardFraud')}
                                            onChange={() => handleCheckboxChangeCoverage('cardFraud')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Card Fraud
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* No Medical Sublimit */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="noMedicalSublimit"
                                            checked={selectedOptionCoverage.includes('noMedicalSublimit')}
                                            onChange={() => handleCheckboxChangeCoverage('noMedicalSublimit')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            No Medical Sublimit
                                        </span>
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
            {/* ***********Accordion for Purpose of Travel*********** */}
            <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="6"><div className="filter-accordion-left-title">Purpose of Travel</div></AccordionHeader>
                    <AccordionBody className='pt-0' accordionId="6">
                        <div style={{ maxWidth: '300px' }}>
                            <FormGroup tag="fieldset">
                                {/* Holiday/Tourism */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="holiday"
                                            checked={selectedOptionTravelPurpose.includes('holiday')}
                                            onChange={() => handleCheckboxChangeTravelPurpose('holiday')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Holiday/Tourism
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Studies */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="studies"
                                            checked={selectedOptionTravelPurpose.includes('studies')}
                                            onChange={() => handleCheckboxChangeTravelPurpose('studies')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Studies
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Employment */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="employment"
                                            checked={selectedOptionTravelPurpose.includes('employment')}
                                            onChange={() => handleCheckboxChangeTravelPurpose('employment')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Employment
                                        </span>
                                    </Label>
                                </FormGroup>

                                {/* Business/Work */}
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type="checkbox"
                                            value="business"
                                            checked={selectedOptionTravelPurpose.includes('business')}
                                            onChange={() => handleCheckboxChangeTravelPurpose('business')}
                                        />
                                        <span className='left-plan-radio-button-text'>
                                            Business/Work
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

export default FilterAccordionLeft;