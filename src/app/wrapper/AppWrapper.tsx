import { ReactElement, useEffect, useState } from "react"
import { WithPadding } from "dhis2-semis-components"
import { useSetRecoilState } from "recoil"
import { useCheckDataStore } from "../../hooks/dataStore/useCheckDataStore"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"
import { SchoolCalendarState } from "../../atoms/schoolCalendar"
import ConfigLoader from "../../components/skeleton/ConfigLoader"
import { D2I18n } from "dhis2-semis-types"

const configKey = 'dataStore/semis/config'
const schoolCalendar = 'dataStore/semis/schoolCalendar'

const CustomAppWrapper = ({ children, i18n }: { children: ReactElement, i18n: D2I18n }) => {
    const [loadingUpdate, setLoading] = useState<boolean>(false)
    const { loading, startCheck } = useCheckDataStore(configKey, i18n)
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