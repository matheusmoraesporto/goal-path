import "./styles.css";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { getRoadmapsByUser } from "@/service/database/roadmap";
import { RoadMap } from "@/app/types/step";
import { auth } from "@/auth";

export default async function RoadmapList() {
  const session = await auth();
  const roadmaps = await getRoadmapsByUser(session?.user?.id || "");

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
