import { Step } from "goal-path/app/types/step";
import steps from "./mock";
import StepTile from "goal-path/components/step/step";
import "./styles.css";

export default function Page() {
  // TODO: Fetch and display road map details based on the `id` parameter

  // TODO: If not found, trigger the not-found page
  // if (!roadMap) {
  //   // This will render the `not-found.tsx` component
  //   // You can also use `redirect` to redirect to another page if needed
  //   notFound();
  // }

  return (
    <div className="steps-container">
      {steps.map((st: Step, i: number) => (
        <StepTile
          key={st.name}
          name={st.name}
          status={st.status}
          lastChild={i === steps.length - 1}
        />
      ))}
    </div>
  );
}
