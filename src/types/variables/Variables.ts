import { CustomAttributeProps } from "dhis2-semis-types"

type SectionType = "student" | "staff"

export type { SectionType }

interface ConfigCustomAttributeProps
    extends CustomAttributeProps {
    order: number
}

export type { ConfigCustomAttributeProps }