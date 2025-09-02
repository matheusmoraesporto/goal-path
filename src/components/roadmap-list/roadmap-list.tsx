"use client";

import "./styles.css";
import Link from "next/link";
// TODO: Replace with actual data fetching logic
import roadMaps from "./mocks";

export default function RoadmapList() {
  return (
    <div className="roadmap-list-container centered-div">
      <div className="roadmap-list-header">
        <h2>Road map list</h2>
        <Link href="/roadmap/create">
          {/* TODO: Add "new icon" (+) */}
          <span className="btn-go-to-create-roadmap">Criar novo road map</span>
        </Link>
      </div>
      <ul className="roadmap-list">
        {roadMaps.map((r) => (
          <Link key={r.id} href={`/roadmap/${r.id}`}>
            <li key={r.id}>{r.techGoal}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
