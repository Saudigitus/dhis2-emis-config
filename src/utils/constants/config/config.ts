import { D2I18n } from "dhis2-semis-types";

export const config = (i18n: D2I18n) => [
    {
        profile: {
            prifileView: {
                summaryIndicators: {
                    filter: '',
                    hint: i18n.t('Program indicator'),
                    inputType: 'MULTI_SELECT',
                    label: i18n.t('Summary indicators'),
                    optionSetValue: false,
                    order: 2,
                    resource: 'programIndicator',
                },
            },
            other: {
                dropoutOption: {
                    filter: '',
                    hint: i18n.t('Option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Dropout option'),
                    optionSetValue: false,
                    order: 1,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                enableDelete: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    inputType: 'BOOLEAN',
                    label: i18n.t('Enable delete option'),
                    optionSetValue: true,
                    order: 2,
                    resource: 'attributes',
                    valueType: 'BOOLEAN'
                },
                listdefaultPageSize: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    inputType: 'TEXT',
                    label: i18n.t('Default page size'),
                    optionSetValue: true,
                    order: 3,
                    resource: 'attributes',
                    valueType: 'TEXT'
                },
            }
        },
        attendance: {
            absenceReason: {
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with option sets'),
                inputType: 'LIST',
                label: i18n.t('Reason of absence'),
                optionSetValue: true,
                order: 3,
                required: false,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            attendanceStatus: {
                absentCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Absent Code'),
                    optionSetValue: true,
                    order: 2,
                    required: true,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                lateCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Late Code'),
                    optionSetValue: true,
                    order: 3,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                leaveCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Leave Code'),
                    optionSetValue: true,
                    order: 4,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                presentCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Present Code'),
                    optionSetValue: true,
                    order: 1,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                }
            },
            attendanceClassConfig: {
                allowClassAttendanceConfig: {
                    filter: 'valueType:eq:TEXT',
                    inputType: 'BOOLEAN',
                    label: i18n.t('Allow Attendance Status'),
                    optionSetValue: true,
                    order: 0,
                    resource: 'optionSets',
                    valueType: 'BOOLEAN'
                },
                programAttendanceClassConfig: {
                    hint: i18n.t('Event Program'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Class Config Program'),
                    order: 1,
                    required: false,
                    resource: 'programs'
                },
                programStageAttendanceClassConfig: {
                    hint: i18n.t('Non Repeatable Program Stage'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Class Config Program Stage'),
                    order: 2,
                    required: false,
                    resource: 'programStages'
                },
                attendaceClassConfigStatus: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('Data Element with option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Status'),
                    optionSetValue: true,
                    order: 3,
                    required: false,
                    resource: 'dataElements',
                    valueType: 'TEXT'
                }
            },
            programStageAttendance: {
                filter: 'repeatable:eq:true',
                hint: i18n.t('Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Attendance Program Stage'),
                order: 1,
                required: true,
                resource: 'programStages'
            },
            status: {
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with option sets'),
                inputType: 'LIST',
                label: i18n.t('Attendance Status'),
                optionSetValue: true,
                order: 2,
                required: true,
                resource: 'dataElements',
                valueType: 'TEXT'
            }
        },
        defaults: {
            allowSearching: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'BOOLEAN',
                label: i18n.t('Allow Searching'),
                optionSetValue: true,
                order: 3,
                resource: 'optionSets',
                valueType: 'BOOLEAN'
            },
            defaultOrder: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'LIST',
                label: i18n.t('Default order by'),
                optionSetValue: true,
                order: 0,
                resource: 'attributes',
                valueType: 'BOOLEAN'
            },
            orderType: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'LIST',
                label: i18n.t('Order as'),
                optionSetValue: true,
                options: [
                    {
                        label: i18n.t('asc'),
                        value: 'asc'
                    },
                    {
                        label: i18n.t('desc'),
                        value: 'desc'
                    }
                ],
                order: 1,
                resource: 'custom',
                valueType: 'BOOLEAN'
            }
        },
        'final-result': {
            programStageFinalResult: {
                required: true,
                filter: 'repeatable:eq:false',
                hint: i18n.t('Non-Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Final Result Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            status: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element'),
                inputType: 'LIST',
                label: i18n.t('Final result status'),
                optionSetValue: false,
                order: 1,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            finalResultStatus: {
                programStages: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('List of final result status that allows student promotion'),
                    inputType: 'MULTI_SELECT',
                    label: i18n.t('Promotable Status'),
                    order: 0,
                    resource: 'optionSets'
                },
                dropout: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('List of final result status that allows student dropout'),
                    inputType: 'MULTI_SELECT',
                    label: i18n.t('Dropout Status'),
                    order: 1,
                    resource: 'optionSets'
                },
            }
        },
        key: 'student',
        lastUpdate: '2026-04-06',
        performance: {
            programStages: {
                filter: 'repeatable:eq:false',
                hint: i18n.t('Allow multi selection of program stage'),
                inputType: 'MULTI_SELECT',
                label: i18n.t('Performance/marks Program Stages'),
                resource: 'programStages'
            }
        },
        program: {
            program: {
                filter: '',
                hint: i18n.t('Tracker Program'),
                inputType: 'LIST',
                label: i18n.t('Student Program'),
                resource: 'programs'
            }
        },
        registration: {
            academicYear: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Academic Year'),
                optionSetValue: true,
                order: 1,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            grade: {
                required: false,
                dataFilter: true,
                filter: 'valueType:eq:TEXT',
                filterCode: 'grade',
                hint: i18n.t('Data Element with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Grade'),
                optionSetValue: true,
                order: 2,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            gradeName: {
                required: false,
                hint: i18n.t('The name that should appear in the global filters'),
                inputType: 'TEXT',
                label: i18n.t('Grade filter name'),
                optionSetValue: true,
                order: 2,
                valueType: 'TEXT'
            },
            programStageRegistration: {
                required: true,
                filter: 'repeatable:eq:false',
                hint: i18n.t('Non-repeatable ProgramStage'),
                inputType: 'LIST',
                label: i18n.t('Registration Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            section: {
                required: false,
                dataFilter: true,
                filter: 'valueType:eq:TEXT',
                filterCode: 'class',
                hint: i18n.t('Data optionally with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Class/Section'),
                optionSetValue: true,
                order: 3,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            sectionName: {
                required: false,
                hint: i18n.t('The name that should appear in the global filters'),
                inputType: 'TEXT',
                label: i18n.t('Section filter name'),
                optionSetValue: true,
                order: 4,
                valueType: 'TEXT'
            }
        },
        'socio-economics': {
            programStageSocioEconomic: {
                filter: 'repeatable:eq:false',
                hint: i18n.t('Non-repeateable ProgramStage'),
                inputType: 'LIST',
                label: i18n.t('Socio-economics Program Stage'),
                order: 2,
                resource: 'programStages'
            }
        },
        transfer: {
            destinySchool: {
                required: true,
                filter: 'valueType:eq:ORGANISATION_UNIT',
                hint: i18n.t('Organisation Unit  Data Element'),
                inputType: 'LIST',
                label: i18n.t('Destiny School'),
                order: 2,
                resource: 'dataElements'
            },
            originSchool: {
                required: true,
                filter: 'valueType:eq:ORGANISATION_UNIT',
                hint: i18n.t('Organisation Unit  Data Element'),
                inputType: 'LIST',
                label: i18n.t('Origin School'),
                order: 1,
                resource: 'dataElements'
            },
            programStageTransfer: {
                required: true,
                filter: 'repeatable:eq:true',
                hint: i18n.t('Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            status: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element'),
                inputType: 'LIST',
                label: i18n.t('Transfer Status'),
                optionSetValue: true,
                order: 3,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            transferStatus: {
                approvedCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Approved Code'),
                    optionSetValue: true,
                    order: 5,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                penddingCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Pedding Code'),
                    optionSetValue: true,
                    order: 4,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                reprovedCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Reproved Code'),
                    optionSetValue: true,
                    order: 6,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                }
            }
        }
    },
    {
        attendance: {
            absenceReason: {
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with option sets'),
                inputType: 'LIST',
                label: i18n.t('Reason of absence'),
                optionSetValue: true,
                order: 3,
                required: false,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            attendanceStatus: {
                absentCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Absent Code'),
                    optionSetValue: true,
                    order: 2,
                    required: true,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                lateCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Late Code'),
                    optionSetValue: true,
                    order: 3,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                leaveCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Leave Code'),
                    optionSetValue: true,
                    order: 4,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                presentCode: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Present Code'),
                    optionSetValue: true,
                    order: 1,
                    required: false,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                }
            },
            attendanceClassConfig: {
                allowClassAttendanceConfig: {
                    filter: 'valueType:eq:TEXT',
                    inputType: 'BOOLEAN',
                    label: i18n.t('Allow Attendance Status'),
                    optionSetValue: true,
                    order: 0,
                    resource: 'optionSets',
                    valueType: 'BOOLEAN'
                },
                programAttendanceClassConfig: {
                    hint: i18n.t('Event Program'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Class Config Program'),
                    order: 1,
                    required: true,
                    resource: 'programs'
                },
                programStageAttendanceClassConfig: {
                    hint: i18n.t('Non Repeatable Program Stage'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Class Config Program Stage'),
                    order: 1,
                    required: true,
                    resource: 'programStages'
                },
                attendaceClassConfigStatus: {
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('Data Element with option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Attendance Status'),
                    optionSetValue: true,
                    order: 2,
                    required: true,
                    resource: 'dataElements',
                    valueType: 'TEXT'
                }
            },
            programStageAttendance: {
                filter: 'repeatable:eq:true',
                hint: i18n.t('Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Attendance Program Stage'),
                order: 1,
                required: true,
                resource: 'programStages'
            },
            status: {
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with option sets'),
                inputType: 'LIST',
                label: i18n.t('Attendance Status'),
                optionSetValue: true,
                order: 2,
                required: true,
                resource: 'dataElements',
                valueType: 'TEXT'
            }
        },
        defaults: {
            allowSearching: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'BOOLEAN',
                label: i18n.t('Allow Searching'),
                optionSetValue: true,
                order: 3,
                resource: 'optionSets',
                valueType: 'BOOLEAN'
            },
            defaultOrder: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'LIST',
                label: i18n.t('Default order by'),
                optionSetValue: true,
                order: 0,
                resource: 'attributes',
                valueType: 'BOOLEAN'
            },
            orderType: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('option sets'),
                inputType: 'LIST',
                label: i18n.t('Order as'),
                optionSetValue: true,
                options: [
                    {
                        label: i18n.t('asc'),
                        value: 'asc'
                    },
                    {
                        label: i18n.t('desc'),
                        value: 'desc'
                    }
                ],
                order: 1,
                resource: 'custom',
                valueType: 'BOOLEAN'
            }
        },
        'final-result': {
            programStageFinalResult: {
                required: true,
                filter: 'repeatable:eq:false',
                hint: i18n.t('Non-Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Final Result Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            finalResultStatus: {
                programStages: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('List of final result status that allows staff promotion'),
                    inputType: 'MULTI_SELECT',
                    label: i18n.t('Promotable Status'),
                    resource: 'optionSets'
                }
            },
            status: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element'),
                inputType: 'LIST',
                label: i18n.t('Final result status'),
                optionSetValue: false,
                order: 1,
                resource: 'dataElements',
                valueType: 'TEXT'
            }
        },
        key: 'staff',
        lastUpdate: '2026-04-06',
        program: {
            program: {
                filter: '',
                hint: i18n.t('Tracker Program'),
                inputType: 'LIST',
                label: i18n.t('Staff Program'),
                resource: 'programs'
            }
        },
        registration: {
            academicYear: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Academic Year'),
                optionSetValue: true,
                order: 1,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            employmentType: {
                required: false,
                dataFilter: true,
                filter: 'valueType:eq:TEXT',
                filterCode: 'grade',
                hint: i18n.t('Data optionally with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Employment type'),
                optionSetValue: true,
                order: 4,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            employmentTypeName: {
                required: false,
                hint: i18n.t('The name that should appear in the global filters'),
                inputType: 'TEXT',
                label: i18n.t('Employment type filter name'),
                optionSetValue: true,
                order: 5,
                valueType: 'TEXT'
            },
            programStageRegistration: {
                required: true,
                filter: 'repeatable:eq:true',
                hint: i18n.t('Repeatable ProgramStage'),
                inputType: 'LIST',
                label: i18n.t('Registration Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            typeOfStaff: {
                required: false,
                dataFilter: true,
                filter: 'valueType:eq:TEXT',
                filterCode: 'class',
                hint: i18n.t('Data Element with Option Sets'),
                inputType: 'LIST',
                label: i18n.t('Type of staff'),
                optionSetValue: true,
                order: 2,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            typeOfStaffName: {
                required: false,
                hint: i18n.t('The name that should appear in the global filters'),
                inputType: 'TEXT',
                label: i18n.t('Type of staff filter name'),
                optionSetValue: true,
                order: 3,
                valueType: 'TEXT'
            }
        },
        'socio-economics': {
            programStageSocioEconomic: {
                filter: 'repeatable:eq:false',
                hint: i18n.t('Non-repeateable ProgramStage'),
                inputType: 'LIST',
                label: i18n.t('Socio-economics Program Stage'),
                order: 2,
                resource: 'programStages'
            }
        },
        transfer: {
            destinySchool: {
                required: true,
                filter: 'valueType:eq:ORGANISATION_UNIT',
                hint: i18n.t('Organisation Unit  Data Element'),
                inputType: 'LIST',
                label: i18n.t('Destiny School'),
                order: 1,
                resource: 'dataElements'
            },
            originSchool: {
                required: true,
                filter: 'valueType:eq:ORGANISATION_UNIT',
                hint: i18n.t('Organisation Unit  Data Element'),
                inputType: 'LIST',
                label: i18n.t('Origin School'),
                order: 1,
                resource: 'dataElements'
            },
            programStageTransfer: {
                required: true,
                filter: 'repeatable:eq:true',
                hint: i18n.t('Repeatable Program Stage'),
                inputType: 'LIST',
                label: i18n.t('Program Stage'),
                order: 0,
                resource: 'programStages'
            },
            status: {
                required: true,
                filter: 'valueType:eq:TEXT',
                hint: i18n.t('Data Element'),
                inputType: 'LIST',
                label: i18n.t('Transfer Status'),
                optionSetValue: true,
                order: 2,
                resource: 'dataElements',
                valueType: 'TEXT'
            },
            transferStatus: {
                approvedCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Approved Code'),
                    optionSetValue: true,
                    order: 1,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                penddingCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Pedding Code'),
                    optionSetValue: true,
                    order: 1,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                },
                reprovedCode: {
                    required: true,
                    filter: 'valueType:eq:TEXT',
                    hint: i18n.t('option sets'),
                    inputType: 'LIST',
                    label: i18n.t('Reproved Code'),
                    optionSetValue: true,
                    order: 1,
                    resource: 'optionSets',
                    valueType: 'TEXT'
                }
            }
        }
    }
];