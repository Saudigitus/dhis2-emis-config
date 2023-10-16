import { type CustomAttributeProps } from "../../types/table/AttributeColumns"
import { getDataStoreElement } from "../../utils/functions"

export default function useGetSocioEconomicsFormFields() {
    const getFormFields = (data: { dataStoreConfigs: any[] }, programStages: any[]) => {
        const formFieldsList: CustomAttributeProps[] = []
        const foundProgramStage = getDataStoreElement({ dataStores: data.dataStoreConfigs, key: "student", elementKey: "socio-economics" })?.programStage

        if (foundProgramStage !== null && foundProgramStage !== undefined) {
            formFieldsList.push(
                {
                    id: "programStage",
                    header: foundProgramStage.label,
                    displayName: foundProgramStage.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundProgramStage.label,
                    description: foundProgramStage.hint,
                    valueType: foundProgramStage.inputType,
                    name: "programStage",
                    options: {
                        optionSet: {
                            id: 'programStage',
                            options: programStages.map((prog: any) => ({ value: prog.id, label: prog.displayName }))
                        }
                    }
                }
            )
        }

        return formFieldsList
    }

    return { getFormFields }
}
