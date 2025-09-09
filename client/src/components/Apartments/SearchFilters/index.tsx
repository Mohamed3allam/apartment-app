"use client";
import { useState } from "react";

export default function SearchFilters({
  initial,
  onSearch,
}: {
  initial?: { unitName?: string; unitNumber?: string; project?: string };
  onSearch: (v: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }) => void;
}) {
  const [unitName, setUnitName] = useState(initial?.unitName ?? "");
  const [unitNumber, setUnitNumber] = useState(initial?.unitNumber ?? "");
  const [project, setProject] = useState(initial?.project ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      unitName: unitName || undefined,
      unitNumber: unitNumber || undefined,
      project: project || undefined,
    });
  };

  return (
    <form className="mb-3" onSubmit={submit}>
      <div className="row g-2">
        <div className="col-md-4">
          <input
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            placeholder="Unit name"
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <input
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            placeholder="Unit number"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Project"
            className="form-control"
          />
        </div>
        <div className="col-md-1 d-grid">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
