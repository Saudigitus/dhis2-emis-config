import React from "react";
import { WithPadding } from "../../components";
import type AppItemProps from "../../components/appList/IAppItem";
import { Status } from "../../components/appList/AppStatus";
import AppList from "../../components/appList/AppList";
import AppListHeader from "../../components/appList/AppListHeader";

import enrollment from "../../assets/images/home/enrollment.png";
import attendance from "../../assets/images/home/attendance.png";
import performance from "../../assets/images/home/performance.png";
import transfer from "../../assets/images/home/transfer.png";

const apps: AppItemProps[] = [
  {
    id: 1,
    name: "Enrollment App",
    icon: enrollment,
    version: '1.0.0',
    status: Status.INSTALLED,
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Attendance App",
    version: '1.2.0',
    icon: attendance,
    status: Status.INSTALLED,
    updatedAt: new Date()
  },
  {
    id: 3,
    name: "Performance",
    version: '2.0.3',
    icon: performance,
    status: Status.NOT_INSTALLED,
    updatedAt: new Date()
  },
  {
    id: 4,
    name: "Transfer",
    version: '1.3.3',
    icon: transfer,
    status: Status.DISABLED,
    updatedAt: new Date()
  }
]

function AppsInstallation(): React.ReactElement {
  return (
    <WithPadding>
      <AppListHeader />
      <AppList data={apps} />
    </WithPadding>
  );
}

export default AppsInstallation;
