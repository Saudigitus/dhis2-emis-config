import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import useGetEnrollmentField from '../../hooks/students/useGetEnrollmentField'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import useEnrollmentSubmit from '../../hooks/students/useEnrollmentSubmit'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import Loading from '../appList/Loading'
import style from './index.module.css'

import { Form } from 'react-final-form'
import GroupForm from '../form/GroupForm'
import { type SubmitEnrollmentValue } from '../../types/students'
import { IoIosArrowRoundForward } from 'react-icons/io'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardEnrollment({ setWizardSetp }: WizardPageProps) {
    const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>()
    const { getDataElements, dataElementsDatas } = useLoadDataElements()
    const { getFormFields } = useGetEnrollmentField()
    const { loadingProgramStages, programStagesDatas, getProgramStages } = useLoadProgramStages()
    const { submit, loadingProcessing } = useEnrollmentSubmit()
    const { data, loading, error } = useLoadDataStoreDatas()

    useEffect(() => {
        if (data?.dataStoreValues && data?.dataStoreConfigs) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'student'
            })
            const programStageId = getDataStoreElement({
                dataStores: data?.dataStoreValues,
                elementKey: 'registration',
                key: 'student'
            })?.programStage
            const studentProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'registration',
                key: 'student'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
            }

            if (programId !== null && programId !== undefined) {
                void getProgramStages(programId, studentProgramFilterConfig)
            }
            if (programStageId !== null && programStageId !== undefined) {
                void getDataElements(programStageId)
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
                                programStage: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'registration',
                                    key: 'student'
                                })?.programStage,
                                grade: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'registration',
                                    key: 'student'
                                })?.grade,
                                section: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'registration',
                                    key: 'student'
                                })?.section,
                                academicYear: getDataStoreElement({
                                    dataStores: data.dataStoreValues,
                                    elementKey: 'registration',
                                    key: 'student'
                                })?.academicYear
                            }}
                            onSubmit={async (value: SubmitEnrollmentValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs, () => {
                                    setWizardSetp(2)
                                })
                            }}
                            component={({ handleSubmit, form }) => {
                                return (
                                    programStagesDatas?.programStages?.length > 0 && (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Student Enrollment"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: programStagesDatas?.programStages,
                                                    getDataElements,
                                                    dataElements:
                                                        dataElementsDatas?.dataElements !== undefined &&
                                                        dataElementsDatas?.dataElements !== null
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
                                                    elementKey: 'registration',
                                                    key: 'student'
                                                })?.programStage &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'student'
                                                    })?.grade &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'student'
                                                    })?.section &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'student'
                                                    })?.academicYear && (
                                                        <div>
                                                            <Button
                                                                primary
                                                                onClick={() => {
                                                                    setWizardSetp(2)
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
