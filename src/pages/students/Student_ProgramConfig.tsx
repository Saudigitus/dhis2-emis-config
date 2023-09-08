import React from "react";
import { Title, WithPadding } from "../../components";
import { useDataStore } from "../../hooks/appwrapper/useDataStore";
import GenericForm from "../form/Form";
import { useSearchParams} from "react-router-dom";
import { formatFields } from "../../utils/helpers/formatFields";
import { CustomAttributeProps } from "../../types/table/attributeColumns";
import { Attribute } from "../../types/generated/models";
import { CenteredContent, CircularLoader } from "@dhis2/ui"


function StudentsProgram(): React.ReactElement {
  const {  data, loading, error } = useDataStore()

  if (loading) {
    return (
        <CenteredContent>
            <CircularLoader small />
        </CenteredContent>
    )
  }

  const program : CustomAttributeProps [] = [{
      id: "name",
      labelName: "Name",
      displayName: "Name",
      header: "Name",
      disabled: false,
      valueType: Attribute.valueType
        .TEXT as unknown as CustomAttributeProps["valueType"],
      name: "name",
      required: false,
      visible: true,
      description: "Description for the field",
      value:data.program
  }]
  
  return (
    <WithPadding>
      <Title label="Students - Program" />
      {/* <GenericForm fields = {program}/> */}
    </WithPadding>
  );
}

export default StudentsProgram;
