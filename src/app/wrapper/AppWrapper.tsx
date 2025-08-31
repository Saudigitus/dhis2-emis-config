import { ReactElement, useEffect, useState } from "react"
import { WithPadding } from "dhis2-semis-components"
import { useSetRecoilState } from "recoil"
import { useCheckDataStore } from "../../hooks/dataStore/useCheckDataStore"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"
import { SchoolCalendarState } from "../../atoms/schoolCalendar"
import ConfigLoader from "../../components/skeleton/ConfigLoader"

const configKey = 'dataStore/semis/config'
const schoolCalendar = 'dataStore/semis/schoolCalendar'

const CustomAppWrapper = ({ children }: { children: ReactElement }) => {
    const [loadingUpdate, setLoading] = useState<boolean>(true)
    const { loading, startCheck } = useCheckDataStore(configKey)
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setSchoolCalendar = useSetRecoilState(SchoolCalendarState)

    useEffect(() => {
        void startCheck()
        getDataStore(schoolCalendar).then((data: any) => {
            setSchoolCalendar(data?.dataStoreConfig)
        })
    }, [])

    if (loading || loadingUpdate) {
        return (
            <ConfigLoader />
        )
    }

    return (
        <WithPadding p="0">
            {children}
        </WithPadding>
    )
}

export default CustomAppWrapper