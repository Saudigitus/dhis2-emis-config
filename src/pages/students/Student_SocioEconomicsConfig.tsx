import React from "react";
import { Title, WithPadding } from "../../components";
import GenericForm from "../form/Form";
import { formatFields } from "../../utils/helpers/formatFields";
import { useDataStore } from "../../hooks/appwrapper/useDataStore";
import { CenteredContent, CircularLoader } from "@dhis2/ui"

function StudentsSocioEconomics(): React.ReactElement {
  const {  data, loading, error } = useDataStore()

  if (loading) {
    return (
        <CenteredContent>
            <CircularLoader small />
        </CenteredContent>
    )
  }
  return (
    <WithPadding>
      <Title label="Students - Socio-economics" />
      <GenericForm fields = {formatFields(data["socio-economics"], true)}/>
    </WithPadding>
  );
}

export default StudentsSocioEconomics;
