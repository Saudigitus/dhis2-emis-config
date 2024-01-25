
import React from "react";
import { GroupForm } from "..";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'
import { getDataStoreElement } from "../../utils/functions";
import {
    type SubmitAttendanceValue
} from "../../types/students";
import style from './ProgramForm.module.css'

export default function AttendanceFormContent(
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
                getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage !== null &&
                getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage !== undefined &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (dataElements !== undefined && dataElements !== null && dataElements.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (values: SubmitAttendanceValue) => {
                                await submit({ values, dataStoreValues: data.dataStoreValues, dataStoreConfigs: data.dataStoreConfigs })
                            }}
                            initialValues={
                                {
                                    programStage: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage,
                                    absenceReason: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.absenceReason,
                                    status: getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.status
                                }
                            }
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelBtn = () => {
                                        return window?.location?.reload()
                                        // form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage)
                                        // form.change("absenceReason", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.absenceReason)
                                        // form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.status)
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Attendance"
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
                (getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage === null ||
                    getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage === undefined) &&
                (programStages !== undefined && programStages !== null && programStages.length > 0) &&
                (
                    <div>
                        <Form
                            onSubmit={async (values: SubmitAttendanceValue) => {
                                await submit({ values, dataStoreValues: data.dataStoreValues, dataStoreConfigs: data.dataStoreConfigs })
                            }}
                            render={
                                ({ handleSubmit, form }: any) => {
                                    const cancelBtn = () => {
                                        //  form.change("programStage", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.programStage)
                                        //  form.change("absenceReason", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.absenceReason)
                                        //  form.change("status", getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "attendance", key: "student" })?.status)
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <GroupForm
                                                disabled={false}
                                                name="Attendance"
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
