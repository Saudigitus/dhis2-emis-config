import React, { useState, useEffect } from "react";
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useGetAttendanceFormFields } from "../../hooks/students";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import {
  type SubmitAttendanceValue,
  type LoadDataElementsResponse,
  type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import useAttendanceSubmit from "../../hooks/students/useAttendanceSubmit";

import style from './index.module.css'
import { Form } from "react-final-form"
import { GroupForm } from "..";

interface ZizardProgramProps {
  setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardAttendance({ setWizardSetp }: ZizardProgramProps) {
  const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
  const { getDataElements, dataElementsDatas }: LoadDataElementsResponse = useLoadDataElements()
  const { getFormFields } = useGetAttendanceFormFields()
  const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
  const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
  const { submit, loadingProcessing } = useAttendanceSubmit()

  useEffect(() => {
    if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
      setNoProgramErrorMessage(null)
      const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
      const programStageId = getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage
      const studentProgramFilterConfig = getDataStoreElement({ dataStores: data?.dataStoreConfigs, elementKey: "attendance", key: "student" })?.programStage?.filter

      if (programId === undefined) {
        setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
      }
      if (programId !== null && programId !== undefined) {
        void getProgramStages(programId, studentProgramFilterConfig)
      }
      if (programStageId !== null && programStageId !== undefined) {
        getDataElements(programStageId)
      }
    }
  }, [data])

  return (
    <>
      <Loading loadings={[loading, loadingProgramStages]} />
      {
        (error !== undefined && error !== null) && (
          <NoticeBox title="Configurations" warning>
            {error.message}
          </NoticeBox>
        )
      }

      <div className={style.formContent}>
        {(data !== undefined && data !== null) && (
          <div>
            <Form
              onSubmit={async (values: SubmitAttendanceValue) => {
                await submit({ values, dataStoreValues: data.dataStoreValues, dataStoreConfigs: data.dataStoreConfigs, goToNext: () => { setWizardSetp(4) } })
              }}
              initialValues={
                {
                  programStage: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage,
                  absenceReason: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.absenceReason,
                  status: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.status,
                  absentCode: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.statusOptions?.find((x: any) => x.key === "absent")?.code,
                  presentCode: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.statusOptions?.find((x: any) => x.key === "present")?.code,
                  lateCode: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.statusOptions?.find((x: any) => x.key === "late")?.code,
                  leaveCode: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.statusOptions?.find((x: any) => x.key === "leave")?.code,
                }
              }
              render={
                ({ handleSubmit, form }: any) => {
                  const cancelBtn = () => {
                    // form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage)
                    // form.change("absenceReason", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.absenceReason)
                    // form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.status)
                  }

                  return programStagesDatas?.programStages?.length > 0 && (
                    <form onSubmit={handleSubmit}>
                      <GroupForm
                        disabled={false}
                        name="Attendance"
                        fields={getFormFields({
                          dataStoreConfigs: data.dataStoreConfigs,
                          programStages: programStagesDatas.programStages,
                          getDataElements,
                          dataElements: dataElementsDatas?.dataElements !== undefined && dataElementsDatas?.dataElements !== null && dataElementsDatas?.dataElements?.length > 0
                            ? dataElementsDatas?.dataElements
                            : []
                        })}
                      />
                      <div className={style.btnContainer}>
                        <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                        <div className={style.btnCancel}><Button type="button" disabled onClick={cancelBtn}>Cancel</Button></div>
                      </div>
                    </form>
                  )
                }
              }
            />
          </div>
        )}
      </div>
    </>
  );
}
