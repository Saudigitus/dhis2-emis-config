import React from "react";
import { DashboardCard, Title, WithPadding } from "../../components";
import style from "./overview.module.css"
import { cardsData } from "../../utils/constants/dashboard/dashboardData";

function AppsConfiguration(): React.ReactElement {
  return (
    <WithPadding>
      <div className={style.bodyContainer}>
        {cardsData().map((section, y) => (
          <div key={y} className={style.section}>
            <Title label={section.title} />
            <div className={style.containerCards}>
              {section.subItem.map((data: any, i: number) => (
                <div key={i}>
                  <DashboardCard
                    program={data.program}
                    icon={data.icon}
                    title={data.title}
                    configRoute={data.configRoute}
                    timeLabel={data.timeLabel}
                    status={data.status}
                  />
                  &nbsp;&nbsp;
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WithPadding>
  );
}

export default AppsConfiguration;
