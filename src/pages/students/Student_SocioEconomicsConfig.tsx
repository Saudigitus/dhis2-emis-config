import React from "react";
import { Title, WithPadding } from "../../components";

import SocioEconomicForm from "../../components/students/SocioEconomicForm";

function StudentsSocioEconomics(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Socio-economics" />
      <SocioEconomicForm />
    </WithPadding>
  );
}

export default StudentsSocioEconomics;
