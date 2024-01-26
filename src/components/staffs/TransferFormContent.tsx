
import React from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import style from './ProgramForm.module.css'
import {type  SubmitTransferValue } from "../../types/students";


export default function TransferFormContent(
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
                getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage !== null &&
                getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage !== undefined &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (dataElements !== undefined && dataElements !== null && dataElements.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitTransferValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs)
                            }}
                            initialValues={{
                                programStage: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage,
                                originSchool: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.originSchool,
                                destinySchool: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.destinySchool,
                                status: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.status,
                                reason: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.reason
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const handleCancel = () => {
                                        // form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage)
                                        // form.change("originSchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.originSchool)
                                        // form.change("destinySchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.destinySchool)
                                        // form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.status)
                                    }

                                    return (
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="Enrollment"
                                                    fields={
                                                        getFormFields({
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
                                                    <div className={style.btnCancel}><Button onClick={handleCancel} disabled type="button">Cancel</Button></div>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }
                            }
                        />
                    </div>
                )
            }

            {
                data !== undefined && data !== null &&
                (getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage === null ||
                    getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage === undefined) &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitTransferValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs)
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const handleCancel = () => {
                                        // form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.programStage)
                                        // form.change("originSchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.originSchool)
                                        // form.change("destinySchool", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.destinySchool)
                                        // form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "transfer", key: "staff" })?.status)
                                    }

                                    return (
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <GroupForm
                                                    disabled={false}
                                                    name="Enrollment"
                                                    fields={
                                                        getFormFields({
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
                                                    <div className={style.btnCancel}><Button disabled onClick={handleCancel} type="button">Cancel</Button></div>
                                                </div>
                                            </form>
                                        </div>
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