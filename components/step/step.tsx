import "./styles.css";
import { FaCheckCircle } from "react-icons/fa";
import { RiProgress2Fill } from "react-icons/ri";
import { Step } from "@/app/types/step";

export default function StepTile({
  step,
  lastChild,
}: {
  step: Step;
  lastChild: boolean;
}) {
  const { description, isCompleted, resourceTitle, resourceUrl, title } = step;
  return (
    <div className="step-container">
      <div className="step-timeline">
        <div
          className="line"
          style={{
            height: lastChild ? "100%" : "120%",
            backgroundColor: isCompleted ? "#17c52bff" : "#004a5f",
          }}
        >
          {isCompleted ? (
            <FaCheckCircle className="step-progress-icon step-progress-icon-done" />
          ) : (
            <RiProgress2Fill className="step-progress-icon step-progress-icon-progress" />
          )}
        </div>
      </div>
      <div className="step-card-container">
        <h3>{title}</h3>
        <p>{description}</p>
        <span>
          Accesse o conteúdo em:
          <a href={resourceUrl} target="_blank">
            {resourceTitle}
          </a>
        </span>
      </div>
    </div>
  );
}
