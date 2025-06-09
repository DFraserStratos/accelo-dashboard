import React from 'react';
import { Building2 } from 'lucide-react';
import './CompanyCard.css';

const CompanyCard = ({ company, isSelected, onClick, itemCount = 0 }) => {
  return (
    <div
      className={`company-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="company-icon">
        <Building2 size={20} />
      </div>
      <div className="company-info">
        <h3 className="company-name">{company.name}</h3>
        {itemCount > 0 && (
          <span className="company-item-count">{itemCount} items</span>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;