import React from 'react'
import { AlertBar } from "@dhis2/ui"

interface NotificationObject {
    show: boolean
    message: string
    type: string
}
interface Props {
    notification: NotificationObject
    setNotification: any
}

export const NOTIFICATION_CRITICAL = "NOTIFICATION_CRITICAL"
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS"

const AppListNotification = ({ notification, setNotification }: Props) => {
    const getNotificationContent = () => {
        if (notification?.show) {
            if (notification?.type === NOTIFICATION_CRITICAL) {
                return (
                    <AlertBar critical permanent onHidden={() => setNotification({ show: false, message: null, type: null })}>
                        {notification?.message}
                    </AlertBar>
                )
            }

            if (notification?.type === NOTIFICATION_SUCCESS) {
                return (
                    <AlertBar success onHidden={() => setNotification({ show: false, message: null, type: null })}>
                        {notification?.message}
                    </AlertBar>
                )
            }
        }
    }

    return (
        <div
            style={{
                bottom: 0,
                position: 'fixed',
                maxWidth: '400px',
                left: '40%'
            }}
        >
            {getNotificationContent()}
        </div>
    )
}

export default AppListNotification
