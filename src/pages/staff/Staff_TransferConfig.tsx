import React from "react";
import { Title, WithPadding } from "../../components";
import TransferForm from "../../components/staffs/TransferForm";

function StaffTransfer(): React.ReactElement {
  return (
    <WithPadding>
      <Title label="Staffs - Transfer" />
      <TransferForm />
    </WithPadding>
  );
}

export default StaffTransfer;

