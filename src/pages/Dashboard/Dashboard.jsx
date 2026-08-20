import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import mockRecords from "../../data/mockRecords";
import RecordCard from "../../components/RecordCard/RecordCard";

export default function Dashboard() {
  const navigate = useNavigate();

  // Temporary mock user.
  // This will later come from Person 1's AuthContext.
  const currentUser = "John Mwangi";

  // Get only records belonging to the current user.
  const userRecords = useMemo(() => {
    return mockRecords.filter(
      (record) => record.createdBy === currentUser
    );
  }, []);

  // Calculate dashboard statistics.
  const totalRecords = userRecords.length;

  const pendingRecords = userRecords.filter(
    (record) => record.status === "pending"
  ).length;

  const investigationRecords = userRecords.filter(
    (record) => record.status === "under-investigation"
  ).length;

  const resolvedRecords = userRecords.filter(
    (record) => record.status === "resolved"
  ).length;

  // Show the three most recent records.
  const recentRecords = [...userRecords]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              JISETI
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back, {currentUser}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/records/new")}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            + Create New Report
          </button>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            label="Total Reports"
            value={totalRecords}
          />

          <StatCard
            label="Pending"
            value={pendingRecords}
          />

          <StatCard
            label="Under Investigation"
            value={investigationRecords}
          />

          <StatCard
            label="Resolved"
            value={resolvedRecords}
          />

        </section>

        {/* ================= RECENT REPORTS ================= */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest submitted records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/records")}
              className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View All
            </button>
          </div>

          <div className="grid gap-4">
            {recentRecords.length > 0 ? (
              recentRecords.map((record) => (
                <RecordCard
                  key={record.id}
                  record={record}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <h3 className="font-semibold text-slate-900">
                  No reports yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  You have not submitted any reports.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}


/*
  Reusable statistics card.
*/
function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}