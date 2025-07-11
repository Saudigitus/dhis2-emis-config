const registrationPostBody = (formValues: any, program: any) => {
    return {
        [formValues?.module]: {
            "enabled": false,
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
        ...dataStoreValues?.[module],
        "orderType": dataStoreValues?.defaults?.defaultOrder.split(":")?.[1],
        "defaultOrder": dataStoreValues?.defaults?.defaultOrder.split(":")?.[0],
        "allowSearching": JSON.stringify(dataStoreValues?.defaults?.allowSearching),
        "currentAcademicYear": dataStoreValues?.defaults?.currentAcademicYear,
    }
}

const modulePostBody = (formValues: any, program: any) => {
    switch (formValues?.module) {
        case "registration":
            return registrationPostBody(formValues, program);
        default:
            return {};
    }
}

const moduleBodyToForm = (dataStoreValues: any, module: string) => {
    switch (module) {
        case "registration":
            return registrationBodyToForm(dataStoreValues, module);
        default:
            return {};
    }
}


export { modulePostBody, moduleBodyToForm }