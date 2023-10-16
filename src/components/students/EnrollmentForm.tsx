/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React, { useState, useEffect } from "react";
import { GroupForm } from "../../components";
import { Form } from "react-final-form"
import { Button, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useInitEnrollmentFormFields } from "../../hooks/students";
import useGetEnrollmentField from "../../hooks/students/useGetEnrollmentField";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import {
    type LoadProgramStagesResponse,
    type LoadDataElementsResponse,
    type SubmitEnrollmentValue,
    type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import useEnrollmentSubmit from "../../hooks/students/useEnrollmentSubmit";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";

export default function EnrollmentForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas }: LoadDataElementsResponse = useLoadDataElements()
    const { getFormFields } = useGetEnrollmentField()
    const { loadingProgramStages, programStagesDatas, getProgramStages }: LoadProgramStagesResponse = useLoadProgramStages()
    const { submit, loadingProcessing } = useEnrollmentSubmit()
    const { data, loading, error, refetch }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
    const { initFields } = useInitEnrollmentFormFields()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
            const programStageId = getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.programStage

            if (programId === undefined) {
                setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
            }
            if (programId !== null && programId !== undefined) {
                getProgramStages(programId)
            }
            if (programStageId) {
                console.log("program stage : id : ", programStageId)
                getDataElements(programStageId)
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
                data !== undefined &&
                (programStagesDatas?.programStages !== undefined && programStagesDatas.programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitEnrollmentValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs)
                            }}
                            // initialValues={initFields(programStagesDatas?.programStages, dataElementsDatas?.dataElements, data?.dataStoreValues)}
                            render={
                                ({ handleSubmit }: any) => (
                                    <form onSubmit={handleSubmit}>
                                        <GroupForm
                                            disabled={false}
                                            name="Enrollment"
                                            fields={
                                                getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: (programStagesDatas?.programStages !== undefined && programStagesDatas?.programStages !== null)
                                                        ? programStagesDatas?.programStages
                                                        : [],
                                                    getDataElements,
                                                    dataElements: (dataElementsDatas?.dataElements !== undefined && dataElementsDatas?.dataElements !== null)
                                                        ? dataElementsDatas?.dataElements
                                                        : []
                                                })}
                                        />
                                        <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                                            <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                            <div style={{ marginLeft: '10px' }}><Button onClick={refetch} type="button">Cancel</Button></div>
                                        </div>
                                    </form>
                                )
                            }
                        />
                    </div>
                )
            }
        </>
    )
}
