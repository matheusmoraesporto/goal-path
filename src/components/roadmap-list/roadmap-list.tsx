"use client";

import { fetchDataFromOpenAI } from "goal-path/service/openAI";
import "./styles.css";
import Link from "next/link";
import { RoadMap } from "goal-path/app/types/step";

export default function RoadmapList() {
  // TODO: Replace with actual data fetching logic
  const roadMaps: RoadMap[] = [
    { id: "1", name: "React", steps: [] },
    { id: "2", name: "Next.js", steps: [] },
    { id: "3", name: "Typescript", steps: [] },
  ];

  return (
    <div className="roadmap-list-container centered-div">
      <div className="roadmap-list-header">
        <h2>Road map list</h2>
        {/* TODO: Alterar para um Link que redirecione para a página de criação de road map */}
        <button
          onClick={() => fetchDataFromOpenAI()}
          className="btn-go-to-create-roadmap"
        >
          Criar novo road map
        </button>
      </div>
      <ul className="roadmap-list">
        {roadMaps.map((r) => (
          /* TODO: Adicionar on click em cada li que redirecione para o roadmap */
          <Link key={r.id} href={`/roadmap/${r.id}`}>
            <li key={r.id} onClick={() => console.log("me clicou")}>
              {r.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
