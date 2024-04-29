import React from "react";
import { Title, WithPadding } from "../../components";
import { EnrollmentForm } from "../../components/staffs";

function StaffsEnrollment(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Staffs - Enrollment" />
      <EnrollmentForm />
    </WithPadding>
  );
}

export default StaffsEnrollment;
