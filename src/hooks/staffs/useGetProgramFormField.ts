import { type ProgramFormFieldProps } from "../../types/moduleConfigurations"
import { type CustomAttributeProps } from "../../types/table/AttributeColumns"

export default function useGetProgramFormField() {
    const getFormFields = ({ data, programs }: ProgramFormFieldProps) => {
        const foundProgram: any = data.dataStoreConfigs?.find((dt: any) => dt.key === "staff")?.program?.program
        if (foundProgram !== undefined) {
            const list: CustomAttributeProps[] = [
                {
                    id: "program",
                    header: foundProgram.label,
                    displayName: foundProgram.label,
                    required: true,
                    visible: true,
                    disabled: false,
                    labelName: foundProgram.label,
                    description: foundProgram.hint,
                    valueType: foundProgram.inputType,
                    name: "program",
                    options: {
                        optionSet: {
                            id: 'program',
                            options: programs.map(prog => ({ value: prog.id, label: prog.displayName }))
                        }
                    }
                }
            ]
            return list
        } else {
            return []
        }
    }

    return { getFormFields }
}
