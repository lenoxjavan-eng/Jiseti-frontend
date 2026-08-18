import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/shared/StatusBadge';
import SearchBar from '../components/shared/SearchBar';
import Filter from '../components/shared/Filter';
import './AdminDashboard.css';

/**
 * AdminDashboard Page
 * Displays all records with search, filter, and management capabilities
 */
const AdminDashboard = () => {
  // Mock data - will be replaced with API calls
  const [records, setRecords] = useState([
    {
      id: 1,
      title: 'Bribery in Land Registry',
      description: 'Officials demanding bribes for land documents',
      type: 'red-flag',
      status: 'Under Investigation',
      latitude: -1.2921,
      longitude: 36.8219,
      createdBy: 'John Doe',
      createdAt: '2024-08-15'
    },
    {
      id: 2,
      title: 'Pothole on Main Street',
      description: 'Major pothole causing traffic hazards',
      type: 'intervention',
      status: 'Pending',
      latitude: -1.2865,
      longitude: 36.8172,
      createdBy: 'Jane Smith',
      createdAt: '2024-08-14'
    },
    {
      id: 3,
      title: 'Embezzlement Suspected',
      description: 'Missing funds from municipal budget',
      type: 'red-flag',
      status: 'Resolved',
      latitude: -1.2963,
      longitude: 36.8269,
      createdBy: 'Admin User',
      createdAt: '2024-08-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: [], status: [] });

  // Filter and search records
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = 
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTypeFilter = 
        filters.type.length === 0 || filters.type.includes(record.type);

      const matchesStatusFilter = 
        filters.status.length === 0 || filters.status.includes(record.status);

      return matchesSearch && matchesTypeFilter && matchesStatusFilter;
    });
  }, [records, searchTerm, filters]);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Admin Dashboard</h1>
        <p className="admin-dashboard__subtitle">Manage all records and investigate reports</p>
      </div>

      <div className="admin-dashboard__toolbar">
        <div className="admin-dashboard__search">
          <SearchBar 
            onSearch={setSearchTerm}
            placeholder="Search records by title, description, or author..."
          />
        </div>
        <Filter 
          onFilterChange={setFilters}
          types={['red-flag', 'intervention']}
          statuses={['Pending', 'Under Investigation', 'Rejected', 'Resolved']}
        />
      </div>

      <div className="admin-dashboard__stats">
        <div className="admin-dashboard__stat">
          <div className="admin-dashboard__stat-value">{records.length}</div>
          <div className="admin-dashboard__stat-label">Total Records</div>
        </div>
        <div className="admin-dashboard__stat">
          <div className="admin-dashboard__stat-value">
            {records.filter(r => r.status === 'Pending').length}
          </div>
          <div className="admin-dashboard__stat-label">Pending</div>
        </div>
        <div className="admin-dashboard__stat">
          <div className="admin-dashboard__stat-value">
            {records.filter(r => r.status === 'Under Investigation').length}
          </div>
          <div className="admin-dashboard__stat-label">Under Investigation</div>
        </div>
        <div className="admin-dashboard__stat">
          <div className="admin-dashboard__stat-value">
            {records.filter(r => r.status === 'Resolved').length}
          </div>
          <div className="admin-dashboard__stat-label">Resolved</div>
        </div>
      </div>

      <div className="admin-dashboard__content">
        {filteredRecords.length > 0 ? (
          <div className="admin-dashboard__table-wrapper">
            <table className="admin-dashboard__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map(record => (
                  <tr key={record.id} className="admin-dashboard__row">
                    <td className="admin-dashboard__cell admin-dashboard__cell--title">
                      {record.title}
                    </td>
                    <td className="admin-dashboard__cell">
                      <span className="admin-dashboard__type-badge">
                        {record.type}
                      </span>
                    </td>
                    <td className="admin-dashboard__cell">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="admin-dashboard__cell">
                      {record.createdBy}
                    </td>
                    <td className="admin-dashboard__cell">
                      {new Date(record.createdAt).toLocaleDateString()}
                    </td>
                    <td className="admin-dashboard__cell admin-dashboard__cell--actions">
                      <Link 
                        to={`/admin/record/${record.id}`}
                        className="admin-dashboard__action-btn"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-dashboard__empty">
            <p>No records found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
