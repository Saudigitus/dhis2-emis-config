import React, { useState, useEffect } from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { getDataStoreElement } from '../../utils/functions'
import useLoadProgramStages from '../../hooks/commons/useLoadProgramStages'
import useLoadDataElements from '../../hooks/commons/useLoadDataElements'
import Loading from '../appList/Loading'
import useLoadDataStoreDatas from '../../hooks/commons/useLoadDataStoreDatas'
import { useEnrollmentSubmit, useGetEnrollmentField } from '../../hooks/staffs'

import { Form } from 'react-final-form'
import GroupForm from '../form/GroupForm'
import { IoIosArrowRoundForward } from 'react-icons/io'

import style from './index.module.css'

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
        if (data?.dataStoreValues !== undefined && data?.dataStoreValues !== null) {
            setNoProgramErrorMessage(null)
            const programId = getDataStoreElement({
                dataStores: data.dataStoreValues,
                elementKey: 'program',
                key: 'staff'
            })
            const programStageId = getDataStoreElement({
                dataStores: data?.dataStoreValues,
                elementKey: 'registration',
                key: 'staff'
            })?.programStage
            const staffProgramFilterConfig = getDataStoreElement({
                dataStores: data?.dataStoreConfigs,
                elementKey: 'registration',
                key: 'staff'
            })?.programStage?.filter

            if (programId === undefined) {
                setNoProgramErrorMessage('No programs have been configured. Please configure it before continuing !')
            }

            if (programId !== null && programId !== undefined) {
                getProgramStages(programId, staffProgramFilterConfig)
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
                            onSubmit={async (value: any) => {
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
                                                name="Staff Enrollment"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: programStagesDatas?.programStages,
                                                    getDataElements,
                                                    dataElements:
                                                        dataElementsDatas?.dataElements !== undefined &&
                                                        dataElementsDatas?.dataElements !== null
                                                            ? dataElementsDatas?.dataElements
                                                            : []
                                                }).map((p) => {
                                                    if (p.name === 'programStage') {
                                                        return {
                                                            ...p,
                                                            defaultValue: getDataStoreElement({
                                                                dataStores: data.dataStoreValues,
                                                                elementKey: 'registration',
                                                                key: 'staff'
                                                            })?.programStage
                                                        }
                                                    }
                                                    if (p.name === 'grade') {
                                                        return {
                                                            ...p,
                                                            defaultValue: getDataStoreElement({
                                                                dataStores: data.dataStoreValues,
                                                                elementKey: 'registration',
                                                                key: 'staff'
                                                            })?.grade
                                                        }
                                                    }
                                                    if (p.name === 'section') {
                                                        return {
                                                            ...p,
                                                            defaultValue: getDataStoreElement({
                                                                dataStores: data.dataStoreValues,
                                                                elementKey: 'registration',
                                                                key: 'staff'
                                                            })?.section
                                                        }
                                                    }
                                                    if (p.name === 'academicYear') {
                                                        return {
                                                            ...p,
                                                            defaultValue: getDataStoreElement({
                                                                dataStores: data.dataStoreValues,
                                                                elementKey: 'registration',
                                                                key: 'staff'
                                                            })?.academicYear
                                                        }
                                                    }
                                                    return p
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
                                                    key: 'staff'
                                                })?.programStage &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'staff'
                                                    })?.grade &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'staff'
                                                    })?.section &&
                                                    getDataStoreElement({
                                                        dataStores: data.dataStoreValues,
                                                        elementKey: 'registration',
                                                        key: 'staff'
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
