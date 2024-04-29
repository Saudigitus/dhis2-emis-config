/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { Title, WithPadding } from "../../components";
import AttendanceForm from "../../components/students/AttendanceForm";

function StudentsAttendance(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Attendance" />
      <AttendanceForm />
    </WithPadding>
  );
}

export default StudentsAttendance;
