
import React from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import {
    type SubmitEnrollmentValue
} from "../../types/students";
import style from './ProgramForm.module.css'

export default function EnrollmentFormContent(
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
                getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage !== null &&
                getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage !== undefined &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (dataElements !== undefined && dataElements !== null && dataElements.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitEnrollmentValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs)
                            }}
                            initialValues={{
                                programStage: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage,
                                grade: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.grade,
                                section: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.section,
                                academicYear: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.academicYear
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const handleCancel = () => {
                                        form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage)
                                        form.change("grade", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.grade)
                                        form.change("section", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.section)
                                        form.change("academicYear", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.academicYear)
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
                                                    <div className={style.btnCancel}><Button onClick={handleCancel} type="button">Cancel</Button></div>
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
                (getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage === null ||
                    getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage === undefined) &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (value: SubmitEnrollmentValue) => {
                                await submit(value, data.dataStoreValues, data.dataStoreConfigs)
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const handleCancel = () => {
                                        form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.programStage)
                                        form.change("grade", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.grade)
                                        form.change("section", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.section)
                                        form.change("academicYear", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "registration", key: "student" })?.academicYear)
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
                                                    <div className={style.btnCancel}><Button onClick={handleCancel} type="button">Cancel</Button></div>
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
