import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import {type SubmitTransferValue } from "../../types/students";
import useUpdateConfigValues from '../commons/useUpdateConfigValues';
import useShowAlerts from '../commons/useShowAlert';

export default function useTransferSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
    const { mutate } = useUpdateConfigValues()
    const { show, hide } = useShowAlerts()

    const submit = async (values: SubmitTransferValue, dataStoreValues: any[], dataStoreConfigs: any[]) => {
        try {
            setLoadingProcessing(true)
            let payload: any[] = []

            if (values.destinySchool === null || values.destinySchool === undefined) {
                throw new Error('Destiny School is required')
            }
            if (values.originSchool === null || values.originSchool === undefined) {
                throw new Error('Origin School is required')
            }
            if (values.programStage === null || values.programStage === undefined) {
                throw new Error('Program Stage is required')
            }

            if (values.status === null || values.status === undefined) {
                throw new Error('Status is required')
            }

            if (values.reason === null || values.reason === undefined) {
                throw new Error('Reason is required')
            }

            const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "staff")

            const transfer = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "transfer" })

            if (foundElement !== undefined) {
                payload = dataStoreValues.map((el: any) => {
                    if (el.key === foundElement.key) {
                        return {
                            ...foundElement,
                            lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            transfer: {
                                ...transfer,
                                programStage: values.programStage,
                                destinySchool: values.destinySchool,
                                originSchool: values.originSchool,
                                status: values.status,
                                reason: values.reason,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                            }
                        }
                    }
                    return el
                })
            } else {
                payload = [
                    ...dataStoreValues, {
                        key: "staff",
                        lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        transfer: {
                            programStage: values.programStage,
                            destinySchool: values.destinySchool,
                            originSchool: values.originSchool,
                            status: values.status,
                            reason: values.reason,
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
