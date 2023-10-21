/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import useUpdateConfigValues from '../commons/useUpdateConfigValues';
import useShowAlerts from '../commons/useShowAlert';

interface FormFieldProps {
    values: { programStages: any }
    dataStoreValues: any[]
    dataStoreConfigs: any[]
}

export default function usePerformanceSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
    const { mutate } = useUpdateConfigValues()
    const { show, hide } = useShowAlerts()

    const submit = async ({ dataStoreConfigs, values, dataStoreValues }: FormFieldProps) => {
        try {
            if (values.programStages !== undefined) {
                setLoadingProcessing(true)

                let payload: any[] = []
                const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "student")
                const performance = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "performance" })

                if (foundElement !== undefined) {
                    payload = dataStoreValues.map((el: any) => {
                        if (el.key === foundElement.key) {
                            return {
                                ...foundElement,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                performance: {
                                    ...performance,
                                    programStages: values.programStages.map((v: any) => ({ programStage: v }))
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
                            performance: {
                                programStages: values.programStages.map((v: any) => ({ programStage: v }))
                            }
                        }
                    ]
                }

                await mutate({ data: payload })
                // refetch()
                setLoadingProcessing(false)
                show({
                    message: `Operation success !`,
                    type: { success: true }
                })
                setTimeout(hide, 5000)
            } else {
                throw Error("Please Select a programStage !")
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
