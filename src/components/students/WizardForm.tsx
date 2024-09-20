import React, { useState } from "react";
import { Stepper, Step } from "react-form-stepper";
import WizardProgram from "./WizardProgram";
import WizardEnrollment from "./WizardEnrollment";
import WizardSocioEconomics from "./WizardSocioEconomics";
import WizardAttendance from "./WizardAttendance";
import WizardPerformance from "./WizardPerformance";
import WizardFinalResult from "./WizardFinalResult";
import WizardTransfer from "./WizardTransfer";
import WizardConfigDone from "./WizardConfigDone";

const steps = [
  { label: "Program" },
  { label: "Enrollment" },
  { label: "Socio Economic" },
  { label: "Attendance" },
  { label: "Performance" },
  { label: "Final Result" },
  { label: "Transfer" },
];

export default function WizardForm() {
  const [wizardStep, setWizardSetp] = useState(0);

  const RenderContent = () => {
    switch (wizardStep) {
      case 0:
        return <WizardProgram setWizardSetp={setWizardSetp} />;
      case 1:
        return <WizardEnrollment setWizardSetp={setWizardSetp} />;
      case 2:
        return <WizardSocioEconomics setWizardSetp={setWizardSetp} />;
      case 3:
        return <WizardAttendance setWizardSetp={setWizardSetp} />;
      case 4:
        return <WizardPerformance setWizardSetp={setWizardSetp} />;
      case 5:
        return <WizardFinalResult setWizardSetp={setWizardSetp} />;
      case 6:
        return <WizardTransfer setWizardSetp={setWizardSetp} />;
      case 7:
        return <WizardConfigDone />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Stepper
        activeStep={wizardStep}
        connectorStateColors={true}
        styleConfig={{
          size: 40,
          activeBgColor: "blue",
          completedBgColor: "green",
        }}
        connectorStyleConfig={{
          activeColor: "green",
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => {
              setWizardSetp(index);
            }}
            label={step.label}
          />
        ))}
      </Stepper>
      <RenderContent />
    </>
  );
}
