/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from "react";
import { NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import useLoadProgramStages from "../../hooks/commons/useLoadProgramStages";
import useLoadDataElements from "../../hooks/commons/useLoadDataElements";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";
import AttendanceFormContent from "./AttendanceFormContent";
import { useAttendanceSubmit, useGetAttendanceFormFields } from "../../hooks/staffs";

export default function AttendanceForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas }: any = useLoadDataElements()
    const { getFormFields } = useGetAttendanceFormFields()
    const { loadingProgramStages, programStagesDatas, getProgramStages }: any = useLoadProgramStages()
    const { data, loading, error }: any = useLoadDataStoreDatas()
    const { submit, loadingProcessing } = useAttendanceSubmit()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "staff" })
            const programStageId = getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "staff" })?.programStage

            if (programId === undefined) {
                setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
            }
            if (programId !== null && programId !== undefined) {
                getProgramStages(programId)
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
