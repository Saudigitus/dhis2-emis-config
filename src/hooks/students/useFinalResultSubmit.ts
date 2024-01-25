import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import useUpdateConfigValues from '../commons/useUpdateConfigValues';
import useShowAlerts from '../commons/useShowAlert';
import { type SubmitAttendanceValue } from '../../types/students';

interface SubmitFuctionProps {
    values: SubmitAttendanceValue
    dataStoreValues: any[]
    dataStoreConfigs: any[]
}

export default function useFinalResultSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
    const { mutate } = useUpdateConfigValues()
    const { show, hide } = useShowAlerts()

    const submit = async ({ dataStoreConfigs, dataStoreValues, values }: SubmitFuctionProps) => {
        try {
            setLoadingProcessing(true)
            let payload: any[] = []

            if (values.programStage === null || values.programStage === undefined) {
                throw new Error("Program stage is required !")
            }

            if (values.status === null || values.status === undefined) {
                throw new Error("Status is required !")
            }

            const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "student")
            const finalResult = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "final-result" })

            if (foundElement !== undefined) {
                payload = dataStoreValues.map((el: any) => {
                    if (el.key === foundElement.key) {
                        return {
                            ...foundElement,
                            lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            "final-result": {
                                ...finalResult,
                                programStage: values.programStage,
                                status: values.status,
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
                        "final-result": {
                            programStage: values.programStage,
                            status: values.status,
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
            setTimeout(hide, 5000)
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
