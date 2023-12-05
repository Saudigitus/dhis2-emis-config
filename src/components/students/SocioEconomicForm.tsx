/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React, { useState, useEffect } from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useGetSocioEconomicsFormFields, useSocioEconomicsSubmit } from "../../hooks/students";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import {
    type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import style from './ProgramForm.module.css'

export default function SocioEconomicForm(): React.JSX.Element {
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
            <Loading loadings={[loading, loadingProgramStages]} />
            {
                (error !== undefined && (data === undefined || data === null)) && (
                    <NoticeBox error>
                        {`${error.message}`}
                    </NoticeBox>
                )
            }
            {
                (noProgramErrorMessage !== undefined && noProgramErrorMessage !== null) && (
                    <NoticeBox title="Configuration" warning>
                        {`${noProgramErrorMessage}`}
                    </NoticeBox>
                )
            }
            {
                data !== undefined && data !== null &&
                (programStagesDatas?.programStages !== undefined && programStagesDatas?.programStages !== null && programStagesDatas.programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (values: { programStage: string }) => { await submit({ programStage: values?.programStage }, data?.dataStoreValues, data?.dataStoreConfigs) }}
                            initialValues={
                                {
                                    programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "socio-economics", key: "student" })?.programStage
                                }
                            }
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelbtn = () => {
                                        form.change('programStage', getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "socio-economics", key: "student" })?.programStage)
                                    }
                                    return (
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="socio-economics"
                                                    fields={getFormFields(data, programStagesDatas?.programStages || [])}
                                                />
                                                <div className={style.btnContainer}>
                                                    <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                                    <div className={style.btnCancel}><Button type="button" onClick={cancelbtn} >Cancel</Button></div>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }
                            }
                        />

                    </div>
                )
            }
        </>
    )
}
