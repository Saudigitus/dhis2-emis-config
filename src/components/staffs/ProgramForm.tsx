import React from "react";
import { CircularLoader, NoticeBox, Button } from '@dhis2/ui'
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { getDataStoreElement } from "../../utils/functions";
import {
    type SubmitProgramDataProps,
    type FetchProgramDatasHooksProps
} from "../../types/moduleConfigurations"
import style from './ProgramForm.module.css'
import useLoadPrograms from "../../hooks/commons/useLoadPrograms";
import { useGetProgramFormField, useSubmitProgramDatas } from "../../hooks/staffs";

export default function ProgramForm(): React.JSX.Element {
    const { getFormFields } = useGetProgramFormField()
    const { loadingProcessing, submit }: SubmitProgramDataProps = useSubmitProgramDatas()
    const { data, error, loading, refetch }: FetchProgramDatasHooksProps = useLoadPrograms()

    return (
        <div>
            {
                Boolean(loading) && (
                    <div className={style.loadingContainer}>
                        <CircularLoader small />
                        <span style={{ marginLeft: '10px' }}>Loading...</span>
                    </div>
                )
            }
            {
                (error !== undefined && error !== null) && (
                    <NoticeBox title="Configurations" warning>
                        {error.message}
                    </NoticeBox>
                )
            }

            {(data !== undefined && data !== null) && (
                <div>
                    <Form
                        onSubmit={(values: { program: string }) => { submit({ data, program: values.program }) }}
                        initialValues={{ program: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "program", key: "staff" }) }}
                        render={
                            ({ handleSubmit }: any) => (
                                <form onSubmit={handleSubmit}>
                                    <GroupForm
                                        disabled={false}
                                        name="Staffs Program"
                                        fields={data.programs?.length > 0 ? getFormFields({ programs: data.programs, data }) : []}
                                    />
                                    <div className={style.btnContainer}>
                                        <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                        <div className={style.btnCancel}><Button onClick={refetch} disabled type="button">Cancel</Button></div>
                                    </div>
                                </form>
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}
