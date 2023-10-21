/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import { type SubmitEnrollmentValue } from "../../types/students";
import useUpdateConfigValues from '../commons/useUpdateConfigValues';
import useShowAlerts from '../commons/useShowAlert';

export default function useEnrollmentSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
    const { mutate } = useUpdateConfigValues()
    const { show, hide } = useShowAlerts()

    const submit = async (values: SubmitEnrollmentValue, dataStoreValues: any[], dataStoreConfigs: any[]) => {
        try {
            console.log("values: ", values)
            if (values.academicYear !== undefined && values.grade !== undefined && values.section !== undefined && values.programStage !== undefined) {
                setLoadingProcessing(true)
                let payload: any[] = []

                const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "staff")

                const registration = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "registration" })

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
                            key: "staff",
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
                show({
                    message: `Operation success !`,
                    type: { success: true }
                })
                setTimeout(hide, 3000)
            } else {
                throw Error("Please fill all fields !")
            }
        } catch (err: any) {
            setLoadingProcessing(false)
            show({
                message: `Can make update: ${err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }

    return { submit, loadingProcessing }
}
