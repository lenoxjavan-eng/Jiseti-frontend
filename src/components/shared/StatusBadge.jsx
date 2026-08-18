import React from 'react';
import './StatusBadge.css';

/**
 * StatusBadge Component
 * Displays the status of a record with appropriate styling
 * @param {string} status - The status to display (Under Investigation, Rejected, Resolved)
 */
const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
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
      {status || 'Pending'}
    </span>
  );
};

export default StatusBadge;
