import React from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'

function StaffAttendance(): React.ReactElement {
  const formFields = [
    {
      visible: true,
      disabled: false,
      labelName: "Attendance Program Stage",
      description: 'Repeatable ProgramStage',
      valueType: "LIST",
      name: "attendanceProgramStage"
    },
    {
      visible: true,
      disabled: false,
      labelName: "Attendance Data Element",
      description: 'Text Data Element with Option Sets',
      valueType: "LIST",
      name: "attendanceDataElement"
    },
    {
      visible: true,
      disabled: false,
      labelName: "Absence Reason",
      description: 'Text Data Element with Option Sets',
      valueType: "LIST",
      name: "grade"
    }
  ]

  const onSubmit = () => { }
  return (
    <WithPadding>
      <Title label="Staff - Attendance" />
      <div>
        <Form
          onSubmit={onSubmit}
          render={
            ({ handleSubmit }: any) => (
              <form onSubmit={handleSubmit}>
                <GroupForm
                  disabled={false}
                  name="Attendance"
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

export default StaffAttendance;
