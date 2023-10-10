import { Status } from "../../components/appList/AppStatus"
import { getIconUrl } from "../../utils/functions"
import type AppItemProps from '../../components/appList/IAppItem'

interface functionProps {
    dataStoreApps: AppItemProps[]
    dhis2Apps: any[]
}

const useFilterApps = () => {
    const filterApps = ({ dataStoreApps, dhis2Apps }: functionProps) => dataStoreApps?.length > 0
        ? dataStoreApps.reduce((prev: any, cur: any) => {
            const appFounded = dhis2Apps?.find((app: any) => app.name?.trim() === cur.name?.trim() && app.appType === "RESOURCE")

            let payload: any = { ...cur }

            if (appFounded !== undefined && appFounded !== null) {
                payload = {
                    ...payload,
                    icon: getIconUrl(appFounded.baseUrl, appFounded.icons),
                    key: appFounded.key,
                    version: appFounded.version,
                    launchUrl: appFounded.launchUrl,
                    baseUrl: appFounded.baseUrl,
                    status: Status.INSTALLED
                }
            } else {
                payload = { ...payload, status: Status.NOT_INSTALLED }
            }

            prev.push(payload)

            return prev
        }, [])
        : []

    return { filterApps }
}

export default useFilterApps
