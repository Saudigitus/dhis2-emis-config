import { DataStoreConfigType } from '../../../types/dataStore/dataStoreConfigType'

const registrationPostBody = (formValues: any, program: any, config: any) => {
    // In the order of the form, so the global filters keep the same order.
    const keys = Object.keys(config?.registration ?? {})
        .sort((a, b) => (config.registration[a]?.order ?? 0) - (config.registration[b]?.order ?? 0))
    let filters = []
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (config?.registration?.[key]?.dataFilter && formValues?.[key]) {
            filters.push({
                code: config.registration[key].filterCode,
                dataElement: formValues?.[key],
                label: formValues[`${key}Name`] ?? key,
                order: i,
                ulrParam: config.registration[key].filterCode
            })
        }
    }

    // grade and section are the data elements of the "grade" and "class" filters: the other modules pair them
    // with the grade and class URL parameters (for staff, Employment type and Type of staff).
    const filterField = (code: string) => keys.find((key) => config?.registration?.[key]?.filterCode === code)
    const gradeField = filterField('grade')
    const sectionField = filterField('class')

    return {
        [formValues?.module]: {
            enabled: formValues?.enabled ?? true,
            academicYear: formValues.academicYear,
            grade: (gradeField && formValues?.[gradeField]) || null,
            section: (sectionField && formValues?.[sectionField]) || null,
            lastUpdate: new Date().toISOString(),
            programStage: formValues.programStageRegistration
        },
        currentAcademicYear: formValues?.currentAcademicYear,
        ...(formValues.programStageSocioEconomic
            ? {
                'socio-economics': {
                    programStage: formValues.programStageSocioEconomic
                }
            }
            : {}),
        program: formValues.program,
        key: formValues.key,
        trackedEntityType: program?.trackedEntityType?.id,
        defaults: {
            allowSearching: formValues.allowSearching === 'true',
            defaultOrder: `${formValues.defaultOrder}:${formValues.orderType}`
        },
        filters: {
            dataElements: filters
        }
    }
}

const registrationBodyToForm = (dataStoreValues: any, module: string) => {
    const filters = dataStoreValues?.filters?.dataElements ?? []
    const filterLabel = (code: string) => (filters.find((x: any) => x.code == code)
        ?? filters.find((x: any) => x.dataElement == dataStoreValues?.[module]?.[code === 'grade' ? 'grade' : 'section']))?.label

    return {
        module: module,
        program: dataStoreValues?.program,
        programStageRegistration: dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
        // Staff: Employment type is the "grade" filter and Type of staff the "class" filter.
        ...(dataStoreValues?.key == 'staff'
            ? {
                typeOfStaff: dataStoreValues?.[module]?.section,
                employmentType: dataStoreValues?.[module]?.grade,
                typeOfStaffName: filterLabel('class'),
                employmentTypeName: filterLabel('grade')
            }
            : {
                gradeName: filterLabel('grade'),
                sectionName: filterLabel('class')
            }),

        orderType: dataStoreValues?.defaults?.defaultOrder?.split(':')?.[1],
        programStageSocioEconomic: dataStoreValues?.['socio-economics']?.programStage,
        defaultOrder: dataStoreValues?.defaults?.defaultOrder?.split(':')?.[0],
        allowSearching: JSON?.stringify(dataStoreValues?.defaults?.allowSearching),
        currentAcademicYear: dataStoreValues?.defaults?.currentAcademicYear
    }
}

const finalResultBodyToForm = (dataStoreValues: any, module: string) => {
    return {
        module: module,
        program: dataStoreValues?.program,
        programStageFinalResult: dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
        programStages: dataStoreValues?.[module]?.validStatusValue?.map((x: any) => x) ?? [],
        dropout: dataStoreValues?.[module]?.dropoutStatusValues?.map((x: any) => x) ?? []
    }
}

const attendance = (dataStoreValues: any, module: string) => {
    const { attendanceStatus, ...rest } = dataStoreValues

    return {
        module: module,
        program: dataStoreValues?.program,
        programStageAttendance: dataStoreValues?.[module]?.programStage,
        allowClassAttendanceConfig: JSON?.stringify(dataStoreValues?.[module]?.attendanceStatus?.allowAttendanceStatus),
        programAttendanceClassConfig: dataStoreValues?.[module]?.attendanceStatus?.program,
        attendaceClassConfigRecord: dataStoreValues?.[module]?.attendanceStatus?.totalRecords,
        attendaceClassConfigSummary: dataStoreValues?.[module]?.statusOptions?.[0]?.totalSummary,
        programStageAttendanceClassConfig: dataStoreValues?.[module]?.attendanceStatus?.programStage,
        ...rest?.[module],
        ...rest?.[module]?.statusOptions?.reduce(
            (acc: any, x: any) => ({ ...acc, [x?.configKey]: x?.code }),
            {}
        )
    }
}

