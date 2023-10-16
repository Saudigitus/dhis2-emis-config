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
    type LoadProgramStagesResponse,
    type UseFetchEnrollmentDatasResponse
} from "../../types/students";
import Loading from "../appList/Loading";
import useLoadDataStoreDatas from "../../hooks/commons/useLoadDataStoreDatas";

export default function SocioEconomicForm(): React.JSX.Element {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { loadingProgramStages, programStagesDatas, getProgramStages }: LoadProgramStagesResponse = useLoadProgramStages()
    const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
    const { getFormFields } = useGetSocioEconomicsFormFields()
    const { submit, loadingProcessing } = useSocioEconomicsSubmit()

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
                data !== undefined &&
                (programStagesDatas?.programStages !== undefined && programStagesDatas.programStages.length > 0) &&
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
                                ({ handleSubmit }: any) => (
                                    <form onSubmit={handleSubmit}>
                                        <GroupForm
                                            disabled={false}
                                            name="socio-economics"
                                            fields={getFormFields(data, programStagesDatas?.programStages || [])}
                                        />
                                        <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                                            <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                            <div style={{ marginLeft: '10px' }}><Button type="button">Cancel</Button></div>
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
