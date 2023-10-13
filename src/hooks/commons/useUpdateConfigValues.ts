/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useDataMutation } from "@dhis2/app-runtime"

const updateDataStoreMutation: any = {
  resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`,
  type: 'update',
  data: ({ data }: any) => data
}

export default function useUpdateEnrollmentDataStoreMutation() {
  const [mutate] = useDataMutation(updateDataStoreMutation, {
    onError(error: any) {
      console.log(error)
    }
  })
  return { mutate }
}
