"use client";

import "./styles.css";
import { FaCheckCircle } from "react-icons/fa";
import { RiProgress2Fill } from "react-icons/ri";
import { Step } from "@/app/types/step";
import { updateStepStatus } from "@/service/actions/steps";
import Modal, { ModalHandle } from "@/components/modal/modal";
import { useRef } from "react";
import { TailSpin } from "react-loader-spinner";

export default function StepTile({
  step,
  roadmapId,
  lastChild,
}: {
  step: Step;
  roadmapId: string;
  lastChild: boolean;
}) {
  const modalRef = useRef<ModalHandle>(null);
  const { description, isCompleted, resourceTitle, resourceUrl, title } = step;

  const fetchToggleStepStatus = async (stepId: string, status: boolean) => {
    try {
      modalRef.current?.showModal();
      await updateStepStatus(stepId, roadmapId, status);
      modalRef.current?.close();
    } catch (error) {
      console.error("Failed to toggle step status:", error);
    }
  };

  return (
    <>
      <div className="step-container">
        <div className="step-timeline">
          <div
            className="line"
            style={{
              height: lastChild ? "100%" : "120%",
              backgroundColor: isCompleted ? "#17c52bff" : "#004a5f",
            }}
          >
            <span className="step-icon-container">
              {isCompleted ? (
                <FaCheckCircle
                  className="step-progress-icon step-progress-icon-done"
                  onClick={() => fetchToggleStepStatus(step.id, false)}
                />
              ) : (
                <RiProgress2Fill
                  className="step-progress-icon step-progress-icon-progress"
                  onClick={() => fetchToggleStepStatus(step.id, true)}
                />
              )}
            </span>
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

      <Modal ref={modalRef}>
        <div className="modal-loading-container">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#004a5f"
            ariaLabel="tail-spin-loading"
            radius="1"
          />
          <p>Atualizando o status da etapa...</p>
        </div>
      </Modal>
    </>
  );
}
