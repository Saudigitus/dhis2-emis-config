/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from "react";
import { NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import { useGetAttendanceFormFields } from "../../hooks/students";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import {
    type LoadDataElementsResponse,
    type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import useAttendanceSubmit from "../../hooks/students/useAttendanceSubmit";
import AttendanceFormContent from "./AttendanceFormContent";

export default function AttendanceForm(): React.JSX.Element {
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
                (error !== undefined && (data === undefined || data === null)) && (
                    <NoticeBox error>
                        {`${error?.message}`}
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
            <AttendanceFormContent
                data={data}
                dataElements={dataElementsDatas?.dataElements}
                programStages={programStagesDatas?.programStages}
                loadingProcessing={loadingProcessing}
                submit={submit}
                getDataElements={getDataElements}
                getFormFields={getFormFields}
            />
        </>
    )
}
