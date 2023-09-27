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
import { getIconUrl } from "../../utils/functions";

function AppsInstallation(): React.ReactElement {
  const { baseUrl } = useConfig()
  const [apps, setApps] = useState<any>([])
  const [dhis2Apps, setDhis2Apps] = useState<any>([])
  const [loadingAppList, setLoadingAppList] = useState(false)
  const [notification, setNotification] = useState<any>({ show: false, message: "", type: "" })
  const [me, setMe] = useState<any>(null)

  const loadAppList = async () => {
    try {
      setLoadingAppList(true)
      const responseDataStoreApps = await axios.get(`${baseUrl}/api/dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`)
      const responseDhis2Apps = await axios.get(`${baseUrl}/api/apps.json`)

      setApps(responseDataStoreApps.data)
      setDhis2Apps(responseDhis2Apps.data)
      setLoadingAppList(false)
    } catch (err) {
      setLoadingAppList(false)
    }
  }

  const filterApps = (dataStoreApps: any[], dhis2Apps: any[]) => dataStoreApps.reduce((prev: any, cur: any) => {
    const appFounded = dhis2Apps?.find((app: any) => app.name?.trim() === cur.name?.trim() && app.appType === "RESOURCE")

    let payload: any = { ...cur }

    if (appFounded !== undefined) {
      payload = {
        ...payload,
        icon: getIconUrl(appFounded.baseUrl, appFounded.icons),
        key: appFounded.key,
        version: appFounded.version,
        launchUrl: appFounded.launchUrl,
        baseUrl: appFounded.baseUrl,
        status: Status.INSTALLED
      }
    } else {
      payload = { ...payload, status: Status.NOT_INSTALLED }
    }

    prev.push(payload)

    return prev
  }, [])

  const loadMe = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/me.json?fields=username`)
      setMe(response.data)
    } catch (err) { }
  }

  const updateDataStore = async (item: any) => {
    try {
      if (apps?.length > 0) {
        const payloads: any[] = apps.map((app: any) => {
          if (app.id === item.id) {
            return {
              ...app,
              updatedAt: new Date()
            }
          }
          return app
        })

        await axios.put(`${baseUrl}/api/dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`, payloads)
        setNotification({ show: true, message: "Operation success !", type: NOTIFICATION_SUCCESS })
        void loadAppList()
      }
    } catch (err: any) {
      setNotification({ show: true, message: (Boolean((err.response?.data?.message))) || err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  useEffect(() => {
    void loadAppList()
    void loadMe()
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
          me={me}
          data={apps}
          filterApps={filterApps}
          dhis2Apps={dhis2Apps}
          updateDataStore={updateDataStore}
          setNotification={setNotification}
        />
      </>
      <AppListNotification notification={notification} setNotification={setNotification} />
    </WithPadding>
  );
}

export default AppsInstallation;
