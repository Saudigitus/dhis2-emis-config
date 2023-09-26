/* eslint-disable */

import React, { useState, useEffect } from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button } from '@dhis2/ui'
import AppListNotification, { NOTIFICATION_CRITICAL, NOTIFICATION_SUCCESS } from "../../components/appList/AppListNotification";
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import { useConfig, useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import { CircularLoader } from '@dhis2/ui'
import axios from 'axios'

interface NotificationInt {
  show: boolean
  message: string
  type: string
}

interface SubmitValue {
  programStage: string
}

const query = {
  dataStoreValues: {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
  },
  dataStoreConfigs: {
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
  }
}


const updateDataStoreMutation: any = {
  resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`,
  type: 'update',
  data: ({ data }: any) => data
}

function StudentsSocioEconomics(): React.ReactElement {
  const { data, error, loading }: any = useDataQuery(query)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [programStages, setProgramStages] = useState<Array<any>>([])
  const { baseUrl } = useConfig()
  const [mutate] = useDataMutation(updateDataStoreMutation, {
    onError(error: any) {
      console.log(error)
    },
  })

  const loadProgramStage = async (programId: string) => {
    try {
      const response = await axios.get(`${baseUrl}/api/programStages.json?paging=false&filter=program.id:eq:${programId}&fields=id,displayName,programStageDataElements[dataElement[id,displayName]]`)
      const progStages: Array<any> = response.data.programStages || []
      setProgramStages(progStages)
    } catch (err) { }
  }

  const getFormFields = () => {
    const formFieldsList = []
    const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "socio-economics" })?.programStage

    if (foundProgramStage) {
      formFieldsList.push(
        {
          visible: true,
          disabled: false,
          labelName: foundProgramStage.label,
          description: foundProgramStage.hint,
          valueType: foundProgramStage.inputType,
          name: "programStage",
          options: {
            optionSet: {
              id: 'programStage',
              options: programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
            }
          }
        }
      )
    }

    return formFieldsList
  }


  const onSubmit = async (values: SubmitValue) => {
    try {
      if (values.programStage) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "student")

        const socioEconomics = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "socio-economics" })

        if (foundElement) {
          payload = data.dataStoreValues.map((el: any) => {
            if (el.key === foundElement.key) {
              return {
                ...foundElement,
                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                "socio-economics": {
                  ...socioEconomics,
                  programStage: values.programStage,
                }
              }
            }
            return el
          })
        } else {
          payload = [
            ...data.dataStoreValues,
            {
              key: "student",
              lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              "socio-economics": {
                programStage: values.programStage,
              }
            }
          ]
        }



        console.log("payload: , ", payload)
        await mutate({ data: payload })
        setLoadingProcessing(false)
        setNotification({ show: true, message: "Operation Successfull !", type: NOTIFICATION_SUCCESS })
      } else {
        throw Error("Please Select a programStage !")
      }
    } catch (err: any) {
      setLoadingProcessing(false)
      setNotification({ show: true, message: err?.response?.data?.data || err.message, type: NOTIFICATION_CRITICAL })
    }
  }


  useEffect(() => {
    if (data?.dataStoreValues) {
      const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
      programId && loadProgramStage(programId)
    }
  }, [data])


  return (
    <WithPadding>
      <Title label="Students - Socio-economics" />
      {
        loading && (
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
            <CircularLoader small />
            <span style={{ marginLeft: '10px' }}>Loading...</span>
          </div>
        )
      }
      {
        error && (
          <span>{`${error.message}`}</span>
        )
      }
      {
        data && programStages.length > 0 && (
          <div>
            <Form
              onSubmit={onSubmit}
              initialValues={
                  {
                    programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "socio-economics", key: "student" })?.programStage
                  }
              }
              render={
                ({ handleSubmit }: any) => (
                  <form onSubmit={handleSubmit}>
                    <GroupForm
                      disabled={false}
                      name="socio-economics"
                      fields={getFormFields()}
                    />
                    <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                      <div><Button type="submit" primary loading={loadingProcessing}>Save</Button></div>
                      <div style={{ marginLeft: '10px' }}><Button type="button">Cancel</Button></div>
                    </div>
                  </form>
                )
              }
            />

          </div>
        )
      }
      <AppListNotification notification={notification} setNotification={setNotification} />
    </WithPadding>
  );
}

export default StudentsSocioEconomics;
