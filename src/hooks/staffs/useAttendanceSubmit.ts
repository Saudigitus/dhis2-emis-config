/* eslint-disable @typescript-eslint/restrict-template-expressions */
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

export default function useAttendanceSubmit() {
    const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
    const { mutate } = useUpdateConfigValues()
    const { show, hide } = useShowAlerts()

    const submit = async ({ dataStoreConfigs, dataStoreValues, values }: SubmitFuctionProps) => {
        try {
            if (values.programStage !== undefined && values.status !== undefined && values.absenceReason !== undefined) {
                setLoadingProcessing(true)
                let payload: any[] = []

                const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "staff")
                const attendance = getDataStoreElement({ dataStores: dataStoreConfigs, key: "staff", elementKey: "attendance" })

                if (foundElement !== undefined) {
                    payload = dataStoreValues.map((el: any) => {
                        if (el.key === foundElement.key) {
                            return {
                                ...foundElement,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                attendance: {
                                    ...attendance,
                                    programStage: values.programStage,
                                    status: values.status,
                                    absenceReason: values.absenceReason
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
                            attendance: {
                                programStage: values.programStage,
                                status: values.status,
                                absenceReason: values.absenceReason,
                                statusOptions: [
                                    {
                                        code: "present",
                                        icon: "correct_blue_fill"
                                    },
                                    {
                                        code: "absent",
                                        icon: "wrong_red_fill"
                                    },
                                    {
                                        code: "late",
                                        icon: "clock_orange_fill"
                                    }
                                ]
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
