import { Status } from "../../components/appList/AppStatus"
import { getIconUrl } from "../../utils/functions"
import type AppItemProps from '../../components/appList/IAppItem'

interface functionProps {
    dataStoreApps: AppItemProps[],
    // dataStoreConfigs: any[],
    dhis2Apps: any[]
}

function removeDuplicates(data: AppItemProps[]) {
    return data.filter((item: any, index: any, self: any) => {
        return index === self.findIndex((t: any) => (
            t.name === item.name
        ));
    });
}

const useFilterApps = () => {

    const filterApps = ({ dataStoreApps, dhis2Apps }: functionProps) => dataStoreApps?.length > 0
        ? removeDuplicates(dataStoreApps).reduce((prev: any, cur: any) => {
            console.log(dataStoreApps, dhis2Apps);
            const appFounded = dhis2Apps?.find((app: any) => app.name?.trim() === cur.name?.trim() && app.appType === "RESOURCE")
            let payload: any = {
                ...cur,
                icon: null
            }

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
