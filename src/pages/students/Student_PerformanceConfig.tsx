/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React, { useState, useEffect } from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button, CircularLoader, NoticeBox } from '@dhis2/ui'
import AppListNotification, { NOTIFICATION_CRITICAL, NOTIFICATION_SUCCESS } from "../../components/appList/AppListNotification";
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import { useConfig, useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import axios from 'axios'
import { type CustomAttributeProps } from "../../types/table/AttributeColumns";

interface NotificationInt {
  show: boolean
  message: string
  type: string
}

interface SubmitValue {
  programStages: Array<{
    programStage: string
  }>
}

const query = {
  dataStoreValues: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
  },
  dataStoreConfigs: {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
  }
}

const updateDataStoreMutation: any = {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`,
  type: 'update',
  data: ({ data }: any) => data
}

function StudentsPerformance(): React.ReactElement {
  const { data, error, loading, refetch }: any = useDataQuery(query)
  const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>(null)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [loadingProgramStages, setLoadingProgramStages] = useState<boolean>(false)
  const [programStages, setProgramStages] = useState<any[]>([])
  const { baseUrl } = useConfig()
  const [mutate] = useDataMutation(updateDataStoreMutation, {
    onError(error: any) {
      console.log(error)
    }
  })

  const loadProgramStage = async (programId: string) => {
    try {
      setLoadingProgramStages(true)
      const response = await axios.get(`${baseUrl}/api/programStages.json?paging=false&filter=program.id:eq:${programId}&fields=id,displayName,programStageDataElements[dataElement[id,displayName]]`)
      const progStages: any[] = response.data?.programStages !== undefined ? response.data.programStages : []
      setProgramStages(progStages)
      setLoadingProgramStages(false)
    } catch (err) { setLoadingProgramStages(false) }
  }

  const getFormFields = () => {
    const formFieldsList: CustomAttributeProps[] = []
    const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "performance" })?.programStages

    if (foundProgramStage !== undefined) {
      formFieldsList.push(
        {
          id: "programStages",
          header: foundProgramStage.label,
          displayName: foundProgramStage.label,
          required: true,
          multiple: true,
          visible: true,
          disabled: false,
          labelName: foundProgramStage.label,
          description: foundProgramStage.hint,
          valueType: foundProgramStage.inputType,
          name: "programStages",
          options: {
            optionSet: {
              id: 'programStages',
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
      if (values.programStages !== undefined) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "student")

        const performance = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "performance" })

        if (foundElement !== undefined) {
          payload = data.dataStoreValues.map((el: any) => {
            if (el.key === foundElement.key) {
              return {
                ...foundElement,
                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                performance: {
                  ...performance,
                  programStages: values.programStages.map(v => ({ programStage: v }))
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
              performance: {
                programStages: values.programStages.map(v => ({ programStage: v }))
              }
            }
          ]
        }

        await mutate({ data: payload })
        refetch()
        setLoadingProcessing(false)
        setNotification({ show: true, message: "Operation Successfull !", type: NOTIFICATION_SUCCESS })
      } else {
        throw Error("Please Select a programStage !")
      }
    } catch (err: any) {
      setLoadingProcessing(false)
      setNotification({ show: true, message: err?.response?.data?.message !== undefined ? err?.response?.data?.message : err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  useEffect(() => {
    if (data?.dataStoreValues !== undefined) {
      setNoProgramErrorMessage(null)
      const programId: string = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
      if (programId === undefined) {
        setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
      }
      void (programId !== undefined ? loadProgramStage(programId) : null)
    }
  }, [data])

  return (
    <WithPadding>
      <Title label="Students - Performance" />
      {
        Boolean(loading) || Boolean(loadingProgramStages)
          ? (
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
              <CircularLoader small />
              <span style={{ marginLeft: '10px' }}>Loading...</span>
            </div>
          )
          : (
            <></>
          )
      }
      {
        (error !== undefined && (data === undefined || data === null)) && (
          <NoticeBox error>
            {`${error !== undefined ? error.message : notification.message}`}
          </NoticeBox>
        )
      }
      {
        (noProgramErrorMessage !== null ) && (
          <NoticeBox title="Configuration" warning>
            {`${noProgramErrorMessage}`}
          </NoticeBox>
        )
      }
      {
        data !== undefined && programStages.length > 0 && (
          <div>
            <Form
              onSubmit={onSubmit}
              initialValues={
                {
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  programStages: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "performance", key: "student" })?.programStages?.map((p: { programStage: string }) => p.programStage) || []
                }
              }
              render={
                ({ handleSubmit }: any) => (
                  <form onSubmit={handleSubmit}>
                    <GroupForm
                      disabled={false}
                      name="Performance"
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

export default StudentsPerformance;
