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
  academicYear: string
  grade: string
  section: string
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

function StaffsEnrollment(): React.ReactElement {
  const { data, error, loading }: any = useDataQuery(query)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [noProgramErrorMessage, setNoProgramErrorMessage] = useState<any>(null)
  const [programStages, setProgramStages] = useState<any[]>([])
  const [dataElements, setDataElements] = useState<any[]>([])
  const { baseUrl } = useConfig()
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
    const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "registration" })?.programStage
    const foundAcademicYear = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "registration" })?.academicYear
    const foundGrade = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "registration" })?.grade
    const foundSection = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "registration" })?.section

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

    if (foundAcademicYear !== undefined) {
      formFieldsList.push(
        {
          id: "academicYear",
          displayName: foundAcademicYear.label,
          header: foundAcademicYear.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundAcademicYear.label,
          description: foundAcademicYear.hint,
          valueType: foundAcademicYear.inputType,
          name: "academicYear",
          options: {
            optionSet: {
              id: 'academicYear',
              options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
            }
          }
        }
      )
    }

    if (foundGrade !== undefined) {
      formFieldsList.push(
        {
          id: "grade",
          displayName: foundGrade.label,
          header: foundGrade.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundGrade.label,
          description: foundGrade.hint,
          valueType: foundGrade.inputType,
          name: "grade",
          options: {
            optionSet: {
              id: 'grade',
              options: dataElements.map((dx: any) => ({ value: dx.id, label: dx.displayName }))
            }
          }
        }
      )
    }

    if (foundSection !== undefined) {
      formFieldsList.push(
        {
          id: "section",
          displayName: foundSection.label,
          header: foundSection.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundSection.label,
          description: foundSection.hint,
          valueType: foundSection.inputType,
          name: "section",
          options: {
            optionSet: {
              id: 'section',
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
      if (values.academicYear !== undefined && values.grade !== undefined && values.section !== undefined && values.programStage !== undefined) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "staff")

        const registration = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "staff", elementKey: "registration" })

        if (foundElement !== undefined) {
          payload = data.dataStoreValues.map((el: any) => {
            if (el.key === foundElement.key) {
              return {
                ...foundElement,
                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                registration: {
                  ...registration,
                  programStage: values.programStage,
                  grade: values.grade,
                  section: values.section,
                  academicYear: values.academicYear
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
              registration: {
                programStage: values.programStage,
                grade: values.grade,
                section: values.section,
                academicYear: values.academicYear
              }
            }
          ]
        }

        console.log("payload: , ", payload)
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
      <Title label="Staffs - Enrollment" />
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
                  programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "staff" })?.programStage,
                  grade: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "staff" })?.grade,
                  section: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "staff" })?.section,
                  academicYear: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "staff" })?.academicYear
                }
              }
              render={
                ({ handleSubmit }: any) => (
                  <form onSubmit={handleSubmit}>
                    <GroupForm
                      disabled={false}
                      name="Enrollment"
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

export default StaffsEnrollment;
