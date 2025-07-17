import { DataStoreProps } from "dhis2-semis-types"

const registrationPostBody = (formValues: any, program: any) => {
    return {
        [formValues?.module]: {
            "enabled": formValues?.enabled,
            "academicYear": formValues.academicYear,
            "grade": formValues.grade,
            "lastUpdate": new Date().toISOString(),
            "programStage": formValues.programStageRegistration,
            "section": formValues.section,
        },
        ...(formValues.programStageSocioEconomic ? {
            "socio-economics": {
                "programStage": formValues.programStageSocioEconomic,
            }
        } : {}),
        "program": formValues.program,
        "key": formValues.key,
        "trackedEntityType": program?.trackedEntityType?.id,
        "defaults": {
            "allowSearching": formValues.allowSearching === "true",
            "currentAcademicYear": formValues.currentAcademicYear,
            "defaultOrder": `${formValues.defaultOrder}:${formValues.orderType}`,
        },
    }
}

const registrationBodyToForm = (dataStoreValues: any, module: string) => {
    return {
        "module": module,
        "program": dataStoreValues?.program,
        "programStageRegistration": dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
        "orderType": dataStoreValues?.defaults?.defaultOrder.split(":")?.[1],
        "programStageSocioEconomic": dataStoreValues?.["socio-economics"]?.programStage,
        "defaultOrder": dataStoreValues?.defaults?.defaultOrder.split(":")?.[0],
        "allowSearching": JSON.stringify(dataStoreValues?.defaults?.allowSearching),
        "currentAcademicYear": dataStoreValues?.defaults?.currentAcademicYear,
    }
}

const finalResultBodyToForm = (dataStoreValues: any, module: string) => {
    return {
        "module": module,
        "program": dataStoreValues?.program,
        "programStageFinalResult": dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
    }
}

const finalResultPostBody = (formValues: any) => {
    return {
        [formValues?.module]: {
            programStage: formValues.programStageFinalResult,
            status: formValues.status
        }
    }
}

const modulePostBody = (formValues: any, program: any, prevData: DataStoreProps) => {

    switch (formValues?.module) {
        case "registration":
            return registrationPostBody(formValues, program);

        case "final-result":
            const prevDataStore = prevData?.find(x => x.program == program.id)
            return { ...finalResultPostBody(formValues), ...prevDataStore }

        default:
            return {};
    }
}

const moduleBodyToForm = (dataStoreValues: any, module: string) => {
    console.log(dataStoreValues, module)

    switch (module) {
        case "registration":
            return registrationBodyToForm(dataStoreValues, module);

        case "final-result":
            return finalResultBodyToForm(dataStoreValues, module);

        default:
            return {};
    }
}


export { modulePostBody, moduleBodyToForm }