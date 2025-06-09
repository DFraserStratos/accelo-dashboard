import React from 'react';
import ProgressTrackerBlock from './ProgressTrackerBlock';
import { FileText } from 'lucide-react';
import './MainContent.css';

const MainContent = ({ groupedItems }) => {
  const companies = Object.values(groupedItems);

  if (companies.length === 0) {
    return (
      <main className="main-content">
        <div className="empty-state">
          <FileText size={64} />
          <h3>No items to display</h3>
          <p>Add companies and their projects or agreements to start tracking progress</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-grid">
        {companies.map(({ company, items }) => (
          <div key={company.id} className="company-section">
            <h2 className="company-section-title">{company.name}</h2>
            <div className="progress-blocks-container">
              {items.map((item) => (
                <ProgressTrackerBlock
                  key={`${item.type}-${item.id}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;