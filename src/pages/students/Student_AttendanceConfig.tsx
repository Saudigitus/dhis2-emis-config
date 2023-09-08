import React from "react";
import { Title, WithPadding } from "../../components";
import GenericForm from "../form/Form";
import { formatFields } from "../../utils/helpers/formatFields";
import { useDataStore } from "../../hooks/appwrapper/useDataStore";
import { CenteredContent, CircularLoader } from "@dhis2/ui"

function StudentsAttendance(): React.ReactElement {
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
      <Title label="Students - Attendance" />
      <GenericForm fields = {formatFields(data.attendance)}/>
    </WithPadding>
  );
}

export default StudentsAttendance;
