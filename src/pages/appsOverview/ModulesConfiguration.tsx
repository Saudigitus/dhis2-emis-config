/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from "react";
import { WithPadding } from "../../components";
import { CircularLoader } from '@dhis2/ui'
import { useFetchDatas } from "../../hooks/moduleConfigurations";
import { type FetchDatasProps } from "../../types/moduleConfigurations";
import { AppListByCategory } from "../../components/moduleConfigurations";
import style from "./overview.module.css"

function AppsConfiguration(): React.ReactElement {
  const { data, error, loading }: FetchDatasProps = useFetchDatas()

  return (
    <WithPadding>
      <div className={style.bodyContainer}>
        {
          Boolean(loading) && (
            <div className={style.overviewLoadingContainer}>
              <CircularLoader small />
              <span className={style.overviewMarginLeft}>Loading...</span>
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
              <AppListByCategory data={data} category="student" />
              <AppListByCategory data={data} category="staff" />
            </>
          )
        }
      </div>
    </WithPadding>
  );
}
export default AppsConfiguration;
