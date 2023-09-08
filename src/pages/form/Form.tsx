import React, { useState } from "react";
import { Button, ButtonStrip } from "@dhis2/ui";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form";
import { fieldsData } from "./auxFields";
import { type CustomAttributeProps } from "../../types/table/attributeColumns";

interface propsType {
  fields: CustomAttributeProps [],
  formTitle?: string 
}

function GenericForm( props : propsType): React.ReactElement {
    const [values, setvalues] = useState({})

    function onChange(e: any): void {
      setvalues(e)
    }

    return (
    <WithPadding>
      <Title label={props?.formTitle} />
      <Form onSubmit={() => { alert(JSON.stringify(values)) }} initialValues={{ birthdate: '2023-01-01' }}>
        {({ values, pristine, form }) => (
          <form onChange={onChange(values)}>
            <GroupForm
              name={"Basic Information"}
              fields={props.fields}
              disabled={false}
            />
            <br />
            <WithPadding p="10px">
              <ButtonStrip>
                <Button onClick={form.submit} primary disabled={pristine} loading={false}>
                  Save
                </Button>
                <Button disabled={pristine} onClick={form.reset}>Cancel</Button>
              </ButtonStrip>
            </WithPadding>
          </form>
        )}
      </Form>
    </WithPadding>
  );
}
export default GenericForm;
