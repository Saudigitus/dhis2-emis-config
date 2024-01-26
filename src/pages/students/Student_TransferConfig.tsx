/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from "react";
import { Title, WithPadding } from "../../components";
import TransferForm from "../../components/students/TransferForm";

function StudentsTransfer(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Students - Transfer" />
      <TransferForm />
    </WithPadding>
  )
}

export default StudentsTransfer;
