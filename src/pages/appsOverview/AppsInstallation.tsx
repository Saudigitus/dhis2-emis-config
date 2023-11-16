/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from "react";
import { WithPadding } from "../../components";
import AppList from "../../components/appList/AppList";
import AppListHeader from "../../components/appList/AppListHeader";
import { CircularProgress } from "@material-ui/core"
import { useGetAppListFromDHIS2, useGetAppListFromDataStore, useGetMe } from "../../hooks/appInstallations";

function AppsInstallation(): React.ReactElement {
  const { me } = useGetMe()
  const { dhis2Apps, loading: loadingDHIS2AppList, refetch: dhis2AppsRefresh } = useGetAppListFromDHIS2()
  const { dataStoreApps, loading: loadingDataStoreAppList, refetch: dataStoreAppsRefresh } = useGetAppListFromDataStore()
  return (
    <WithPadding>
      <AppListHeader />
      {
        (loadingDataStoreAppList || loadingDHIS2AppList) && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
            <span style={{ marginLeft: '20px' }}>Loading</span>
          </div>
        )
      }
      <>
        <AppList
          me={me}
          data={dataStoreApps}
          dhis2Apps={dhis2Apps}
          dhis2AppsRefresh={dhis2AppsRefresh}
          dataStoreAppsRefresh={dataStoreAppsRefresh}
        />
      </>
    </WithPadding>
  );
}

export default AppsInstallation;
