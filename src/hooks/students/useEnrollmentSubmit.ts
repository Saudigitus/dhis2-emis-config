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
            setLoadingProcessing(true)
            let payload: any[] = []

            if (values.academicYear === null || values.academicYear === undefined) {
                throw new Error('Academic Year is required')
            }
            if (values.grade === null || values.grade === undefined) {
                throw new Error('Grade is required')
            }
            if (values.programStage === null || values.programStage === undefined) {
                throw new Error('Program Stage is required')
            }

            if (values.section === null || values.section === undefined) {
                throw new Error('Section is required')
            }

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
                                academicYear: values.academicYear,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                            }
                        }
                    }
                    return el
                })
            } else {
                payload = [
                    ...dataStoreValues, {
                        key: "student",
                        lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        registration: {
                            programStage: values.programStage,
                            grade: values.grade,
                            section: values.section,
                            academicYear: values.academicYear,
                            lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                        }
                    }
                ]
            }

            await mutate({ data: payload })
            setLoadingProcessing(false)
            show({
                message: `Operation success !`,
                type: {
                    success: true
                }
            })
            setTimeout(hide, 3000)
        } catch (err: any) {
            setLoadingProcessing(false)
            show({
                message: `Cant make update: ${err.message
                    }`,
                type: {
                    critical: true
                }
            })
            setTimeout(hide, 5000)
        }
    }

    return { submit, loadingProcessing }
}
