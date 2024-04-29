/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from "react";
import { NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import {
    type LoadDataElementsResponse,
    type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import FinalResultFormContent from "./FinalResultFormContent";
import useGetFinalResultFormFields from "../../hooks/students/useGetFinalResultFormFields";
import useFinalResultSubmit from "../../hooks/students/useFinalResultSubmit";

export default function FinalResultForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas }: LoadDataElementsResponse = useLoadDataElements()
    const { getFormFields } = useGetFinalResultFormFields()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
    const { submit, loadingProcessing } = useFinalResultSubmit()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
            const programStageId = getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({ dataStores: data?.dataStoreConfigs, elementKey: "final-result", key: "student" })?.programStage?.filter

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
            <FinalResultFormContent
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
