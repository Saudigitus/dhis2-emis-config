/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { Title, WithPadding } from "../../components";
import FinalResultForm from "../../components/students/FinalResultForm";

function StudentsFinalResults(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Final result" />
      <FinalResultForm />
    </WithPadding>
  );
}

export default StudentsFinalResults;
