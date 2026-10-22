import { ReactElement, useEffect, useState } from "react"
import { WithPadding } from "dhis2-semis-components"
import { useSetRecoilState } from "recoil"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"
import { SchoolCalendarState } from "../../atoms/schoolCalendar"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"
import { config } from "../../utils/constants/config/config"
import ConfigLoader from "../../components/skeleton/ConfigLoader"
import { D2I18n } from "dhis2-semis-types"

const schoolCalendar = 'dataStore/semis/schoolCalendar'

const CustomAppWrapper = ({ children, i18n }: { children: ReactElement, i18n: D2I18n }) => {
    const [loadingUpdate, setLoading] = useState<boolean>(false)
    const [ready, setReady] = useState<boolean>(false)
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setSchoolCalendar = useSetRecoilState(SchoolCalendarState)
    const setDataStoreConfigState = useSetRecoilState(DataStoreConfigState)

    useEffect(() => {
        // The forms are defined in the code, in the user's language; they are not kept in the dataStore.
        setDataStoreConfigState(config(i18n) as any)
        setReady(true)
        getDataStore(schoolCalendar).then((data: any) => {
            setSchoolCalendar(data?.dataStoreConfig)
        }).catch(() => setSchoolCalendar({}))
    }, [])

    if (!ready || loadingUpdate) {
        return (
            <ConfigLoader i18n={i18n} />
        )
    }

    return (
        <WithPadding p="0">
            {children}
        </WithPadding>
    )
}

export default CustomAppWrapper