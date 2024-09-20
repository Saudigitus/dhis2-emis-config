import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import Loading from '../appList/Loading'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import useGetTransferField from '../../hooks/staffs/useGetTransferField'
import useTransferSubmit from '../../hooks/staffs/useTransferSubmit'

import style from './index.module.css'
import { Form } from 'react-final-form'
import { GroupForm } from '..'
import { type SubmitTransferValue } from '../../types/students'
import { IoIosArrowRoundForward } from 'react-icons/io'

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
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'staff'
            })
            const programStageId = getDataStoreElement({
                dataStores: data?.dataStoreValues,
                elementKey: 'transfer',
                key: 'staff'
            })?.programStage

            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'transfer',
                key: 'staff'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
            }

            if (programId !== null && programId !== undefined) {
                getProgramStages(programId, studentProgramFilterConfig)
            }
            console.log('programStageId', programStageId)
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
                                    setWizardSetp(4)
                                })
                            }}
                            initialValues={{
                                programStage: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'staff'
                                })?.programStage,
                                originSchool: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'staff'
                                })?.originSchool,
                                destinySchool: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'staff'
                                })?.destinySchool,
                                status: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'staff'
                                })?.status,
                                reason: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'transfer',
                                    key: 'staff'
                                })?.reason
                            }}
                            render={({ handleSubmit }: any) => {
                                return (
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="Enrollment"
                                                    fields={getFormFields({
                                                        dataStoreConfigs: data.dataStoreConfigs,
                                                        programStages: programStagesDatas?.programStages || [],
                                                        getDataElements,
                                                        dataElements: dataElementsDatas?.dataElements || []
                                                    })}
                                                />
                                                <div className={style.flexBetween}>
                                                    <div className={style.flex}>
                                                        <div>
                                                            <Button type="submit" primary loading={loadingProcessing}>
                                                                Save
                                                            </Button>
                                                        </div>
                                                        <div className={style.btnCancel}>
                                                            <Button disabled type="button">
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    {getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'transfer',
                                                        key: 'staff'
                                                    })?.programStage &&
                                                        getDataStoreElement({
                                                            dataStores: data.dataStoreValues,
                                                            elementKey: 'transfer',
                                                            key: 'staff'
                                                        })?.originSchool &&
                                                        getDataStoreElement({
                                                            dataStores: data.dataStoreValues,
                                                            elementKey: 'transfer',
                                                            key: 'staff'
                                                        })?.destinySchool &&
                                                        getDataStoreElement({
                                                            dataStores: data.dataStoreValues,
                                                            elementKey: 'transfer',
                                                            key: 'staff'
                                                        })?.status &&
                                                        getDataStoreElement({
                                                            dataStores: data.dataStoreValues,
                                                            elementKey: 'transfer',
                                                            key: 'staff'
                                                        })?.reason && (
                                                            <div>
                                                                <Button
                                                                    primary
                                                                    onClick={() => {
                                                                        setWizardSetp(4)
                                                                    }}
                                                                >
                                                                    <IoIosArrowRoundForward
                                                                        style={{ fontSize: '20px' }}
                                                                    />
                                                                    Next
                                                                </Button>
                                                            </div>
                                                        )}
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
