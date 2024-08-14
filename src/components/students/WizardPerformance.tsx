import React, { useState, useEffect } from 'react'
import { Button, NoticeBox } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import { usePerformanceFormFields, usePerformanceSubmit } from '../../hooks/students'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import Loading from '../appList/Loading'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import { IoIosArrowRoundForward } from 'react-icons/io'

import style from './index.module.css'
import { Form } from 'react-final-form'
import { GroupForm } from '..'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardPerformance({ setWizardSetp }: WizardPageProps) {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { loadingProgramStages, programStagesDatas, getProgramStages }: any = useLoadProgramStages()
    const { data, loading, error, refetch }: any = useLoadDataStoreDatas()
    const { getFormFields } = usePerformanceFormFields()
    const { loadingProcessing, submit } = usePerformanceSubmit()

    useEffect(() => {
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'student'
            })
            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'performance',
                key: 'student'
            })?.programStages?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
            }
            if (programId !== null && programId !== undefined) {
                getProgramStages(programId, studentProgramFilterConfig)
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
                            initialValues={{
                                programStages:
                                    getDataStoreElement({
                                        dataStores: data?.dataStoreValues,
                                        elementKey: 'performance',
                                        key: 'student'
                                    })?.programStages?.map((p: { programStage: string }) => p.programStage) || []
                            }}
                            onSubmit={async (values: { programStages: any[] }) => {
                                await submit({
                                    values,
                                    dataStoreConfigs: data?.dataStoreConfigs || [],
                                    dataStoreValues: data?.dataStoreValues || [],
                                    goToNext: () => {
                                        setWizardSetp(5)
                                    }
                                })
                                refetch()
                            }}
                            render={({ handleSubmit, form }: any) => {
                                return (
                                    data?.dataStoreConfigs?.length > 0 &&
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Performance"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data?.dataStoreConfigs,
                                                    programStages: programStagesDatas.programStages
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
                                                    dataStores: data?.dataStoreValues,
                                                    elementKey: 'performance',
                                                    key: 'student'
                                                })?.programStages?.map((p: { programStage: string }) => p.programStage)
                                                    ?.length > 0 && (
                                                    <div>
                                                        <Button
                                                            primary
                                                            onClick={() => {
                                                                setWizardSetp(5)
                                                            }}
                                                        >
                                                            <IoIosArrowRoundForward style={{ fontSize: '20px' }} />
                                                            Next
                                                        </Button>
                                                    </div>
                                                )}
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
