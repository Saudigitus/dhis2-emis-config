import React from "react";
import { Title, WithPadding } from "../../components";
import GenericForm from "../form/Form";
import { formatFields } from "../../utils/helpers/formatFields";
import { useDataStore } from "../../hooks/appwrapper/useDataStore";
import { CenteredContent, CircularLoader } from "@dhis2/ui"

function StudentsPerformance(): React.ReactElement {
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
      <Title label="Students - Performance" />
      <GenericForm fields = {formatFields(data.performance)}/>
    </WithPadding>
  );
}

export default StudentsPerformance;
