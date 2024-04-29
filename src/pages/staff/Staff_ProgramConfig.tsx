/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from "react";
import { Title, WithPadding } from "../../components"
import { ProgramForm } from "../../components/staffs";

function StudentsProgram(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Staffs - Program" />
      <ProgramForm />
    </WithPadding>
  )
}

export default StudentsProgram;
