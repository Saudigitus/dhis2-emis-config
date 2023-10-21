import { Status } from "../../components/appList/AppStatus"
import style from '../../components/appList/AppItem.module.css'

export default function useGetRightColor() {
    const getColor = (status: Status): string => {
        if (status === Status.INSTALLED) {
            return style.borderInstalled
        }

        if (status === Status.DISABLED) {
            return style.borderDisabled
        }

        if (status === Status.NOT_INSTALLED) {
            return style.borderNotInstalled
        }
        return style.borderNotInstalled
    }

    return { getColor }
}
