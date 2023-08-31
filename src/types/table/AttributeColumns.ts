import { type Attribute } from '../generated/models';
import { type Access } from "../generated"

export interface CustomAttributeProps {
    id: string
    displayName: string
    header: string
    required: string | boolean
    name: string
    labelName: string
    description?: string
    valueType: typeof Attribute.valueType
    options?: {
        optionSet: {
            id: string
            options: Array<{
                value: string
                label: string
            }>
        }
    }
    visible: boolean
    disabled: boolean
    pattern?: string
    searchable?: boolean
    error?: boolean
    content?: string
    key?: any
    access?: Access
}
