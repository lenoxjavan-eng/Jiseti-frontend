import { useContext, useEffect, useMemo, useState } from "react";

import StatusBadge from "../../components/shared/StatusBadge";
import { AuthContext } from "../../context/AuthContext";
import { deleteRecord, fetchRecords } from "../../services/api";

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Under Investigation",
    value: "under-investigation",
  },
  {
    label: "Resolved",
    value: "resolved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export default function MyRecords() {
  const { user } = useContext(AuthContext);

  const [records, setRecords] = useState([]);
  const [activeFilter, setActiveFilter] =
    useState("all");

  useEffect(() => {
    fetchRecords().then(setRecords);
  }, []);

  const userRecords = useMemo(() => {
    return records.filter(
      (record) => String(record.userId) === String(user?.id)
    );
  }, [records, user]);

  async function handleDelete(recordId) {
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) return;

    const remaining = await deleteRecord(recordId);
    setRecords(remaining);
  }

  const filteredRecords = userRecords.filter(
    (record) => {
      if (activeFilter === "all") {
        return true;
      }

      return record.status === activeFilter;
    }
  );

  return (
    <main className="records-page">
      <div className="records-page__inner">
        <section className="records-page__header">
          <div>
          <p className="eyebrow">
            JISETI
          </p>

          <h1>
            My Records
          </h1>

          <p className="records-page__description">
            View and manage the reports you have submitted.
          </p>
          </div>
          <span className="records-page__count">{userRecords.length} reports</span>
        </section>

        <nav className="records-page__filters" aria-label="Filter reports">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                setActiveFilter(filter.value)
              }
              className={`records-page__filter ${
                activeFilter === filter.value
                  ? "is-active"
                  : ""
              }`}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <section className="records-page__list">
          {filteredRecords.length > 0 ? (
            <div className="public-dashboard__table-wrapper">
              <table className="public-dashboard__table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td className="public-dashboard__cell public-dashboard__cell--title">
                        {record.title}
                      </td>
                      <td className="public-dashboard__cell">
                        <span className="public-dashboard__type-badge">{record.type}</span>
                      </td>
                      <td className="public-dashboard__cell">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="public-dashboard__cell">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="public-dashboard__cell records-page__actions">
                        {record.status === "pending" && (
                          <>
                            <button
                              type="button"
                              className="records-page__action records-page__action--edit"
                              onClick={() => window.location.assign(`/records/${record.id}/edit`)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="records-page__action records-page__action--delete"
                              onClick={() => handleDelete(record.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="records-page__empty">
              <h3>
                No records found
              </h3>

              <p>
                There are no records matching this filter.
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}