import React from 'react';
import CompanyCard from './CompanyCard';
import './Sidebar.css';

const Sidebar = ({ companies, selectedCompanyId, onSelectCompany }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Companies</h2>
      </div>
      <div className="sidebar-content">
        {companies.length === 0 ? (
          <div className="sidebar-empty">
            <p>No companies selected</p>
            <p className="sidebar-hint">Click "Add Item" to get started</p>
          </div>
        ) : (
          companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isSelected={selectedCompanyId === company.id}
              onClick={() => onSelectCompany(company.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;