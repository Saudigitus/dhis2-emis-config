import { useShowAlerts } from "dhis2-semis-functions"
import { type FetchError, useDataQuery } from "@dhis2/app-runtime"
import { useSetRecoilState } from "recoil"
import { DataStoreState, SchoolCalendarData } from "dhis2-semis-components"

const query = {
    dataStoreValues: {
        resource: `dataStore/semis/values`
    },
    dataStoreCalendar: {
        resource: `dataStore/semis/schoolCalendar`
    }
}

export default function useGetDataStore(lazy: boolean = false) {
    const setDataStoreDataState = useSetRecoilState(DataStoreState)
    const setSchoolCalendarData = useSetRecoilState(SchoolCalendarData)

    const { show, hide } = useShowAlerts()
    const { error, loading, refetch } = useDataQuery<any>(query, {
        onComplete: (response: any) => {
            setDataStoreDataState(response?.dataStoreValues)
            setSchoolCalendarData(response?.dataStoreCalendar)
        },
        onError: (error: FetchError) => {
            show({
                message: `Can't load resources data store`,
                type: { critical: true }
            })
            setTimeout(hide, 5000)
        },
        lazy,
    })
    return { refetch, loading, error }
}