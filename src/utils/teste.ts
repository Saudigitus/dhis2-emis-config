import data from "../../datastore/config.json"
import { getDataStoreElement } from "../../utils/functions"
import { CustomAttributeProps } from "../../types/table/attributeColumns"

interface FormFieldProps {
    programStages: any[]
    dataStoreConfigs: any[]
    dataElements: any[]
    getDataElements: (programStageId: string) => void
}

export default function useGetTransferField() {
    const onProgramStageSelected = (value: any, getDataElements: (programStageId: string) => void) => {
        if (getDataElements !== undefined && getDataElements !== null) {
            getDataElements(value.value)
        }
    }

    const getFormFields = ({ dataStoreConfigs, programStages, dataElements, getDataElements }: FormFieldProps) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.programStage
        const foundDestinySchool = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.destinySchool
        const foundOriginSchool = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.originSchool
        const foundStatus = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.status
        const foundReason = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.reason
        const penddingCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.penddingCode
        const approvedCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.approvedCode
        const reprovedCode = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: "transfer" })?.reprovedCode


        for (const element in data?.[0]?.transfer) {
            const [key, value] = Object.keys(element)

            const foundVar = getDataStoreElement({ dataStores: dataStoreConfigs, key: "student", elementKey: key })

            if (foundVar) {
                formFieldsList.push(
                    {
                        id: key,
                        name: key,
                        visible: true,
                        required: true,
                        disabled: false,
                        labelName: foundVar?.label,
                        description: foundVar?.hint,
                        valueType: foundVar?.inputType,
                        displayName: foundVar?.label,
                        header: foundVar?.label,
                        onChange: (value: any) => { onProgramStageSelected(value, getDataElements) },
                        options: {
                            optionSet: {
                                id: key,
                                options: foundVar?.resource == "programStages" ? programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
                                    : dataElements
                                        .filter((dx: any) => dx.optionSetValue === foundStatus.optionSetValue && dx.valueType === foundStatus.valueType)
                                        .map((dx: any) => ({ value: dx.id, label: dx.displayName }))
                            }
                        }
                    }
                )
            }

        }


        return formFieldsList
    }

    return { getFormFields }
}