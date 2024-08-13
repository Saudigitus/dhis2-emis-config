import React from "react";
import { Title, WithPadding } from "../../components";
import { WizardForm } from "../../components/students";

export default function StudentWizard() {
  return (
    <WithPadding>
      <Title label="Students - Wizard" />
      <WizardForm />
    </WithPadding>
  );
}
