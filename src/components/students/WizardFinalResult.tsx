import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import { type SubmitFinalResultValue, type UseFetchEnrollmentDatasResponse } from '../../types/students'
import Loading from '../appList/Loading'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import useGetFinalResultFormFields from '../../hooks/students/useGetFinalResultFormFields'
import useFinalResultSubmit from '../../hooks/students/useFinalResultSubmit'

import style from './index.module.css'
import { Form } from 'react-final-form'
import { GroupForm } from '..'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardFinalResult({ setWizardSetp }: WizardPageProps) {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas } = useLoadDataElements()
    const { getFormFields } = useGetFinalResultFormFields()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
    const { submit, loadingProcessing } = useFinalResultSubmit()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'student'
            })
            const programStageId = getDataStoreElement({
                dataStores: data?.dataStoreValues,
                elementKey: 'final-result',
                key: 'student'
            })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'final-result',
                key: 'student'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
            }
            if (programId) {
                void getProgramStages(programId, studentProgramFilterConfig)
            }
            if (programStageId) {
                getDataElements(programStageId)
            }
        }
    }, [data])

    return (
        <>
            <Loading loadings={[loading, loadingProgramStages]} />
            {error !== undefined && error !== null && (
                <NoticeBox title="Configurations" warning>
                    {error.message}
                </NoticeBox>
            )}

            {noProgramErrorMessage !== undefined && noProgramErrorMessage !== null && (
                <NoticeBox title="Configuration" warning>
                    {`${noProgramErrorMessage}`}
                </NoticeBox>
            )}

            <div className={style.formContent}>
                {data && (
                    <div>
                        <Form
                            onSubmit={async (values: SubmitFinalResultValue) => {
                                await submit({
                                    values,
                                    dataStoreValues: data.dataStoreValues,
                                    dataStoreConfigs: data.dataStoreConfigs,
                                    goToNext: () => {
                                        setWizardSetp(6)
                                    }
                                })
                            }}
                            initialValues={{
                                programStage: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'final-result',
                                    key: 'student'
                                })?.programStage,
                                status: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'final-result',
                                    key: 'student'
                                })?.status
                            }}
                            render={({ handleSubmit, form }: any) => {
                                const cancelBtn = () => {}

                                return (
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="final-result"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: programStagesDatas.programStages,
                                                    getDataElements,
                                                    dataElements: dataElementsDatas?.dataElements || []
                                                })}
                                            />
                                            <div className={style.btnContainer}>
                                                <div>
                                                    <Button type="submit" primary loading={loadingProcessing}>
                                                        Save
                                                    </Button>
                                                </div>
                                                <div className={style.btnCancel}>
                                                    <Button type="button" disabled onClick={cancelBtn}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                )
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
