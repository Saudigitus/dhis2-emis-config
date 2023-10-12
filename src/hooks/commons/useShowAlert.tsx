import { useAlert } from '@dhis2/app-runtime';

interface AlertProps {
    show: ({ type, message }?: { message: string, type: any }) => void
    hide: () => void
}

const useShowAlerts = () => {
    const { show, hide }: AlertProps = useAlert(({ message }: { message: string }) => message, ({ type }: {
        type: Record<string, any>
    }) => ({
        ...type,
        duration: 3000
    }))

    return {
        show,
        hide
    }
}

export default useShowAlerts
