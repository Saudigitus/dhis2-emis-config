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
import { type CustomAttributeProps } from "../../types/table/AttributeColumns"

interface NotificationInt {
  show: boolean
  message: string
  type: string
}

interface SubmitValue {
  programStage: string
  absenceReason: string
  status: string
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

function StaffsAttendance(): React.ReactElement {
  const { data, error, loading }: any = useDataQuery(query)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [programStages, setProgramStages] = useState<any[]>([])
  const [dataElements, setDataElements] = useState<any[]>([])
  const { baseUrl } = useConfig()
  const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>(null)

  const [mutate] = useDataMutation(updateDataStoreMutation, {
    onError(error: any) {
      console.log(error)
    }
  })
  const [loadingProgramStages, setLoadingProgramStages] = useState<boolean>(false)

  const loadProgramStage = async (programId: string) => {
    try {
      setLoadingProgramStages(true)
      const response = await axios.get(`${baseUrl}/api/programStages.json?paging=false&filter=program.id:eq:${programId}&fields=id,displayName,programStageDataElements[dataElement[id,displayName]]`)
      const progStages: any[] = response.data.programStages !== undefined ? response.data.programStages : []

      const dataElmts = progStages.reduce((prev: any, curr: any) => {
        prev = prev.concat(curr.programStageDataElements.map((p: any) => p.dataElement))
        return prev
      }, [])
      setProgramStages(progStages)
      setDataElements(dataElmts)
      setLoadingProgramStages(false)
    } catch (err) {
      setLoadingProgramStages(false)
    }
  }

  const onProgramStageSelected = (value: any) => {
    const dataElmts = programStages
      .filter(pr => value?.value !== undefined ? pr.id === value.value : true)
      .reduce((prev: any, curr: any) => {
        prev = prev.concat(curr.programStageDataElements.map((p: any) => p.dataElement))
        return prev
      }, [])
    setDataElements(dataElmts)
  }

  const getFormFields = () => {
    const formFieldsList: CustomAttributeProps[] = []
    const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "attendance" })?.programStage
    const foundAbsenceReason = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "attendance" })?.absenceReason
    const foundStatus = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "attendance" })?.status

    if (foundProgramStage !== undefined) {
      formFieldsList.push(
        {
          visible: true,
          disabled: false,
          labelName: foundProgramStage.label,
          description: foundProgramStage.hint,
          valueType: foundProgramStage.inputType,
          id: "programStage",
          displayName: foundProgramStage.label,
          header: foundProgramStage.label,
          name: "programStage",
          required: true,
          onChange: onProgramStageSelected,
          options: {
            optionSet: {
              id: 'programStage',
              options: programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
            }
          }
        }
      )
    }

    if (foundAbsenceReason !== undefined) {
      formFieldsList.push(
        {
          id: "absenceReason",
          displayName: foundAbsenceReason.label,
          header: foundAbsenceReason.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundAbsenceReason.label,
          description: foundAbsenceReason.hint,
          valueType: foundAbsenceReason.inputType,
          name: "absenceReason",
          options: {
            optionSet: {
              id: 'absenceReason',
              options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
            }
          }
        }
      )
    }

    if (foundStatus !== undefined) {
      formFieldsList.push(
        {
          id: "status",
          displayName: foundStatus.label,
          header: foundStatus.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundStatus.label,
          description: foundStatus.hint,
          valueType: foundStatus.inputType,
          name: "status",
          options: {
            optionSet: {
              id: 'status',
              options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
            }
          }
        }
      )
    }

    return formFieldsList
  }

  const onSubmit = async (values: SubmitValue) => {
    try {
      if (values.programStage !== undefined && values.status !== undefined && values.absenceReason !== undefined) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "staff")

        const attendance = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "attendance" })

        if (foundElement !== undefined) {
          payload = data.dataStoreValues.map((el: any) => {
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
            ...data.dataStoreValues,
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
        setNotification({ show: true, message: "Operation Successfull !", type: NOTIFICATION_SUCCESS })
      } else {
        throw Error("Please fill all fields !")
      }
    } catch (err: any) {
      setLoadingProcessing(false)
      setNotification({ show: true, message: err?.response?.data?.message !== undefined ? err?.response?.data?.message : err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  useEffect(() => {
    if (data?.dataStoreValues !== undefined) {
      setNoProgramErrorMessage(null)
      const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "staff" })
      if (programId === undefined) {
        setNoProgramErrorMessage("No programs have been configured. Please configure it before continuing !")
      }
      void (programId !== undefined && loadProgramStage(programId))
    }
  }, [data])

  return (
    <WithPadding>
      <Title label="Staffs - Attendance" />
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
        (noProgramErrorMessage !== null) && (
          <NoticeBox title="Configuration" warning>
            {`${noProgramErrorMessage}`}
          </NoticeBox>
        )
      }
      {
        data !== undefined && programStages.length > 0 && dataElements.length > 0 && (
          <div>
            <Form
              onSubmit={onSubmit}
              initialValues={
                {
                  programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "staff" })?.programStage,
                  absenceReason: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "staff" })?.absenceReason,
                  status: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "attendance", key: "staff" })?.status
                }
              }
              render={
                ({ handleSubmit }: any) => (
                  <form onSubmit={handleSubmit}>
                    <GroupForm
                      disabled={false}
                      name="Attendance"
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

export default StaffsAttendance;
