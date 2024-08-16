import React from 'react'
import Loading from '../appList/Loading'
import { useGetProgramFormField, useSubmitProgramDatas } from '../../hooks/students'
import useLoadPrograms from '../../hooks/commons/useLoadPrograms'
import { NoticeBox, Button } from '@dhis2/ui'
import { Form } from 'react-final-form'
import GroupForm from '../form/GroupForm'
import { getDataStoreElement } from '../../utils/functions'
import { IoIosArrowRoundForward } from 'react-icons/io'
import style from './index.module.css'

interface WizardPageProps {
    setWizardSetp: React.Dispatch<React.SetStateAction<number>>
}

export default function WizardProgram({ setWizardSetp }: WizardPageProps) {
    const { data, error, loading } = useLoadPrograms()
    const { getFormFields } = useGetProgramFormField()
    const { loadingProcessing, submit } = useSubmitProgramDatas()

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
                            initialValues={{
                                program: getDataStoreElement({
                                    dataStores: data?.dataStoreValues,
                                    elementKey: 'program',
                                    key: 'student'
                                })
                            }}
                            onSubmit={async (values: { program: string }) => {
                                await submit({
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
                                                name="Student Program"
                                                fields={getFormFields({
                                                    programs: data.programs,
                                                    data
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
                                                    elementKey: 'program',
                                                    key: 'student'
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
