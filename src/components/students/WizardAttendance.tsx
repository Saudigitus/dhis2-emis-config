import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import { useGetAttendanceFormFields } from '../../hooks/students'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import {
    type SubmitAttendanceValue,
    type LoadDataElementsResponse,
    type UseFetchEnrollmentDatasResponse
} from '../../types/students'
import Loading from '../appList/Loading'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import useAttendanceSubmit from '../../hooks/students/useAttendanceSubmit'

import style from './index.module.css'
import { Form } from 'react-final-form'
import { GroupForm } from '..'
import { IoIosArrowRoundForward } from 'react-icons/io'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardAttendance({ setWizardSetp }: WizardPageProps) {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas }: LoadDataElementsResponse = useLoadDataElements()
    const { getFormFields } = useGetAttendanceFormFields()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { data, loading, error }: UseFetchEnrollmentDatasResponse = useLoadDataStoreDatas()
    const { submit, loadingProcessing } = useAttendanceSubmit()

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
                elementKey: 'attendance',
                key: 'student'
            })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'attendance',
                key: 'student'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
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
                            initialValues={{
                                programStage: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.programStage,
                                absenceReason: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.absenceReason,
                                status: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.status,
                                absentCode: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.statusOptions?.find((x: any) => x.key === 'absent')?.code,
                                presentCode: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.statusOptions?.find((x: any) => x.key === 'present')?.code,
                                lateCode: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.statusOptions?.find((x: any) => x.key === 'late')?.code,
                                leaveCode: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'attendance',
                                    key: 'student'
                                })?.statusOptions?.find((x: any) => x.key === 'leave')?.code
                            }}
                            onSubmit={async (values: SubmitAttendanceValue) => {
                                await submit({
                                    values,
                                    dataStoreValues: data.dataStoreValues,
                                    dataStoreConfigs: data.dataStoreConfigs,
                                    goToNext: () => {
                                        setWizardSetp(4)
                                    }
                                })
                            }}
                            render={({ handleSubmit }: any) => {
                                return (
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Attendance"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: programStagesDatas.programStages,
                                                    getDataElements,
                                                    dataElements:
                                                        dataElementsDatas?.dataElements !== undefined &&
                                                        dataElementsDatas?.dataElements !== null &&
                                                        dataElementsDatas?.dataElements?.length > 0
                                                            ? dataElementsDatas?.dataElements
                                                            : []
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
                                                    elementKey: 'attendance',
                                                    key: 'student'
                                                })?.programStage &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.absenceReason &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.status &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.statusOptions?.find((x: any) => x.key === 'absent')?.code &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.statusOptions?.find((x: any) => x.key === 'present')?.code &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.statusOptions?.find((x: any) => x.key === 'late')?.code &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'attendance',
                                                        key: 'student'
                                                    })?.statusOptions?.find((x: any) => x.key === 'leave')?.code && (
                                                        <div>
                                                            <Button
                                                                primary
                                                                onClick={() => {
                                                                    setWizardSetp(4)
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
