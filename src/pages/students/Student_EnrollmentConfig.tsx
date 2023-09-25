import React from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'

function StudentsEnrollment(): React.ReactElement {
  const formFields = [
    {
      visible: true,
      disabled: false,
      labelName: "Registration Program Stage",
      description: 'Non-repeatable ProgramStage',
      valueType: "LIST",
      name: "registrationProgramStage"
    },
    {
      visible: true,
      disabled: false,
      labelName: "Academic Year",
      description: 'Text Data Element with Option Sets',
      valueType: "LIST",
      name: "academicYear"
    },
    {
      visible: true,
      disabled: false,
      labelName: "Grade",
      description: 'Text Data Element with Option Sets',
      valueType: "LIST",
      name: "grade"
    },
    {
      visible: true,
      disabled: false,
      labelName: "Class/Section",
      description: 'Text Data optionally with Option Sets',
      valueType: "LIST",
      name: "class"
    }
  ]

  const onSubmit = () => { }
  return (
    <WithPadding>
      <Title label="Students - Enrollment" />
      <div>
        <Form
          onSubmit={onSubmit}
          render={
            ({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <GroupForm
                  disabled={false}
                  name="Enrollment"
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

export default StudentsEnrollment;
