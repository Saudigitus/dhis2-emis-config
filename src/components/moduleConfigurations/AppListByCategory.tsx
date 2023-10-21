import React from "react";
import { DashboardCard, Title } from "../../components";
import style from "../../pages/appsOverview/overview.module.css"
import { v4 as uuidv4 } from 'uuid'
import { type CardProps } from "../../components/card/CardComponent";
import { getCategoryName, getCorrespondingColor, getIconUrl } from "../../utils/functions";
import { type DataStoreAppInterf, type Dhis2AppInterf, type AppListByCategoryProps } from "../../types/moduleConfigurations";

export default function AppListByCategory({ category, data }: AppListByCategoryProps): React.ReactElement {
    return (
        <div className={style.section}>
            <Title label={getCategoryName(category)} />
            <div className={style.containerCards}>
                {
                    data?.dataStoreApps
                        .reduce((prev: CardProps[], curr: DataStoreAppInterf) => {
                            const foundAppFromDhis2: Dhis2AppInterf = data?.dhis2Apps.find((app: { name: string }) => app.name === curr.name)
                            if (
                                curr.category === category &&
                                foundAppFromDhis2 !== undefined &&
                                foundAppFromDhis2 !== null
                            ) {
                                const newPayload: CardProps = {
                                    icon: getIconUrl(foundAppFromDhis2.baseUrl, foundAppFromDhis2.icons),
                                    status: getCorrespondingColor(curr.configKey, category, data?.dataStoreConfigs, data?.dataStoreValues),
                                    timeLabel: "30 min",
                                    configRoute: curr.configRoute,
                                    title: curr.name
                                }
                                prev.push(newPayload)
                            }
                            return prev
                        }, [])
                        .map((app: CardProps) => (
                            <div key={uuidv4()}>
                                <DashboardCard
                                    program={app.program}
                                    icon={app.icon}
                                    title={app.title}
                                    configRoute={app.configRoute}
                                    timeLabel={app.timeLabel}
                                    status={app.status}
                                />
                                &nbsp;&nbsp;
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
