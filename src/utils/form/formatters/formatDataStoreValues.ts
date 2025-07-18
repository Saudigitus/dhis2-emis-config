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

const attendance = (dataStoreValues: any, module: string) => {
    let data = {}
    dataStoreValues?.[module]?.statusOptions?.map((x: any) => {
        data = { ...data, [`${x.ConfigKey}`]: x.code }
    })

    return {
        "module": module,
        "program": dataStoreValues?.program,
        "programStageAttendance": dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
        ...data
    }
}

const finalResultPostBody = (formValues: any) => {
    return {
        [formValues?.module]: {
            programStage: formValues.programStageFinalResult,
            status: formValues.status,
            lastUpdate: new Date().toISOString(),
        }
    }
}

const attendancePostBody = (formValues: any) => {
    const { absentCode, lateCode, leaveCode, presentCode } = formValues

    return {
        [formValues?.module]: {
            absenceReason: formValues?.absenceReason,
            lastUpdate: new Date().toISOString(),
            programStage: formValues?.programStageAttendance,
            status: formValues?.status,
            statusOptions: [
                ...(presentCode ? [{
                    code: presentCode,
                    color: '#81C784',
                    icon: 'correct_blue_fill',
                    key: presentCode,
                    ConfigKey: `presentCode`,
                }] : []),
                ...(absentCode ? [{
                    code: absentCode,
                    color: '#E57373',
                    icon: 'wrong_red_fill',
                    key: absentCode,
                    ConfigKey: `absentCode`
                }] : []),
                ...(lateCode ? [{
                    code: lateCode,
                    color: '#f4fb71ff',
                    icon: 'correct_blue_fill',
                    key: lateCode,
                    ConfigKey: `lateCode`
                }] : []),
                ...(leaveCode ? [{
                    code: leaveCode,
                    color: '#a6d652ff',
                    icon: 'wrong_red_fill',
                    key: leaveCode,
                    ConfigKey: `leaveCode`
                }] : [])
            ]
        }
    }
}

const transferBodyToForm = (dataStoreValues: any, module: string,) => {
    return {
        module: module,
        program: dataStoreValues?.program,
        programStageTransfer: dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
    }
}

const transferPostBody = (formValues: any, prevDataStore: any) => {
    return {
        ...prevDataStore,
        [formValues?.module]: {
            status: formValues.status,
            approvedCode: formValues?.approvedCode,
            penddingCode: formValues?.penddingCode,
            reprovedCode: formValues?.reprovedCode,
            originSchool: formValues.destinySchool,
            destinySchool: formValues.destinySchool,
            programStage: formValues.programStageTransfer,
            lastUpdate: new Date().toISOString(),
        }
    }
}

const performanceBodyToForm = (dataStoreValues: any, module: string) => {
    return {
        module: module,
        program: dataStoreValues?.program,
        programStages: dataStoreValues?.[module]?.programStages?.map((x: any) => x.programStage)
    }
}

const performancePostBody = (formValues: any) => {

    return {
        [formValues?.module]: {
            lastUpdate: new Date().toISOString(),
            programStages: formValues?.programStages?.map((e: string) => { return { programStage: e } })
        }
    }
}

const modulePostBody = (formValues: any, program: any, prevData: DataStoreProps) => {
    const prevDataStore = prevData?.find(x => x.program == program.id) ?? {}

    switch (formValues?.module) {
        case "registration":
            return { ...prevDataStore, ...registrationPostBody(formValues, program) };

        case "final-result":
            return { ...prevDataStore, ...finalResultPostBody(formValues) }

        case "attendance":
            return { ...prevDataStore, ...attendancePostBody(formValues) }

        case "transfer":
            return transferPostBody(formValues, prevDataStore)

        case "performance":
            return { ...prevDataStore, ...performancePostBody(formValues) };

        default:
            return {};
    }
}

const moduleBodyToForm = (dataStoreValues: any, module: string) => {
    switch (module) {
        case "registration":
            return registrationBodyToForm(dataStoreValues, module);

        case "final-result":
            return finalResultBodyToForm(dataStoreValues, module);

        case "attendance":
            return attendance(dataStoreValues, module);

        case "transfer":
            return transferBodyToForm(dataStoreValues, module);

        case "performance":
            return performanceBodyToForm(dataStoreValues, module)

        default:
            return {};
    }
}


export { modulePostBody, moduleBodyToForm }