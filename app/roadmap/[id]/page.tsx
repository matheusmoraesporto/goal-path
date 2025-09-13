import { Step } from "@/app/types/step";
import "./styles.css";
import StepTile from "@/components/step/step";
import { notFound } from "next/navigation";
import { getStepsByRoadmap } from "@/service/database/steps";
import { getRoadmapTitle } from "@/service/database/roadmap";
import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  if (!id) notFound();

  const [roadmapTitle, steps] = await Promise.all([
    getRoadmapTitle(id),
    getStepsByRoadmap(id),
  ]);

  return (
    <div className="steps-container centered-div">
      <div className="steps-header">
        <h2>{roadmapTitle}</h2>
        <Link className="btn-secondary" href="/">
          <FaRegArrowAltCircleLeft />
          Voltar
        </Link>
      </div>
      {steps.map((st: Step, i: number) => (
        <StepTile
          key={st.id}
          roadmapId={id}
          step={st}
          lastChild={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
