/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import { type ProgramSubmitValueProps } from "../../types/moduleConfigurations"
import useShowAlerts from '../commons/useShowAlert'
import dayjs from 'dayjs'
import useUpdateProgramDataStoreMutation from './useUpdateProgramDataStoreMutation'

export default function useSubmitProgramDatas() {
    const [loadingProcessing, setLoadingProcessing] = useState(false)
    const { show, hide } = useShowAlerts()
    const { mutate } = useUpdateProgramDataStoreMutation()

    const submit = async ({ data, program }: ProgramSubmitValueProps) => {
        try {
            if (program !== undefined) {
                setLoadingProcessing(true)
                let payload: any[] = []

                const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "student")

                if (foundElement !== undefined) {
                    payload = data.dataStoreValues.map((el: any) => {
                        if (el.key === foundElement.key) {
                            return {
                                ...foundElement,
                                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                program
                            }
                        }
                        return el
                    })
                } else {
                    payload = [
                        ...data.dataStoreValues,
                        {
                            key: "student",
                            defaults: {
                                currentAcademicYear: dayjs().format('YYYY')
                            },
                            lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            program
                        }
                    ]
                }

                await mutate({ data: payload })
                setLoadingProcessing(false)
                show({
                    message: 'Operation Successfull !',
                    type: { critical: true }
                })
                setTimeout(hide, 3000)
            } else {
                throw Error("Please Select a program !")
            }
        } catch (err: any) {
            setLoadingProcessing(false)
            show({
                message: `${(err?.response?.data?.message !== undefined && err?.response?.data?.message !== null) ? err?.response?.data?.message !== undefined : err.message}`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        }
    }
    return { submit, loadingProcessing }
}
