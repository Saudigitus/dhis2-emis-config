import React, { useState, useEffect } from "react";
import { Button, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useGetSocioEconomicsFormFields, useSocioEconomicsSubmit } from "../../hooks/students";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import {
  type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";


import style from './index.module.css'
import { Form } from "react-final-form"
import { type SubmitEnrollmentValue } from "../../types/students";
import { GroupForm } from "..";

interface ZizardProgramProps {
  setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardTransfer({ setWizardSetp }: ZizardProgramProps) {
  const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
  const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
  const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
  const { getFormFields } = useGetSocioEconomicsFormFields()
  const { submit, loadingProcessing } = useSocioEconomicsSubmit()

  useEffect(() => {
    if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
      setNoProgramErrorMessage(null)
      const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
      const studentProgramFilterConfig = getDataStoreElement({ dataStores: data?.dataStoreConfigs, elementKey: "socio-economics", key: "student" })?.programStage?.filter

      if (programId === undefined) {
        setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
      }
      if (programId !== null && programId !== undefined) {
        void getProgramStages(programId, studentProgramFilterConfig)
      }
    }
  }, [data])


  return (
    <>
      {
        console.log(programStagesDatas)
      }
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
              onSubmit={async (values: { programStage: string }) => { await submit({ programStage: values?.programStage }, data?.dataStoreValues, data?.dataStoreConfigs, () => { setWizardSetp(3) }) }}
              render={
                ({ handleSubmit }: { handleSubmit: any }) => {
                  return programStagesDatas?.programStages?.length > 0 && (
                    <form onSubmit={handleSubmit}>
                      <GroupForm
                        disabled={false}
                        name="socio-economics"
                        fields={getFormFields(data, programStagesDatas.programStages)}
                      />
                      <div className={style.btnContainer}>
                        <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                        <div className={style.btnCancel}><Button disabled type="button">Cancel</Button></div>
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
