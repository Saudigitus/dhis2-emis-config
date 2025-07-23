import { ReactElement, useEffect } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import { WithPadding } from "dhis2-semis-components"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"
import { useRecoilValue } from "recoil"
import { DataStoreConfigState } from "../../atoms/DataStoreSchema"
import { config } from "../../utils/constants/config/config"
import { updateObject } from "../../utils/valuesFormatter/valuesFormatter"
import { useCheckDataStore } from "../../hooks/dataStore/useCheckDataStore"

const CustomAppWrapper = ({ children }: { children: ReactElement }) => {
    const configState = useRecoilValue(DataStoreConfigState)
    const { hasSameStructure } = updateObject(config, configState)
    const { createError, loading, startCheck } = useCheckDataStore('dataStore/semis/config')

    useEffect(() => {
        void startCheck()
        if (!hasSameStructure) {

        }
    }, [])

    if (loading) {
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