import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/shared/StatusBadge';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import './AdminRecordDetails.css';

/**
 * AdminRecordDetails Page
 * Displays record details and allows admin to change status
 */
const AdminRecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - will be replaced with API calls
  const [record, setRecord] = useState({
    id: parseInt(id),
    title: 'Bribery in Land Registry',
    description: 'Officials at the land registry demanding bribes for processing land documents. Multiple citizens have reported the same issue.',
    type: 'red-flag',
    status: 'Pending',
    latitude: -1.2921,
    longitude: 36.8219,
    createdBy: 'John Doe',
    createdAt: '2024-08-15',
    createdByPhone: '+254712345678',
    createdByEmail: 'john@example.com'
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [statusToChange, setStatusToChange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatusToChange(newStatus);
    setShowConfirmDialog(true);
  };

  const confirmStatusChange = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setRecord(prev => ({ ...prev, status: statusToChange }));
      setShowConfirmDialog(false);
      setStatusToChange(null);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setStatusToChange(null);
  };

  return (
    <div className="admin-record-details">
      <button className="admin-record-details__back" onClick={() => navigate(-1)}>
        ← Back to Dashboard
      </button>

      <div className="admin-record-details__container">
        <div className="admin-record-details__main">
          <div className="admin-record-details__header">
            <div>
              <h1 className="admin-record-details__title">{record.title}</h1>
              <p className="admin-record-details__meta">
                <span className="admin-record-details__type">{record.type}</span>
                <span className="admin-record-details__divider">•</span>
                <span className="admin-record-details__date">
                  {new Date(record.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <StatusBadge status={record.status} />
          </div>

          <div className="admin-record-details__section">
            <h2 className="admin-record-details__section-title">Description</h2>
            <p className="admin-record-details__description">{record.description}</p>
          </div>

          <div className="admin-record-details__section">
            <h2 className="admin-record-details__section-title">Location</h2>
            <div className="admin-record-details__location">
              <div className="admin-record-details__coord">
                <span className="admin-record-details__coord-label">Latitude:</span>
                <span className="admin-record-details__coord-value">{record.latitude}</span>
              </div>
              <div className="admin-record-details__coord">
                <span className="admin-record-details__coord-label">Longitude:</span>
                <span className="admin-record-details__coord-value">{record.longitude}</span>
              </div>
            </div>
            <div className="admin-record-details__map-placeholder">
              📍 Map view will be displayed here
            </div>
          </div>

          <div className="admin-record-details__section">
            <h2 className="admin-record-details__section-title">Reporter Information</h2>
            <div className="admin-record-details__reporter">
              <div className="admin-record-details__info-row">
                <span className="admin-record-details__label">Name:</span>
                <span className="admin-record-details__value">{record.createdBy}</span>
              </div>
              <div className="admin-record-details__info-row">
                <span className="admin-record-details__label">Email:</span>
                <span className="admin-record-details__value">{record.createdByEmail}</span>
              </div>
              <div className="admin-record-details__info-row">
                <span className="admin-record-details__label">Phone:</span>
                <span className="admin-record-details__value">{record.createdByPhone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-record-details__sidebar">
          <div className="admin-record-details__status-card">
            <h3 className="admin-record-details__card-title">Change Status</h3>
            <p className="admin-record-details__card-subtitle">
              Update the status of this record
            </p>

            <div className="admin-record-details__status-buttons">
              <button
                className={`admin-record-details__status-btn admin-record-details__status-btn--investigation ${
                  record.status === 'Under Investigation' ? 'active' : ''
                }`}
                onClick={() => handleStatusChange('Under Investigation')}
                disabled={isLoading || record.status === 'Under Investigation'}
              >
                🔍 Under Investigation
              </button>

              <button
                className={`admin-record-details__status-btn admin-record-details__status-btn--rejected ${
                  record.status === 'Rejected' ? 'active' : ''
                }`}
                onClick={() => handleStatusChange('Rejected')}
                disabled={isLoading || record.status === 'Rejected'}
              >
                ❌ Rejected
              </button>

              <button
                className={`admin-record-details__status-btn admin-record-details__status-btn--resolved ${
                  record.status === 'Resolved' ? 'active' : ''
                }`}
                onClick={() => handleStatusChange('Resolved')}
                disabled={isLoading || record.status === 'Resolved'}
              >
                ✓ Resolved
              </button>
            </div>
          </div>

          <div className="admin-record-details__info-card">
            <h3 className="admin-record-details__card-title">Record Info</h3>
            <dl className="admin-record-details__info-list">
              <dt>Record ID</dt>
              <dd>{record.id}</dd>
              <dt>Type</dt>
              <dd className="admin-record-details__capitalize">{record.type}</dd>
              <dt>Current Status</dt>
              <dd>
                <StatusBadge status={record.status} />
              </dd>
              <dt>Created Date</dt>
              <dd>{new Date(record.createdAt).toLocaleDateString()}</dd>
            </dl>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Confirm Status Change"
        message={`Are you sure you want to change the status to "${statusToChange}"? This action cannot be undone.`}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={confirmStatusChange}
        onCancel={handleCancel}
        variant="warning"
      />
    </div>
  );
};

export default AdminRecordDetails;
