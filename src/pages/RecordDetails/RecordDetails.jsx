import { useNavigate, useParams } from "react-router-dom";

import mockRecords from "../../data/mockRecords";

function formatType(type) {
  return type === "red-flag"
    ? "Red Flag"
    : "Intervention";
}

function formatStatus(status) {
  const statuses = {
    pending: "Pending",
    "under-investigation": "Under Investigation",
    rejected: "Rejected",
    resolved: "Resolved",
  };

  return statuses[status] || status;
}

function getStatusStyles(status) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    "under-investigation": "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return styles[status] || "bg-slate-100 text-slate-700";
}

export default function RecordDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /*
    Find the record using the ID from the URL.
  */
  const record = mockRecords.find(
    (item) => String(item.id) === String(id)
  );

  /*
    Handle an invalid/non-existent record.
  */
  if (!record) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Record Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The record you are looking for does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/records")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to My Records
          </button>
        </div>
      </main>
    );
  }

  /*
    IMPORTANT:
    Only pending records can be modified.
  */
  const canModify = record.status === "pending";

  /*
    Temporary delete behavior.
    The Flask backend will handle the real deletion later.
  */
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (confirmed) {
      console.log("Delete record:", record.id);

      navigate("/records");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* ================= BACK BUTTON ================= */}
        <button
          type="button"
          onClick={() => navigate("/records")}
          className="mb-5 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← Back to My Records
        </button>

        {/* ================= MAIN CARD ================= */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* ================= HEADER ================= */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

              <div>
                {/* Record type */}
                <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  {formatType(record.type)}
                </span>

                {/* Title */}
                <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {record.title}
                </h1>
              </div>

              {/* Status */}
              <span
                className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyles(
                  record.status
                )}`}
              >
                {formatStatus(record.status)}
              </span>
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="border-b border-slate-200 p-6 sm:p-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Description
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              {record.description}
            </p>
          </div>

          {/* ================= INFORMATION ================= */}
          <div className="p-6 sm:p-8">

            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Report Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <DetailItem
                label="Submitted By"
                value={record.createdBy}
              />

              <DetailItem
                label="Date Submitted"
                value={new Date(
                  record.createdAt
                ).toLocaleDateString()}
              />

              <DetailItem
                label="Latitude"
                value={record.latitude}
              />

              <DetailItem
                label="Longitude"
                value={record.longitude}
              />

            </div>

            {/* ================= LOCATION ================= */}
            <div className="mt-8">

              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Location
              </h2>

              {/*
                This is only a placeholder for now.
                Person 3 will work on the actual map/location
                functionality.
              */}
              <div className="mt-4 flex min-h-56 flex-col items-center justify-center rounded-xl bg-slate-100 p-6 text-center">

                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  📍
                </div>

                <p className="font-semibold text-slate-700">
                  Location Preview
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Latitude: {record.latitude}
                </p>

                <p className="text-sm text-slate-500">
                  Longitude: {record.longitude}
                </p>

              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="mt-8 border-t border-slate-200 pt-6">

              {canModify ? (
                <div className="flex flex-wrap gap-3">

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/records/${record.id}/edit`
                      )
                    }
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Edit Record
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete Record
                  </button>

                </div>
              ) : (
                /*
                  Non-pending records are view-only.
                */
                <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
                  This record is{" "}
                  <strong>
                    {formatStatus(record.status)}
                  </strong>{" "}
                  and is now view-only.
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


/*
  Small reusable component for displaying
  record information.
*/
function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}