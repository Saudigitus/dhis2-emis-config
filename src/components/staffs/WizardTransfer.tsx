import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import Loading from '../appList/Loading'
import useGetTransferField from '../../hooks/students/useGetTransferField'
import useTransferSubmit from '../../hooks/students/useTransferSubmit'

import style from './index.module.css'
import { Form } from 'react-final-form'
import { GroupForm } from '..'
import { type SubmitTransferValue } from '../../types/students'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardTransfer({ setWizardSetp }: WizardPageProps) {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas } = useLoadDataElements()
    const { getFormFields } = useGetTransferField()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { submit, loadingProcessing } = useTransferSubmit()
    const { data, loading, error } = useLoadDataStoreDatas()

    useEffect(() => {
        if (
            data?.dataStoreValues !== undefined &&
            data?.dataStoreValues !== null &&
            data?.dataStoreConfigs !== null &&
            data?.dataStoreConfigs !== undefined
        ) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'student'
            })
            const programStageId = getDataStoreElement({
                dataStores: data?.dataStoreValues,
                elementKey: 'transfer',
                key: 'student'
            })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'transfer',
                key: 'student'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
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
                {data !== undefined && data !== null && (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitTransferValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs, () => {
                                    setWizardSetp(7)
                                })
                            }}
                            initialValues={{
                                programStage: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'student'
                                })?.programStage,
                                destinySchool: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'student'
                                })?.destinySchool,
                                originSchool: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'student'
                                })?.originSchool,
                                status: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'student'
                                })?.status,
                                reason: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'student'
                                })?.reason
                            }}
                            render={({ handleSubmit, form }: any) => {
                                const handleCancel = () => {
                                    // form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "student" })?.programStage)
                                    // form.change("destinySchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "student" })?.destinySchool)
                                    // form.change("originSchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "student" })?.originSchool)
                                    // form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "student" })?.status)
                                }

                                return (
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="transfer"
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
                                                        <Button disabled onClick={handleCancel} type="button">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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
