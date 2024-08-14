import React from "react";
import { Title, WithPadding } from "../../components";
import { WizardForm } from "../../components/staffs";

export default function StaffWizard() {
    return (
        <WithPadding>
            <Title label="staff - Wizard" />
            <WizardForm />
        </WithPadding>
    )
}
