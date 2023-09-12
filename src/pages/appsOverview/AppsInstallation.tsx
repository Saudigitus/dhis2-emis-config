/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from "react";
import { WithPadding } from "../../components";
import { Status } from "../../components/appList/AppStatus";
import AppList from "../../components/appList/AppList";
import AppListHeader from "../../components/appList/AppListHeader";

import { useConfig } from '@dhis2/app-runtime'
import axios from "axios";
import { CircularProgress } from "@material-ui/core"
import AppListNotification, { NOTIFICATION_CRITICAL, NOTIFICATION_SUCCESS } from "../../components/appList/AppListNotification";

function AppsInstallation(): React.ReactElement {
  const { baseUrl } = useConfig()
  const [apps, setApps] = useState<any>([])
  const [loadingAppList, setLoadingAppList] = useState(false)
  const [notification, setNotification] = useState<any>({ show: false, message: "", type: "" })

  const getIconUrl = (url: any, icons: any) => {
    if (icons[48] !== undefined) {
      return "".concat(url).concat('/').concat(icons[48])
    }
    if (icons[128] !== undefined) {
      return "".concat(url).concat('/').concat(icons[128])
    }
    if (icons[16] !== undefined) {
      return "".concat(url).concat('/').concat(icons[16])
    }
  }

  const loadAppList = async () => {
    try {
      setLoadingAppList(true)
      const responseDataStoreApps = await axios.get(`${baseUrl}/api/dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`)
      const responseDhis2Apps = await axios.get(`${baseUrl}/api/apps.json`)

      const appList = responseDataStoreApps.data.reduce((prev: any, cur: any) => {
        const appFounded = responseDhis2Apps.data?.find((app: any) => app.name?.trim() === cur.name?.trim() && app.appType === "APP")

        let payload: any = { ...cur }

        if (appFounded !== undefined) {
          payload = {
            ...payload,
            icon: getIconUrl(appFounded.baseUrl, appFounded.icons),
            key: appFounded.key,
            version: appFounded.version,
            launchUrl: appFounded.launchUrl,
            baseUrl: appFounded.baseUrl
          }
        } else {
          payload = { ...payload, status: Status.NOT_INSTALLED }
        }

        prev.push(payload)

        return prev
      }, [])

      console.log("app list : ", appList)
      setApps(appList)
      setLoadingAppList(false)
      return appList
    } catch (err) {
      console.log(err)
      setLoadingAppList(false)
    }
  }

  const updateDataStore = async (item: any) => {
    try {
      const newAppList = await loadAppList()

      if (newAppList?.length > 0) {
        const payloads: any[] = newAppList.map((app: any) => {
          if (app.id === item.id) {
            return {
              ...app,
              updatedAt: new Date(),
              status: Status.INSTALLED
            }
          }
          return app
        })

        await axios.put(`${baseUrl}/api/dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`, payloads)

        setApps(payloads)
        setNotification({ show: true, message: "Operation success !", type: NOTIFICATION_SUCCESS })
      }
    } catch (err: any) {
      console.log(err)
      setNotification({ show: true, message: (Boolean((err.response?.data?.message))) || err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  useEffect(() => {
    void loadAppList()
  }, [])

  return (
    <WithPadding>
      <AppListHeader />
      {
        loadingAppList && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
            <span style={{ marginLeft: '20px' }}>Loading</span>
          </div>
        )
      }
      <>
        <AppList
          data={apps}
          updateDataStore={updateDataStore}
          setNotification={setNotification}
        />
      </>
      <AppListNotification notification={notification} setNotification={setNotification} />
    </WithPadding>
  );
}

export default AppsInstallation;
