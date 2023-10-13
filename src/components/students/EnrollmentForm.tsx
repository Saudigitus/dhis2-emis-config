
/* eslint-disable */

import React, { useState, useEffect } from "react";
import { GroupForm } from "../../components";
import { Form } from "react-final-form"
import { Button, CircularLoader, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useFetchEnrollmentDatas } from "../../hooks/students";
import useGetEnrollmentField from "../../hooks/students/useGetEnrollmentField";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import { SubmitEnrollmentValue, type UseFetchEnrollmentDatasResponse } from "../../types/students";
import useEnrollmentSubmit from "../../hooks/students/useEnrollmentSubmit";

export default function EnrollmentForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { data, loading, error, refetch }: UseFetchEnrollmentDatasResponse = useFetchEnrollmentDatas()
    const { getFormFields } = useGetEnrollmentField()
    const { loading: loadingProgramStages, data: programStagesDatas, getProgramStages }: any = useLoadProgramStages()
    const { getDataElements, data: dataElementsDatas }: any = useLoadDataElements()
    const { submit, loadingProcessing } = useEnrollmentSubmit()

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
            {
                Boolean(loading) || Boolean(loadingProgramStages)
                    ? (
                        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                            <CircularLoader small />
                            <span style={{ marginLeft: '10px' }}>Loading...</span>
                        </div>
                    )
                    : (<></>)
            }
            {
                (error !== undefined && (data === undefined || data === null)) && (
                    <NoticeBox error>
                        {`${error.message}`}
                    </NoticeBox>
                )
            }
            {
                (noProgramErrorMessage !== null) && (
                    <NoticeBox title="Configuration" warning>
                        {`${noProgramErrorMessage}`}
                    </NoticeBox>
                )
            }
            {
                data !== undefined && programStagesDatas?.programStages?.length > 0 && dataElementsDatas?.dataElements?.length > 0 && (
                    <div>
                        <Form
                            onSubmit={(value: SubmitEnrollmentValue) => submit(value)}
                            initialValues={
                                {
                                    programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.programStage,
                                    grade: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.grade,
                                    section: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.section,
                                    academicYear: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.academicYear
                                }
                            }
                            render={
                                ({ handleSubmit }: any) => (
                                    <form onSubmit={handleSubmit}>
                                        <GroupForm
                                            disabled={false}
                                            name="Enrollment"
                                            fields={getFormFields({ dataStoreConfigs: data.dataStoreConfigs, programStages: programStagesDatas?.programStages || [], getDataElements, dataElements: dataElementsDatas?.dataElements || [] })}
                                        />
                                        <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                                            <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                            <div style={{ marginLeft: '10px' }}><Button onClick={() => refetch()} type="button">Cancel</Button></div>
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
