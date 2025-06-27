import { ReactElement } from "react"
import { Center, CircularLoader } from "@dhis2/ui"
import { WithPadding } from "dhis2-semis-components"
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig"

const AppWrapper = ({ children }: { children: ReactElement }) => {
    const { loading } = useGetDataStoreConfig()


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

export default AppWrapper