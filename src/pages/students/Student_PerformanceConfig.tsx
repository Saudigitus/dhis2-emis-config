import React from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'

function StudentsPerformance(): React.ReactElement {
  const formFields = [
    {
      visible: true,
      disabled: false,
      labelName: "Performance/marks Program Stages",
      description: 'Non-repeatable ProgramStage(not used in other settings)',
      valueType: "LIST",
      name: "performance"
    }
  ]

  const onSubmit = () => { }
  return (
    <WithPadding>
      <Title label="Students - Performance" />
      <div>
        <Form
          onSubmit={onSubmit}
          render={
            ({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <GroupForm
                  disabled={false}
                  name="Performance"
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

export default StudentsPerformance;
