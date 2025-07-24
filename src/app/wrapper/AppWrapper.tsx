import { ReactElement, useEffect, useState } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import { WithPadding } from "dhis2-semis-components"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"
import { config } from "../../utils/constants/config/config"
import { areObjectsEqual } from "../../utils/valuesFormatter/valuesFormatter"
import { useCheckDataStore } from "../../hooks/dataStore/useCheckDataStore"
import { useCreateDsDir } from "../../hooks/dataStore/useCreateDsDir"

const CustomAppWrapper = ({ children }: { children: ReactElement }) => {
    const configState = useRecoilValue(DataStoreConfigState)
    const [loadingUpdate, setLoading] = useState<boolean>(false)
    const { loading, startCheck } = useCheckDataStore('dataStore/semis/config')
    const { createDir } = useCreateDsDir({ keySpace: 'dataStore/semis/config', setLoading, type: 'update' })

    useEffect(() => {
        void startCheck()
        if (!areObjectsEqual(config, configState))
            void createDir()
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