/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import { type SubmitEnrollmentValue } from "../../types/students";

export default function useEnrollmentSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)

    const submit = async (values: SubmitEnrollmentValue, dataStoreValues: any[], dataStoreConfigs: any[]) => {
        try {
            if (values.academicYear !== undefined && values.grade !== undefined && values.section !== undefined && values.programStage !== undefined) {
                setLoadingProcessing(true)
                let payload: any[] = []

                const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "student")

                const registration = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "registration" })

                if (foundElement !== undefined) {
                    payload = dataStoreValues.map((el: any) => {
                        if (el.key === foundElement.key) {
                            return {
                                ...foundElement,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                registration: {
                                    ...registration,
                                    programStage: values.programStage,
                                    grade: values.grade,
                                    section: values.section,
                                    academicYear: values.academicYear
                                }
                            }
                        }
                        return el
                    })
                } else {
                    payload = [
                        ...dataStoreValues,
                        {
                            key: "student",
                            lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            registration: {
                                programStage: values.programStage,
                                grade: values.grade,
                                section: values.section,
                                academicYear: values.academicYear
                            }
                        }
                    ]
                }

                await mutate({ data: payload })
                setLoadingProcessing(false)
                setNotification({ show: true, message: "Operation Successfull !", type: NOTIFICATION_SUCCESS })
            } else {
                throw Error("Please fill all fields !")
            }
        } catch (err: any) {
            setLoadingProcessing(false)
            setNotification({ show: true, message: err?.response?.data?.message !== undefined ? err?.response?.data?.message : err.message, type: NOTIFICATION_CRITICAL })
        }
    }

    return { submit, loadingProcessing }
}
