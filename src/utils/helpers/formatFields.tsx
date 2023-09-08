import { type CustomAttributeProps } from "../../types/table/attributeColumns"
import { Attribute } from "../../types/generated/models"

export function formatFields (fields : any, socioeconomics : boolean = false){
    let formatedFields : CustomAttributeProps[] = []
    let contr = 0
    
    if(socioeconomics)
        formatedFields[0] = {
            id: fields.label,
            labelName: fields.label,
            displayName: fields.label,
            header: fields.label,
            disabled: false,
            valueType: Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"], 
            name: fields.label,
            required: false,
            visible: true,
            description: fields.hint,
            filter:fields.filter,
            resource:fields.resource,
            fields:'id, name, displayName'
        };
    else
        for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            formatedFields[contr] = {
                id: key,
                labelName: key,
                displayName: key,
                header: key,
                disabled: false,
                valueType: Attribute.valueType.LIST as unknown as CustomAttributeProps["valueType"], 
                name: key,
                required: false,
                visible: true,
                description: fields[key].hint,
                filter:fields[key].filter,
                resource:fields[key].resource,
                fields:'id, name, displayName'
            };
            contr++;
        }
    }
    
    return formatedFields
}