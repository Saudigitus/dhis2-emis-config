import React from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'

function StaffProgram(): React.ReactElement {
  const formFields = [
    {
      visible: true,
      disabled: false,
      labelName: "Staff Program",
      description: 'Tracker Program',
      label: 'Select a Program',
      valueType: "LIST",
      name: "trackerProgram"
    }
  ]

  const onSubmit = () => { }

  return (
    <WithPadding>
      <Title label="Staff - Program" />
      <div>
        <Form
          onSubmit={onSubmit}
          render={
            ({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <GroupForm
                  disabled={false}
                  name="Staff Program"
                  fields={formFields}
                />
                <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                  <div><Button type="submit" primary>Save</Button></div>
                  <div style={{ marginLeft: '10px' }}><Button type="button">Cancel</Button></div>
                </div>
              </form>
            )
          }
        />
      </div>
    </WithPadding>
  );
}

export default StaffProgram;