const attendancePostBody = (formValues: any, prev: any) => {
    const { absentCode, lateCode, leaveCode, presentCode, allowClassAttendanceConfig,
        programAttendanceClassConfig, attendaceClassConfigSummary, programStageAttendanceClassConfig,
        attendaceClassConfigRecord
    } = formValues

    return {
        absenteeism: prev?.absenteeism ?? { enabled: true },
        [formValues?.module]: {
            // Saving the settings keeps the module on or off as it is.
            enabled: prev?.[formValues?.module]?.enabled ?? true,
            absenceReason: formValues?.absenceReason,
            lastUpdate: new Date().toISOString(),
            programStage: formValues?.programStageAttendance,
            status: formValues?.status,
            ...((allowClassAttendanceConfig != undefined && programAttendanceClassConfig
                && attendaceClassConfigSummary && programStageAttendanceClassConfig
            ) ? {
                attendanceStatus: {
                    allowAttendanceStatus: allowClassAttendanceConfig === 'true',
                    program: programAttendanceClassConfig,
                    totalRecords: attendaceClassConfigRecord,
                    programStage: programStageAttendanceClassConfig
                }
            } : {}
            ),
            statusOptions: [
                ...(presentCode
                    ? [
                        {
                            code: presentCode,
                            color: '#81C784',
                            icon: 'correct_blue_fill',
                            key: 'present',
                            configKey: `presentCode`,
                            totalSummary: attendaceClassConfigSummary
                        }
                    ]
                    : []),
                ...(absentCode
                    ? [
                        {
                            code: absentCode,
                            color: '#E57373',
                            icon: 'wrong_red_fill',
                            key: 'absent',
                            configKey: `absentCode`,
                            totalSummary: attendaceClassConfigSummary
                        }
                    ]
                    : []),
                ...(lateCode
                    ? [
                        {
                            code: lateCode,
                            color: '#f4fb71ff',
                            icon: 'correct_blue_fill',
                            key: 'late',
                            configKey: `lateCode`,
                            totalSummary: attendaceClassConfigSummary
                        }
                    ]
                    : []),
                ...(leaveCode
                    ? [
                        {
                            code: leaveCode,
                            color: '#a6d652ff',
                            icon: 'wrong_red_fill',
                            key: 'leave',
                            configKey: `leaveCode`,
                            totalSummary: attendaceClassConfigSummary
                        }
                    ]
                    : [])
            ]
        }
    }
}

const finalResultPostBody = (formValues: any, prev: any) => {

    return {
        [formValues?.module]: {
            enabled: prev?.[formValues?.module]?.enabled ?? true,
            programStage: formValues.programStageFinalResult,
            validStatusValue: formValues?.programStages,
            dropoutStatusValues: formValues?.dropout,
            status: formValues.status,
            lastUpdate: new Date().toISOString()
        }
    }
}


const transferBodyToForm = (dataStoreValues: any, module: string) => {
    return {
        module: module,
        program: dataStoreValues?.program,
        programStageTransfer: dataStoreValues?.[module]?.programStage,
        ...dataStoreValues?.[module],
        ...dataStoreValues?.[module]?.statusOptions?.reduce(
            (acc: any, x: any) => ({ ...acc, [x?.configKey]: x?.code }),
            {}
        )
    }
}

const transferPostBody = (formValues: any, prevDataStore: any) => {
    const { approvedCode, penddingCode, reprovedCode } = formValues

    return {
        ...prevDataStore,
        [formValues?.module]: {
            enabled: prevDataStore?.[formValues?.module]?.enabled ?? true,
            status: formValues.status,
            originSchool: formValues.originSchool,
            destinySchool: formValues.destinySchool,
            programStage: formValues.programStageTransfer,
            lastUpdate: new Date().toISOString(),
            statusOptions: [
                ...(approvedCode
                    ? [
                        {
                            code: approvedCode,
                            configKey: 'approvedCode',
                            key: 'approved'
                        }
                    ]
                    : []),
                ...(penddingCode
                    ? [
                        {
                            code: penddingCode,
                            configKey: 'penddingCode',
                            key: 'pending'
                        }
                    ]
                    : []),
                ...(reprovedCode
                    ? [
                        {
                            code: reprovedCode,
                            configKey: 'reprovedCode',
                            key: 'reproved'
                        }
                    ]
                    : [])
            ]
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

const performancePostBody = (formValues: any, prev: any) => {
    return {
        [formValues?.module]: {
            enabled: prev?.[formValues?.module]?.enabled ?? true,
            lastUpdate: new Date().toISOString(),
            programStages: formValues?.programStages?.map((e: string) => {
                return { programStage: e }
            })
        }
    }
}

const modulePostBody = (formValues: any, program: any, prevData: DataStoreConfigType[], config: any, section: string): any => {
    const prevDataStore = prevData
    const selectedDataStoreKey = prevData?.find((x: any) => x.key == section)
    const selectedDataStoreKeyIndex = prevData?.findIndex((x: any) => x.key == section)

    const returnBody = (data: any) => {
        if (selectedDataStoreKeyIndex >= 0) {
            const updated = [...prevDataStore]
            updated[selectedDataStoreKeyIndex] = { ...selectedDataStoreKey, ...data }
            return updated
        } else {
            return prevDataStore?.concat(data)
        }
    }

    switch (formValues?.module) {
        case 'registration':
            return returnBody(registrationPostBody(formValues, program, config))

        case 'final-result':
            return returnBody(finalResultPostBody(formValues, selectedDataStoreKey))

        case 'attendance':
            return returnBody(attendancePostBody(formValues, selectedDataStoreKey))

        case 'transfer':
            return returnBody(transferPostBody(formValues, selectedDataStoreKey))

        case 'performance':
            return returnBody(performancePostBody(formValues, selectedDataStoreKey))

        default:
            return {}
    }
}

const moduleBodyToForm = (dataStoreValues: any, module: string) => {
    switch (module) {
        case 'registration':
            return registrationBodyToForm(dataStoreValues, module)

        case 'final-result':
            return finalResultBodyToForm(dataStoreValues, module)

        case 'attendance':
            return attendance(dataStoreValues, module)

        case 'transfer':
            return transferBodyToForm(dataStoreValues, module)

        case 'performance':
            return performanceBodyToForm(dataStoreValues, module)

        default:
            return {}
    }
}

export { modulePostBody, moduleBodyToForm }
