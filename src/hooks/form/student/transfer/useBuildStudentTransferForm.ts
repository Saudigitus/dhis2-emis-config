import { useUrlParams } from "dhis2-semis-functions"
import { ConfigCustomAttributeProps, SectionType } from "../../../../types/variables/Variables"
import { getDataStoreConfigKeys } from "../../../../utils/dataStore/dataStoreConfigKeys"
import { getElementOptions } from "../../../../utils/optionSet/getElementOptions"
import { getDataElements } from "../../../../utils/dataStore/common"

function useBuildStudentTransferForm() {
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType

    const buildStudentTransferForm = ({ dataStoreConfig, programStages, formValues }: any) => {
        const formFieldsList: ConfigCustomAttributeProps[] = []
        const dataElements = getDataElements(programStages, formValues?.programStageTransfer)
        const transfer: any = getDataStoreConfigKeys({ dataStoreConfig, sectionType: section, element: "transfer" })
        const { transferStatus, ...mainTransferFields } = transfer


        for (const element in mainTransferFields) {
            const configuratioKey: any = mainTransferFields?.[element]
            if (configuratioKey) {
                formFieldsList.push(
                    {
                        id: element,
                        name: element,
                        required: true,
                        visible: Boolean(configuratioKey?.resource === "programStages" || (configuratioKey?.resource !== "programStages" && formValues?.programStageTransfer)),
                        disabled: false,
                        order: configuratioKey?.order,
                        type: configuratioKey?.inputType,
                        labelName: configuratioKey?.label,
                        description: configuratioKey?.hint,
                        content: configuratioKey?.hint,
                        valueType: configuratioKey?.inputType,
                        displayName: configuratioKey?.label,
                        header: configuratioKey?.label,
                        options: {
                            optionSet: {
                                id: element,
                                options: getElementOptions({
                                    programStages, dataElements,
                                    resource: configuratioKey?.resource,
                                })
                            }
                        }
                    }
                )
            }
        }

        const sortedFields = formFieldsList?.sort((a, b) => a.order - b.order)
        return sortedFields
    }

    return { buildStudentTransferForm }
}

export { useBuildStudentTransferForm }