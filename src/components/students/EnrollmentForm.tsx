/* eslint-disable*/

import React, { useState, useEffect } from "react";
import { NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import useGetEnrollmentField from "../../hooks/students/useGetEnrollmentField";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import useEnrollmentSubmit from "../../hooks/students/useEnrollmentSubmit";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import EnrollmentFormContent from "./EnrollmentFormContent";
import Loading from "../appList/Loading";

export default function EnrollmentForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas } = useLoadDataElements()
    const { getFormFields } = useGetEnrollmentField()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { submit, loadingProcessing } = useEnrollmentSubmit()
    const { data, loading, error } = useLoadDataStoreDatas()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null && data?.dataStoreConfigs !== null && data?.dataStoreConfigs !== undefined) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
            const programStageId = getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({ dataStores: data?.dataStoreConfigs, elementKey: "registration", key: "student" })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
            }

            if (programId !== null && programId !== undefined) {
                getProgramStages(programId, studentProgramFilterConfig)
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

            <EnrollmentFormContent
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
