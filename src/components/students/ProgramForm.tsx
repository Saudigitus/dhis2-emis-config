import React from "react";
import { CircularLoader, NoticeBox, Button } from '@dhis2/ui'
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { getDataStoreElement } from "../../utils/functions";
import { useFetchProgramDatas, useGetProgramFormField, useSubmitProgramDatas } from "../../hooks/students";
import {
    type SubmitProgramDataProps,
    type FetchProgramDatasHooksProps
} from "../../types/moduleConfigurations";

export default function ProgramForm(): React.JSX.Element {
    const { getFormFields } = useGetProgramFormField()
    const { loadingProcessing, submit }: SubmitProgramDataProps = useSubmitProgramDatas()
    const { data, error, loading, refetch }: FetchProgramDatasHooksProps = useFetchProgramDatas()
    return (
        <div>
            {
                Boolean(loading) && (
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                        <CircularLoader small />
                        <span style={{ marginLeft: '10px' }}>Loading...</span>
                    </div>
                )
            }
            {
                (error !== undefined || error !== null) && (
                    <NoticeBox title="Configurations" warning>
                        {error.message}
                    </NoticeBox>
                )
            }

            {data !== undefined && (
                <div>
                    <Form
                        onSubmit={(values: { program: string }) => { submit({ data, program: values.program }) }}
                        initialValues={{ program: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "program", key: "student" }) }}
                        render={
                            ({ handleSubmit }: any) => (
                                <form onSubmit={handleSubmit}>
                                    <GroupForm
                                        disabled={false}
                                        name="Student Program"
                                        fields={data.programs?.length > 0 ? getFormFields({ programs: data.programs, data }) : []}
                                    />
                                    <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                                        <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                        <div style={{ marginLeft: '10px' }}><Button onClick={refetch} type="button">Cancel</Button></div>
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
