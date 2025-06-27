type DataStoreConfigType = {
    key: string;
    lastUpdate: string;
    attendance?: {
        absenceReason?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        programStage?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
        status?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
    };
    "final-result"?: {
        programStage?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
        status?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
    };
    performance?: {
        programStages?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
    };
    program?: {
        program?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            resource: string;
        };
    };
    registration?: {
        academicYear?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        grade?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        programStage?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
        section?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
    };
    "socio-economics"?: {
        programStage?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
    };
    transfer?: {
        destinySchool?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        originSchool?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        programStage?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            order: number;
            resource: string;
        };
        reason?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
        status?: {
            filter: string;
            hint: string;
            inputType: string;
            label: string;
            optionSetValue?: boolean;
            order: number;
            resource: string;
            valueType: string;
        };
    };
};

export type { DataStoreConfigType }