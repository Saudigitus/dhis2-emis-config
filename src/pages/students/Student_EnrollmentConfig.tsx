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

function StudentsEnrollment(): React.ReactElement {
  const { data, error, loading }: any = useDataQuery(query)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [programStages, setProgramStages] = useState<Array<any>>([])
  const [dataElements, setDataElements] = useState<Array<any>>([])
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

      const dataElmts = progStages.reduce((prev: any, curr: any) => {
        prev = prev.concat(curr.programStageDataElements.map((p: any) => p.dataElement))
        return prev
      }, [])
      setProgramStages(progStages)
      setDataElements(dataElmts)
    } catch (err) { }
  }

  const onProgramStageSelected = (value: any) => {
    const dataElmts = programStages
      .filter(pr => value?.value ? pr.id === value.value : true)
      .reduce((prev: any, curr: any) => {
        prev = prev.concat(curr.programStageDataElements.map((p: any) => p.dataElement))
        return prev
      }, [])
    setDataElements(dataElmts)
  }

  const getFormFields = () => {
    const formFieldsList = []
    const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "registration" })?.programStage
    const foundAcademicYear = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "registration" })?.academicYear
    const foundGrade = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "registration" })?.grade
    const foundSection = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "registration" })?.section

    if (foundProgramStage) {
      formFieldsList.push(
        {
          visible: true,
          disabled: false,
          labelName: foundProgramStage.label,
          description: foundProgramStage.hint,
          valueType: foundProgramStage.inputType,
          name: "programStage",
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

    if (foundAcademicYear) {
      formFieldsList.push(
        {
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

    if (foundGrade) {
      formFieldsList.push(
        {
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

    if (foundSection) {
      formFieldsList.push(
        {
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
      if (values.academicYear && values.grade && values.section && values.programStage) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "student")

        const registration = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "registration" })

        if (foundElement) {

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
              key: "student",
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
      setNotification({ show: true, message: err?.response?.data?.data || err.message, type: NOTIFICATION_CRITICAL })
    }
  }


  useEffect(() => {
    console.log(data?.dataStoreValues)
    if (data?.dataStoreValues) {
      const programId = getDataStoreElement({ dataStores: data.dataStoreValues, elementKey: "program", key: "student" })
      programId && loadProgramStage(programId)
    }
  }, [data])


  return (
    <WithPadding>
      <Title label="Students - Enrollment" />
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
        data && programStages.length > 0 && dataElements.length > 0 && (
          <div>
            <Form
              onSubmit={onSubmit}
              initialValues={
                {
                  programStage: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.programStage,
                  grade: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.grade,
                  section: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.section,
                  academicYear: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "registration", key: "student" })?.academicYear,
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

export default StudentsEnrollment;
