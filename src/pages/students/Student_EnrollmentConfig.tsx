/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { Title, WithPadding } from "../../components";
import { EnrollmentForm } from "../../components/students";

function StudentsEnrollment(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Enrollment" />
      <EnrollmentForm />
    </WithPadding>
  );
}

export default StudentsEnrollment;
