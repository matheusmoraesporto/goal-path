"use client";

import "./styles.css";
import Link from "next/link";
// TODO: Replace with actual data fetching logic
import roadMaps from "./mocks";
import { FiPlus } from "react-icons/fi";

export default function RoadmapList() {
  return (
    <div className="roadmap-list-container centered-div">
      <div className="roadmap-list-header">
        <h2>Road map list</h2>
        <Link href="/roadmap/preferences">
          <span className="btn-primary">
            <FiPlus />
            Novo plano de estudos
          </span>
        </Link>
      </div>
      <ul className="roadmap-list">
        {roadMaps.map((r) => (
          <Link key={r.id} href={`/roadmap/${r.id}`}>
            <li className="abc" key={r.id}>
              {r.techGoal}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
