import React from 'react'
import { NoticeBox, Button } from '@dhis2/ui'
import { GroupForm } from '..'
import { Form } from 'react-final-form'
import { getDataStoreElement } from '../../utils/functions'
import { type SubmitProgramDataProps, type FetchProgramDatasHooksProps } from '../../types/moduleConfigurations'
import useLoadPrograms from '../../hooks/commons/useLoadPrograms'
import { useGetProgramFormField, useSubmitProgramDatas } from '../../hooks/staffs'
import Loading from '../appList/Loading'
import { IoIosArrowRoundForward } from 'react-icons/io'
import style from './index.module.css'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardProgram({ setWizardSetp }: WizardPageProps) {
    const { getFormFields } = useGetProgramFormField()
    const { loadingProcessing, submit }: SubmitProgramDataProps = useSubmitProgramDatas()
    const { data, error, loading }: FetchProgramDatasHooksProps = useLoadPrograms()
    return (
        <>
            <Loading loadings={[loading]} />
            {error !== undefined && error !== null && (
                <NoticeBox title="Configurations" warning>
                    {error.message}
                </NoticeBox>
            )}

            <div className={style.formContent}>
                {data !== undefined && data !== null && (
                    <div>
                        <Form
                            onSubmit={(values: { program: string }) => {
                                submit({
                                    data,
                                    program: values.program,
                                    goToNext: () => {
                                        setWizardSetp(1)
                                    }
                                })
                            }}
                            render={({ handleSubmit }: { handleSubmit: any }) => {
                                return (
                                    data?.programs?.length > 0 && (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Staffs Program"
                                                fields={getFormFields({
                                                    programs: data.programs,
                                                    data
                                                }).map((p) => {
                                                    return {
                                                        ...p,
                                                        defaultValue: getDataStoreElement({
                                                            dataStores: data?.dataStoreValues,
                                                            elementKey: 'program',
                                                            key: 'staff'
                                                        })
                                                    }
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
                                                {getFormFields({
                                                    programs: data.programs,
                                                    data
                                                })?.length > 0 && (
                                                    <div>
                                                        <Button
                                                            primary
                                                            onClick={() => {
                                                                setWizardSetp(1)
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
