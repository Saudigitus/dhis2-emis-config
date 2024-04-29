import React from "react";
import { Title, WithPadding } from "../../components";
import PerformanceForm from "../../components/students/PerformanceForm";

function StudentsPerformance(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Performance" />
      <PerformanceForm />
    </WithPadding>
  );
}

export default StudentsPerformance;
