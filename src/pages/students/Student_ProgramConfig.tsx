/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import React, { useState } from "react";
import { GroupForm, Title, WithPadding } from "../../components";
import { Form } from "react-final-form"
import { Button, CircularLoader } from '@dhis2/ui'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import AppListNotification, { NOTIFICATION_CRITICAL } from "../../components/appList/AppListNotification";

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
    resource: `dataStores/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
  }
}

const mutation = {

}

function StudentsProgram(): React.ReactElement {
  const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInt>({ show: false, message: "", type: "" })
  const { data, error, loading }: any = useDataQuery(query)
  // const [] = useDataMutation(mutation, { lazy: false })

  const getFormFields = (programs: any[]) => ([
    {
      visible: true,
      disabled: false,
      labelName: "Student Program",
      description: 'Tracker Program',
      valueType: "LIST",
      name: "program",
      options: {
        optionSet: {
          id: 'program',
          options: programs.map(prog => ({ value: prog.id, label: prog.displayName }))
        }
      }
    }
  ]
  )
  const onSubmit = async (values: SubmitValue) => {
    try {
      if (values.program) {
        const currentPayload: any = data.dataStoreValues?.find
      } else {
        throw Error("Please Select a program !")
      }
    } catch (err: any) {
      setNotification({ show: true, message: err?.response?.data?.data || err.message, type: NOTIFICATION_CRITICAL })
    }
  }

  return (
    <WithPadding>
      <Title label="Students - Program" />
      <div>
        {console.log("data : ", data)}
        {console.log("error : ", error)}
        {console.log("loading : ", loading)}
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
          data && (
            <div>
              <Form
                onSubmit={onSubmit}
                render={
                  ({ handleSubmit }: any) => (
                    <form onSubmit={handleSubmit}>
                      <GroupForm
                        disabled={false}
                        name="Student Program"
                        fields={data.programs?.programs?.length > 0 ? getFormFields(data.programs.programs) : []}
                      />
                      <div style={{ marginTop: '20px', padding: '0px 10px', display: 'flex' }}>
                        <div><Button type="submit" primary>Save</Button></div>
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

export default StudentsProgram;
