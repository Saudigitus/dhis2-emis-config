import React from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'

function StudentsSocioEconomics(): React.ReactElement {
  const formFields = [
    {
      visible: true,
      disabled: false,
      labelName: "Socio-economics Program Stage",
      description: 'Non-repeateable ProgramStage',
      valueType: "LIST",
      name: "socioEconomicProgramStage"
    }
  ]
  const onSubmit = () => { }

  return (
    <WithPadding>
      <Title label="Students - Socio-economics" />
      <div>
        <Form
          onSubmit={onSubmit}
          render={
            ({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <GroupForm
                  disabled={false}
                  name="Socio Economic"
                  fields={formFields}
                />
              </form>
            )
          }
        />
        <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
          <div><Button primary>Save</Button></div>
          <div style={{ marginLeft: '10px' }}><Button>Cancel</Button></div>
        </div>
      </div>
    </WithPadding>
  );
}

export default StudentsSocioEconomics;
