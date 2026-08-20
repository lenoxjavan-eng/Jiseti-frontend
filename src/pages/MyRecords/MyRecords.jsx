import { useMemo, useState } from "react";

import mockRecords from "../../data/mockRecords";
import RecordCard from "../../components/RecordCard/RecordCard";

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
  /*
    Temporary mock user.

    Person 1's AuthContext will eventually provide
    the currently logged-in user.
  */
  const currentUser = "John Mwangi";

  const [activeFilter, setActiveFilter] =
    useState("all");

  /*
    Get only records belonging to the current user.
  */
  const userRecords = useMemo(() => {
    return mockRecords.filter(
      (record) => record.createdBy === currentUser
    );
  }, []);

  /*
    Apply the selected status filter.
  */
  const filteredRecords = userRecords.filter(
    (record) => {
      if (activeFilter === "all") {
        return true;
      }

      return record.status === activeFilter;
    }
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================= PAGE HEADER ================= */}
        <section className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            JISETI
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            My Records
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage the reports you have submitted.
          </p>
        </section>

        {/* ================= FILTERS ================= */}
        <nav className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                setActiveFilter(filter.value)
              }
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.value
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        {/* ================= RECORDS ================= */}
        <section className="grid gap-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <RecordCard
                key={record.id}
                record={record}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h3 className="font-semibold text-slate-900">
                No records found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                There are no records matching this filter.
              </p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}