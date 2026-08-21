import { useNavigate } from "react-router-dom";

function formatType(type) {
  return type === "red-flag" ? "Red Flag" : "Intervention";
}

function formatStatus(status) {
  const statusMap = {
    pending: "Pending",
    "under-investigation": "Under Investigation",
    rejected: "Rejected",
    resolved: "Resolved",
  };

  return statusMap[status] || status;
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

export default function RecordCard({ record, onDelete, showActions = true }) {
  const navigate = useNavigate();

  // Only pending records can be edited or deleted.
  const canModify = record.status === "pending";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {formatType(record.type)}
          </span>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {record.title}
          </h3>
        </div>

        {/* Status */}
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
            record.status
          )}`}
        >
          {formatStatus(record.status)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
        {record.description}
      </p>

      {/* Record information */}
      <div className="mt-5 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:gap-5">
        <span>
          {new Date(record.createdAt).toLocaleDateString()}
        </span>

        <span>By {record.createdBy}</span>
      </div>

      {/* Actions */}
      {showActions && <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
        {/* View */}
        <button
          type="button"
          onClick={() => navigate(`/records/${record.id}`)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View
        </button>

        {/* Only show these for pending records */}
        {canModify && (
          <>
            {/* Edit */}
            <button
              type="button"
              onClick={() =>
                navigate(`/records/${record.id}/edit`)
              }
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Edit
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={() => onDelete?.(record.id)}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          </>
        )}
      </div>}
    </article>
  );
}