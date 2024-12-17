import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const data = [
  { title: "Does My Travel Insurance Cover COVID-19?" },
  { title: "Does Travel Insurance Cover Pre-Existing Disease(S)?" },
  { title: "How Does Medical Claims Get Settled?" },
  { title: "Can I Cancel My Policy And Get A Refund Before The Trip Start Date?" },
  { title: "How To File A Claim?" },
  { title: "When Can I Buy Travel Insurance?" }
];

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', Width: '100%', alignItems: 'flex-start' }}>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            width: '100%',
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            background: '#FFFFFF',
            boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
            padding: '15px 20px',
            cursor: 'pointer'
          }}
          onClick={() => toggle(index)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Title */}
            <span style={{ color: '#2B3545', fontFamily: 'Mukta', fontSize: '16px', fontWeight: 500 }}>{item.title}</span>
            
            {/* Arrow Icon */}
            {openIndex === index ? (
              <FaChevronUp style={{ color: '#334bc2', width: '20px', height: '20px' }} />
            ) : (
              <FaChevronDown style={{ color: '#334bc2', width: '20px', height: '20px' }} />
            )}
          </div>

          {/* Accordion Body */}
          {openIndex === index && (
            <div style={{ paddingTop: '10px', color: '#6E7A85', fontFamily: 'Mukta', fontSize: '14px' }}>
              {/* Replace this text with actual content related to each FAQ */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
