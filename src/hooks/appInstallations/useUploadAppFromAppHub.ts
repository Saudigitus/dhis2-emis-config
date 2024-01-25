/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { useConfig } from '@dhis2/app-runtime'
import axios from 'axios'
import { useState } from 'react'
import { useUpdateDataStore } from './'
import useShowAlerts from '../commons/useShowAlert'

export interface UploadFromAppHubProps {
          appHubId: string,
          item: { id: any },
          dataStoreAppsRefresh: any
          dhis2AppsRefresh: any
          dataStoreApps: []
}

export default function useUploadAppFromAppHub() {
          const [loading, setLoading] = useState(false)
          const { updateDataStore } = useUpdateDataStore()
          const { show, hide } = useShowAlerts()
          const { baseUrl } = useConfig()

          const upload = async ({ appHubId, dataStoreApps, dataStoreAppsRefresh, dhis2AppsRefresh, item }: UploadFromAppHubProps) => {
                    try {
                              setLoading(true)

                              await axios.post(`${baseUrl}/api/appHub/${appHubId}`)

                              await updateDataStore({ dataStoreApps, item: { id: item.id } })

                              dhis2AppsRefresh()
                              dataStoreAppsRefresh()

                              setLoading(false)

                              show({
                                        message: `Update success !`,
                                        type: { success: true }
                              })
                              setTimeout(hide, 4000)
                    } catch (err: any) {
                              console.log("Error: ", err)
                              setLoading(false)
                              show({
                                        message: `Can't update datastore : ${err.message}`,
                                        type: { critical: true }
                              })
                              setTimeout(hide, 5000)
                    }
          }

          return { upload, loading }
}
