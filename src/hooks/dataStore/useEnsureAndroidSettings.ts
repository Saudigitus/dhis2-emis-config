import { useEffect } from "react"
import useGetDataStoreConfig from "./useGetDataStoreConfig"
import usePostDataStore from "./usePostDataStore"

const ANDROID_SETTINGS_KEY = "dataStore/semis/android"
// Settings read by the SEMIS Android app; there is no screen for them yet
const ANDROID_SETTINGS_DEFAULTS = { syncMode: "AUTO", showAttendanceStatusPrograms: false }

// Creates semis/android with the defaults when it is missing, or adds the missing fields.
// Values already saved are never changed.
export default function useEnsureAndroidSettings() {
    const { getDataStore } = useGetDataStoreConfig({ setLoading: () => { } })
    const { createDataStore } = usePostDataStore()

    useEffect(() => {
        const ensure = async () => {
            let current: Record<string, any> = {}
            try {
                current = (await getDataStore(ANDROID_SETTINGS_KEY))?.dataStoreConfig ?? {}
            } catch (error: any) {
                if (error?.details?.httpStatusCode !== 404) return
            }
            const missing = Object.keys(ANDROID_SETTINGS_DEFAULTS).filter((field) => !(field in current))
            if (!missing.length) return
            await createDataStore({ key: ANDROID_SETTINGS_KEY, data: { ...ANDROID_SETTINGS_DEFAULTS, ...current } })
        }
        ensure().catch(() => { })
    }, [])
}
