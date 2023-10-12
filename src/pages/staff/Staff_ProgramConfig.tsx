/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button, CircularLoader } from '@dhis2/ui'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import AppListNotification, { NOTIFICATION_CRITICAL, NOTIFICATION_SUCCESS } from "../../components/appList/AppListNotification";
import dayjs from "dayjs";
import { getDataStoreElement } from "../../utils/functions";
import { type CustomAttributeProps } from "../../types/table/AttributeColumns";
interface NotificationInt {
  show: boolean
  message: string
  type: string
}

interface SubmitValue {
  program: string
}

const query = {
  programs: {
    resource: 'programs',
    params: {
      paging: false,
      fields: ['id', 'displayName', 'programType'],
      filter: "programType:eq:WITH_REGISTRATION"
    }
  },
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

function StaffProgram(): React.ReactElement {
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const { data, error, loading }: any = useDataQuery(query)
  const [mutate] = useDataMutation(updateDataStoreMutation, {
    onError(error) {
      console.log(error)
    }
  })

  const getFormFields = (programs: any[]) => {
    const foundProgram: any = data.dataStoreConfigs?.find((dt: any) => dt.key === "staff")?.program?.program
    if (foundProgram !== undefined) {
      const list: CustomAttributeProps[] = [
        {
          id: "program",
          header: foundProgram.label,
          displayName: foundProgram.label,
          required: true,
          visible: true,
          disabled: false,
          labelName: foundProgram.label,
          description: foundProgram.hint,
          valueType: foundProgram.inputType,
          name: "program",
          options: {
            optionSet: {
              id: 'program',
              options: programs.map(prog => ({ value: prog.id, label: prog.displayName }))
            }
          }
        }
      ]
      return list
    } else {
      return []
    }
  }

  const onSubmit = async (values: SubmitValue) => {
    try {
      if (values.program !== undefined) {
        setLoadingProcessing(true)
        let payload: any[] = []

        const foundElement: any = data.dataStoreValues?.find((dt: any) => dt.key === "staff")

        if (foundElement !== undefined) {
          payload = data.dataStoreValues.map((el: any) => {
            if (el.key === foundElement.key) {
              return {
                ...foundElement,
                lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                program: values.program
              }
            }
            return el
          })
        } else {
          payload = [
            ...data.dataStoreValues,
            {
              key: "staff",
              defaults: {
                currentAcademicYear: dayjs().format('YYYY')
              },
              lastUpdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              program: values.program
            }
          ]
        }

        await mutate({ data: payload })
        setLoadingProcessing(false)
        setNotification({ show: true, message: "Operation Successfull !", type: NOTIFICATION_SUCCESS })
      } else {
        throw Error("Please Select a program !")
      }
    } catch (err: any) {
      setLoadingProcessing(false)
      setNotification({ show: true, message: err?.response?.data?.message !== undefined ? err?.response?.data?.message : err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  return (
    <WithPadding>
      <Title label="Staffs - Program" />
      <div>
        {
          Boolean(loading) && (
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
              <CircularLoader small />
              <span style={{ marginLeft: '10px' }}>Loading...</span>
            </div>
          )
        }
        {
          error !== undefined && (
            <span>{`${error.message}`}</span>
          )
        }
        {
          data !== undefined && (
            <div>
              <Form
                onSubmit={onSubmit}
                initialValues={{ program: getDataStoreElement({ dataStores: data?.dataStoreValues, elementKey: "program", key: "staff" }) }}
                render={
                  ({ handleSubmit }: any) => (
                    <form onSubmit={handleSubmit}>
                      <GroupForm
                        disabled={false}
                        name="Staffs Program"
                        fields={data.programs?.programs?.length > 0 ? getFormFields(data.programs.programs) : []}
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
      </div>
      <AppListNotification notification={notification} setNotification={setNotification} />
    </WithPadding>
  );
}

export default StaffProgram;
