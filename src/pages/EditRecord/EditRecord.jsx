import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import mockRecords from "../../data/mockRecords";

export default function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();

  const record = mockRecords.find(
    (item) => String(item.id) === String(id)
  );

  // Handle invalid record ID.
  if (!record) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Record Not Found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The record you are trying to edit does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/records")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to My Records
          </button>
        </div>
      </main>
    );
  }

  /*
    IMPORTANT PROJECT RULE:

    A user can only edit a record while its status
    is pending.

    Once it becomes:
    - Under Investigation
    - Rejected
    - Resolved

    it becomes view-only.
  */
  if (record.status !== "pending") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
            🔒
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Record Cannot Be Edited
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            This record is no longer pending and is now
            view-only.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/records/${record.id}`)
            }
            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Record
          </button>
        </section>
      </main>
    );
  }

  return (
    <EditForm
      record={record}
      onCancel={() =>
        navigate(`/records/${record.id}`)
      }
    />
  );
}


/*
  Edit form for pending records.
*/
function EditForm({ record, onCancel }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: record.title,
    description: record.description,
    latitude: record.latitude,
    longitude: record.longitude,
  });

  /*
    Update form state when the user changes
    an input.
  */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
    Temporary frontend submission.

    Later this will become something like:

    PUT /api/records/:id

    through the API service.
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Updated record:", {
      ...record,
      ...formData,
    });

    navigate(`/records/${record.id}`);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button
          type="button"
          onClick={onCancel}
          className="mb-5 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← Back to Record
        </button>

        {/* Form Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              JISETI
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Edit Record
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Update your pending report.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ================= TITLE ================= */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* ================= LOCATION ================= */}
            <div>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                Location
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Latitude */}
                <div>
                  <label
                    htmlFor="latitude"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Latitude
                  </label>

                  <input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Longitude */}
                <div>
                  <label
                    htmlFor="longitude"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Longitude
                  </label>

                  <input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* Map placeholder */}
              <div className="mt-5 flex min-h-48 flex-col items-center justify-center rounded-xl bg-slate-100 p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  📍
                </div>

                <p className="font-semibold text-slate-700">
                  Location Picker
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Map integration will be added later.
                </p>
              </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>

            </div>

          </form>
        </section>
      </div>
    </main>
  );
}