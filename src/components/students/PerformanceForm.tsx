/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React, { useState, useEffect } from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { usePerformanceFormFields, usePerformanceSubmit } from "../../hooks/students";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import style from './ProgramForm.module.css'

export default function PerformanceForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { loadingProgramStages, programStagesDatas, getProgramStages }: any = useLoadProgramStages()
    const { data, loading, error, refetch }: any = useLoadDataStoreDatas()
    const { getFormFields } = usePerformanceFormFields()
    const { loadingProcessing, submit } = usePerformanceSubmit()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })

            if (programId === undefined) {
                setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
            }
            if (programId !== null && programId !== undefined) {
                getProgramStages(programId)
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
                (programStagesDatas?.programStages !== undefined && programStagesDatas.programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={
                                async (values: { programStages: any[] }) => {
                                    await submit({ values, dataStoreConfigs: data?.dataStoreConfigs || [], dataStoreValues: data?.dataStoreValues || [] })
                                    refetch()
                                }
                            }
                            initialValues={{ programStages: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "performance", key: "student" })?.programStages?.map((p: { programStage: string }) => p.programStage) || [] }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelBtn = () => {
                                        form.change('programStages', getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "performance", key: "student" })?.programStages?.map((p: { programStage: string }) => p.programStage) || [])
                                    }
                                    return (
                                        (
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="Performance"
                                                    fields={getFormFields({ dataStoreConfigs: data?.dataStoreConfigs || [], programStages: programStagesDatas?.programStages || [] })}
                                                />
                                                <div className={style.btnContainer}>
                                                    <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                                    <div className={style.btnCancel}><Button onClick={cancelBtn} type="button">Cancel</Button></div>
                                                </div>
                                            </form>
                                        )
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
