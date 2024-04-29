/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { Title, WithPadding } from "../../components";
import { AttendanceForm } from "../../components/staffs";

function StaffsAttendance(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Staffs - Attendance" />
      <AttendanceForm />
    </WithPadding>
  );
}

export default StaffsAttendance;
