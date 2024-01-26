
import React from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";

import style from './ProgramForm.module.css'
import { type SubmitFinalResultValue } from "../../types/students";

export default function FinalResultFormContent(
    {
        data,
        dataElements,
        programStages,
        getFormFields,
        loadingProcessing,
        submit,
        getDataElements
    }: {
        data: {
            dataStoreValues: any[]
            dataStoreConfigs: any[]
        } | undefined
        programStages: any[] | undefined
        dataElements: any[] | undefined
        submit: any
        getFormFields: any
        loadingProcessing: boolean
        getDataElements: any
    }
): React.JSX.Element {
    return (
        <>
            {
                data !== undefined && data !== null &&
                getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage !== null &&
                getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage !== undefined &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (dataElements !== undefined && dataElements !== null && dataElements.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (values: SubmitFinalResultValue) => {
                                await submit({ values, dataStoreValues: data.dataStoreValues, dataStoreConfigs: data.dataStoreConfigs })
                            }}
                            initialValues={
                                {
                                    programStage: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage,
                                    status: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "final-result", key: "student" })?.status
                                }
                            }
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelBtn = () => {
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="final-result"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: (programStages !== undefined && programStages !== null)
                                                        ? programStages
                                                        : [],
                                                    getDataElements,
                                                    dataElements: (dataElements !== undefined && dataElements !== null)
                                                        ? dataElements
                                                        : []
                                                })}
                                            />
                                            <div className={style.btnContainer}>
                                                <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                                <div className={style.btnCancel}><Button type="button" disabled onClick={cancelBtn}>Cancel</Button></div>
                                            </div>
                                        </form>
                                    )
                                }
                            }
                        />
                    </div>
                )
            }

            {
                data !== undefined && data !== null &&
                (getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage === null ||
                    getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "final-result", key: "student" })?.programStage === undefined) &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (values: SubmitFinalResultValue) => {
                                await submit({ values, dataStoreValues: data.dataStoreValues, dataStoreConfigs: data.dataStoreConfigs })
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelBtn = () => {
                                        //  form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "final-result", key: "student" })?.status)
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="final-result"
                                                fields={getFormFields({
                                                    dataStoreConfigs: data.dataStoreConfigs,
                                                    programStages: (programStages !== undefined && programStages !== null)
                                                        ? programStages
                                                        : [],
                                                    getDataElements,
                                                    dataElements: (dataElements !== undefined && dataElements !== null)
                                                        ? dataElements
                                                        : []
                                                })}
                                            />
                                            <div className={style.btnContainer}>
                                                <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                                                <div className={style.btnCancel}><Button type="button" disabled onClick={cancelBtn}>Cancel</Button></div>
                                            </div>
                                        </form>
                                    )
                                }
                            }
                        />
                    </div>
                )
            }
        </>
    )
}
