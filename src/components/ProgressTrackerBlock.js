import React from 'react';
import { Briefcase, FileText, Clock, CheckCircle } from 'lucide-react';
import './ProgressTrackerBlock.css';

const ProgressTrackerBlock = ({ item }) => {
  const isProject = item.type === 'project';
  const Icon = isProject ? Briefcase : FileText;

  const formatHours = (seconds) => {
    if (!seconds) return '0h';
    const hours = Math.round(seconds / 3600 * 10) / 10;
    return `${hours}h`;
  };

  const getProgressPercentage = () => {
    if (!isProject && item.allowance) {
      return Math.min((item.used / item.allowance) * 100, 100);
    }
    return 0;
  };

  const getStatusColor = () => {
    if (!isProject && item.allowance) {
      const percentage = getProgressPercentage();
      if (percentage >= 90) return '#e74c3c';
      if (percentage >= 75) return '#f39c12';
      return '#27ae60';
    }
    return '#3498db';
  };

  return (
    <div className="progress-tracker-block">
      <div className="block-header">
        <div className="block-icon" style={{ backgroundColor: `${getStatusColor()}20` }}>
          <Icon size={24} color={getStatusColor()} />
        </div>
        <div className="block-title-container">
          <h3 className="block-title">{item.title}</h3>
          <span className="block-type">{isProject ? 'Project' : 'Agreement'}</span>
        </div>
      </div>

      <div className="block-content">
        {isProject ? (
          <div className="hours-details">
            <div className="hours-item">
              <Clock size={16} />
              <span className="hours-label">Billable:</span>
              <span className="hours-value">{formatHours(item.billable)}</span>
            </div>
            <div className="hours-item">
              <Clock size={16} />
              <span className="hours-label">Non-billable:</span>
              <span className="hours-value">{formatHours(item.nonBillable)}</span>
            </div>
            <div className="hours-total">
              <strong>Total: {formatHours(item.billable + item.nonBillable)}</strong>
            </div>
          </div>
        ) : (
          <div className="agreement-details">
            <div className="usage-info">
              <span className="usage-label">Usage:</span>
              <span className="usage-value">
                {formatHours(item.used)} of {formatHours(item.allowance)}
              </span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${getProgressPercentage()}%`,
                    backgroundColor: getStatusColor()
                  }}
                />
              </div>
              <span className="progress-percentage">{Math.round(getProgressPercentage())}%</span>
            </div>
            {item.periodEnd && (
              <div className="period-info">
                <span className="period-label">Period ends:</span>
                <span className="period-value">{new Date(item.periodEnd).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {item.status === 'active' && (
        <div className="block-status">
          <CheckCircle size={16} color="#27ae60" />
          <span>Active</span>
        </div>
      )}
    </div>
  );
};

export default ProgressTrackerBlock;