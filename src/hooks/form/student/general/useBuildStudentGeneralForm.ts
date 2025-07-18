import { DataStoreConfigType } from "../../../../types/dataStore/dataStoreConfigType"
import { ConfigCustomAttributeProps } from "../../../../types/variables/Variables"

function useBuildStudentGeneralForm() {
    const buildStudentGeneralForm = (options: any, attributes: any, dataElements: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        for (const element in dataElements) {
            const configuratioKey: any = dataElements?.[element as keyof DataStoreConfigType["defaults"]]
            if (configuratioKey) {
                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        visible: true,
                        required: configuratioKey?.required != null ? configuratioKey.required : true,
                        disabled: false,
                        type: configuratioKey?.inputType,
                        order: configuratioKey?.order,
                        labelName: configuratioKey?.label,
                        description: configuratioKey?.hint,
                        content: configuratioKey?.hint,
                        valueType: configuratioKey?.inputType,
                        displayName: configuratioKey?.label,
                        header: configuratioKey?.label,
                        options: {
                            optionSet: {
                                id: element,
                                options: configuratioKey?.resource == "attributes" ? [
                                    ...(attributes?.map((attr: any) => ({
                                        value: attr?.trackedEntityAttribute?.id,
                                        label: attr?.trackedEntityAttribute?.displayName
                                    })) || []),
                                ] : configuratioKey?.resource == "custom" ? [...configuratioKey?.options || []] : [...options || []]
                            }
                        }
                    }
                )
            }
        }
        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }
    return { buildStudentGeneralForm }
}

export { useBuildStudentGeneralForm }