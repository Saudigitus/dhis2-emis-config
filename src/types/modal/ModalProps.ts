interface ModalContentInterface {
    formFields: any
    loading: boolean
    onCancel: () => void
    onSubmit: (arg: any) => void
    initialValues?: Record<string, any>
    setTrackedValues?: (value: any) => void
}

interface ModalManagerInterface {
    open: boolean;
    formFields?: any;
    setOpen: (arg: boolean) => void;
    initialValues?: Record<string, any>
}

export type { ModalContentInterface, ModalManagerInterface }