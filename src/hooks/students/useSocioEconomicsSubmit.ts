/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react'
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import useUpdateConfigValues from '../commons/useUpdateConfigValues';
import useShowAlerts from '../commons/useShowAlert';

export default function useSocioEconomicsSubmit() {
  const [loadingProcessing, setLoadingProcessing] = useState<any>(false)
  const { mutate } = useUpdateConfigValues()
  const { show, hide } = useShowAlerts()

  const submit = async (values: { programStage: string }, dataStoreValues: any[], dataStoreConfigs: any[]) => {
    try {
      console.log("values: ", values)
      setLoadingProcessing(true)
      let payload: any[] = []
      if (values.programStage === null || values.programStage === undefined) {
        throw new Error("Program Stage is required !")
      }

      const foundElement: any = dataStoreValues?.find((dt: any) => dt.key === "student")

      const socioEconomics = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "socio-economics" })

      if (foundElement !== undefined && foundElement !== null) {
        payload = dataStoreValues.map((el: any) => {
          if (el.key === foundElement.key) {
            return {
              ...foundElement,
              lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              "socio-economics": {
                ...socioEconomics,
                programStage: values.programStage
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
            "socio-economics": {
              programStage: values.programStage
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
