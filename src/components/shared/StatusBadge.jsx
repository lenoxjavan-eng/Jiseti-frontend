import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * Displays the status of a record with appropriate styling
 * @param {string} status - The status to display (Under Investigation, Rejected, Resolved)
 */
const StatusBadge = ({ status }) => {
  const labels = {
    pending: 'Pending',
    'under-investigation': 'Under Investigation',
    rejected: 'Rejected',
    resolved: 'Resolved',
  };
  const displayStatus = labels[status] || status || 'Pending';

  const getStatusClass = () => {
    switch (displayStatus.toLowerCase()) {
      case 'under investigation':
        return 'status-badge--investigation';
      case 'rejected':
        return 'status-badge--rejected';
      case 'resolved':
        return 'status-badge--resolved';
        default:
        return 'status-badge--default';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
