import { ReactElement, useEffect, useState } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import { WithPadding } from "dhis2-semis-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"
import { config } from "../../utils/constants/config/config"
import { areObjectsEqual } from "../../utils/valuesFormatter/valuesFormatter"
import { useCheckDataStore } from "../../hooks/dataStore/useCheckDataStore"
import { useCreateDsDir } from "../../hooks/dataStore/useCreateDsDir"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"
import { SchoolCalendarState } from "../../atoms/schoolCalendar"

const configKey = 'dataStore/semis/config'
const schoolCalendar = 'dataStore/semis/schoolCalendar'

const CustomAppWrapper = ({ children }: { children: ReactElement }) => {
    const configState = useRecoilValue(DataStoreConfigState)
    const [loadingUpdate, setLoading] = useState<boolean>(false)
    const { loading, startCheck } = useCheckDataStore(configKey)
    const { createDir } = useCreateDsDir({ keySpace: configKey, setLoading, type: 'update' })
    const { getDataStore } = useGetDataStoreConfig({ setLoading })
    const setSchoolCalendar = useSetRecoilState(SchoolCalendarState)

    useEffect(() => {
        void startCheck()
        if (!areObjectsEqual(config, configState))
            void createDir()
        getDataStore(schoolCalendar).then((data: any) => {
            setSchoolCalendar(data?.dataStoreConfig)
        })
    }, [])

    if (loading || loadingUpdate) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        )
    }

    return (
        <WithPadding p="0">
            {children}
        </WithPadding>
    )
}

export default CustomAppWrapper