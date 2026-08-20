import { useContext, useMemo, useState } from "react";

import mockRecords from "../../data/mockRecords";
import RecordCard from "../../components/RecordCard/RecordCard";
import { AuthContext } from "../../context/AuthContext";

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
  const currentUser = user?.name || "";

  const [activeFilter, setActiveFilter] =
    useState("all");

  const userRecords = useMemo(() => {
    return mockRecords.filter(
      (record) => record.createdBy === currentUser
    );
  }, []);

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
            filteredRecords.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
              />
            ))
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