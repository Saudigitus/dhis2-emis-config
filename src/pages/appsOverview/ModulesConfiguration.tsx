/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from "react";
import { DashboardCard, Title, WithPadding } from "../../components";
import style from "./overview.module.css"
import { useDataQuery } from "@dhis2/app-runtime";
import { v4 as uuidv4 } from 'uuid'
import { CircularLoader } from '@dhis2/ui'
import { type CardProps } from "../../components/card/CardComponent";
import { getCategoryName, getCorrespondingColor, getIconUrl } from "../../utils/functions";

interface DataStoreAppInterf {
  id: string | number
  name: string
  category: string
  configKey: string
  configRoute: string
  enabled?: boolean
  appHubId?: string
  appType?: string
  folder?: string
  icon?: string
  updatedAt?: string
}

interface Dhis2AppInterf {
  name: string
  icons: any
  baseUrl: string
}
interface DataProps {
  dataStoreConfigs: any[]
  dataStoreValues: any[]
  dataStoreApps: any[]
  dhis2Apps: any[]
}

const query = {
  dataStoreValues: {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
  },
  dataStoreConfigs: {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
  },
  dataStoreApps: {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`
  },
  dhis2Apps: {
    resource: 'apps',
    params: {
      paging: false,
      fields: ["name", "icons", "baseUrl"],
      filter: "programType:eq:WITH_REGISTRATION"
    }
  }
}

function AppsConfiguration(): React.ReactElement {
  const { data, error, loading }: any = useDataQuery(query)
  // const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })

  function getAppListByCategory(data: DataProps, category: string): React.ReactElement {
    return (
      <div className={style.section}>
        <Title label={getCategoryName(category)} />
        <div className={style.containerCards}>
          {
            data.dataStoreApps
              .reduce((prev: CardProps[], curr: DataStoreAppInterf) => {
                const foundAppFromDhis2: Dhis2AppInterf = data.dhis2Apps.find((app: { name: string }) => app.name === curr.name)
                if (
                  curr.category === category &&
                  foundAppFromDhis2 !== undefined &&
                  foundAppFromDhis2 !== null
                ) {
                  const newPayload: CardProps = {
                    icon: getIconUrl(foundAppFromDhis2.baseUrl, foundAppFromDhis2.icons),
                    status: getCorrespondingColor(curr.configKey, category, data.dataStoreConfigs, data.dataStoreValues),
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

  return (
    <WithPadding>
      <div className={style.bodyContainer}>
        {
          Boolean(loading) && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularLoader small />
              <span style={{ marginLeft: '20px' }}>Loading...</span>
            </div>
          )
        }
        {
          error !== undefined && (
            <div>{error}</div>
          )
        }

        {
          data !== undefined && (
            <>
              {getAppListByCategory(data, "student")}
              {getAppListByCategory(data, "staff")}
            </>
          )
        }
      </div>
    </WithPadding>
  );
}
export default AppsConfiguration;

// {cardsData().map((section, y) => (
//   <div key={y} className={style.section}>
//     <Title label={section.title} />
//     <div className={style.containerCards}>
//       {section.subItem.map((data: any, i: number) => (
//         <div key={i}>
//           <DashboardCard
//             program={data.program}
//             icon={data.icon}
//             title={data.title}
//             configRoute={data.configRoute}
//             timeLabel={data.timeLabel}
//             status={data.status}
//           />
//           &nbsp;&nbsp;
//         </div>
//       ))}
//     </div>
//   </div>
// ))}
