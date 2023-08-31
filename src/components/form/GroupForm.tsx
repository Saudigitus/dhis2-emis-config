import { Label } from "@dhis2/ui";
import React from "react";
import WithPadding from "../template/WithPadding";
import GenericFields from "../genericFields/GenericFields";
import { type CustomAttributeProps } from "../../types/table/attributeColumns";

interface FormProps {
    name: string
    fields: CustomAttributeProps[]
    disabled: boolean
}

function GroupForm(props: FormProps) {
    const { fields, disabled } = props

    return (
        <WithPadding p={"5px"}>
            {/* <Subtitle label={name} /> */}
            <WithPadding p={"0px"}>
                {fields?.filter(x => x.visible)?.map((x, i) => {
                    return (
                        <div className="row d-flex align-items-center" key={i}
                            style={{ display: "flex", padding: (x.error ?? false) ? "8px 8px 8px 12px" : "8px 8px 8px 5px", height: (x.error ?? false) ? 102 : "auto" }}>
                            <div className="col-12 col-md-12 d-flex">
                                <Label style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                                    {x.labelName} {x.required === true ? " *" : ""}
                                </Label>
                            </div>
                            <div className="col-12 col-md-6">
                                <GenericFields
                                    attribute={x}
                                    disabled={disabled}
                                    valueType={x.valueType}
                                />
                                <small style={{ color: "#4A5768", fontStyle: "italic" }}>
                                    {x.description}
                                </small>
                                <br />
                                <span style={{ color: "#E53935", marginTop: 20 }}>
                                   {x.content}
                                </span>
                            </div>
                        </div>
                    )
                }
                )}
            </WithPadding>
        </WithPadding>
    )
}

export default GroupForm;
