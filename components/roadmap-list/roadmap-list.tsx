"use client";

import "./styles.css";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { getRoadmapsByUser } from "@/service/database/roadmap";
import { useEffect, useState } from "react";
import { RoadMap } from "@/app/types/step";
import { useSession } from "next-auth/react";

export default function RoadmapList() {
  const [roadmaps, setRoadmaps] = useState<Array<RoadMap>>();
  const { data: session } = useSession();
  const userUUID = session?.user?.id;

  const fetchRoadmaps = async (userUUID: string) => {
    const response = await getRoadmapsByUser(userUUID);
    setRoadmaps(response);
  };

  useEffect(() => {
    if (userUUID)
      fetchRoadmaps(userUUID || "")
  }, [userUUID]);

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
        {roadmaps ? (
          roadmaps.map((r: RoadMap) => (
            <Link key={r.id} href={`/roadmap/${r.id}`}>
              <li className="abc" key={r.id}>
                {r.roadmapName}
              </li>
            </Link>
          ))
        ) : (
          <p>Nenhum plano de estudos encontrado.</p>
        )}
      </ul>
    </div>
  );
}
