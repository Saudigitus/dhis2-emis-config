/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from "react";
import { Title, WithPadding } from "../../components";
import { ProgramForm } from "../../components/students";

function StudentsProgram(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Program" />
      <ProgramForm />
    </WithPadding>
  );
}

export default StudentsProgram;
