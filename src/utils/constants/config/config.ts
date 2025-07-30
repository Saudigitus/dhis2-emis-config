export const config = [
    {
        "attendance": {
            "absenceReason": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with option sets",
                "inputType": "LIST",
                "label": "Reason of absence",
                "optionSetValue": true,
                "order": 3,
                "required": false,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "attendanceStatus": {
                "absentCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Absent Code",
                    "optionSetValue": true,
                    "order": 2,
                    "required": true,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "lateCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Late Code",
                    "optionSetValue": true,
                    "order": 3,
                    "required": false,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "leaveCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Leave Code",
                    "optionSetValue": true,
                    "order": 4,
                    "required": false,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "presentCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Present Code",
                    "optionSetValue": true,
                    "order": 1,
                    "required": true,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                }
            },
            "programStageAttendance": {
                "filter": "repeatable:eq:true",
                "hint": "Repeatable Program Stage",
                "inputType": "LIST",
                "label": "Attendance Program Stage",
                "order": 1,
                "required": true,
                "resource": "programStages"
            },
            "status": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with option sets",
                "inputType": "LIST",
                "label": "Attendance Status",
                "optionSetValue": true,
                "order": 2,
                "required": true,
                "resource": "dataElements",
                "valueType": "TEXT"
            }
        },
        "defaults": {
            "allowSearching": {
                "filter": "valueType:eq:TEXT",
                "hint": "option sets",
                "inputType": "BOOLEAN",
                "label": "Allow Searching",
                "optionSetValue": true,
                "order": 3,
                "resource": "optionSets",
                "valueType": "BOOLEAN"
            },
            "defaultOrder": {
                "filter": "valueType:eq:TEXT",
                "hint": "option sets",
                "inputType": "LIST",
                "label": "Default order by",
                "optionSetValue": true,
                "order": 0,
                "resource": "attributes",
                "valueType": "BOOLEAN"
            },
            "orderType": {
                "filter": "valueType:eq:TEXT",
                "hint": "option sets",
                "inputType": "LIST",
                "label": "Order as",
                "optionSetValue": true,
                "options": [
                    {
                        "label": "asc",
                        "value": "asc"
                    },
                    {
                        "label": "desc",
                        "value": "desc"
                    }
                ],
                "order": 1,
                "resource": "custom",
                "valueType": "BOOLEAN"
            }
        },
        "final-result": {
            "programStageFinalResult": {
                "filter": "repeatable:eq:false",
                "hint": "Non-Repeatable Program Stage",
                "inputType": "LIST",
                "label": "Final Result Program Stage",
                "order": 0,
                "resource": "programStages"
            },
            "status": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element",
                "inputType": "LIST",
                "label": "Final result status",
                "optionSetValue": false,
                "order": 1,
                "resource": "dataElements",
                "valueType": "TEXT"
            }
        },
        "key": "student",
        "lastUpdate": "2022-01-01",
        "performance": {
            "programStages": {
                "filter": "repeatable:eq:false",
                "hint": "Allow multi selection of program stage",
                "inputType": "MULTI_SELECT",
                "label": "Performance/marks Program Stages",
                "resource": "programStages"
            }
        },
        "program": {
            "program": {
                "filter": "",
                "hint": "Tracker Program",
                "inputType": "LIST",
                "label": "Student Program",
                "resource": "programs"
            }
        },
        "registration": {
            "academicYear": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with Option Sets",
                "inputType": "LIST",
                "label": "Academic Year",
                "optionSetValue": true,
                "order": 1,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "grade": {
                "dataFilter": true,
                "filter": "valueType:eq:TEXT",
                "filterCode": "grade",
                "hint": "Data Element with Option Sets",
                "inputType": "LIST",
                "label": "Grade",
                "optionSetValue": true,
                "order": 2,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "programStageRegistration": {
                "filter": "repeatable:eq:false",
                "hint": "Non-repeatable ProgramStage",
                "inputType": "LIST",
                "label": "Registration Program Stage",
                "order": 0,
                "resource": "programStages"
            },
            "section": {
                "dataFilter": true,
                "filter": "valueType:eq:TEXT",
                "filterCode": "class",
                "hint": "Data optionally with Option Sets",
                "inputType": "LIST",
                "label": "Class/Section",
                "optionSetValue": true,
                "order": 3,
                "resource": "dataElements",
                "valueType": "TEXT"
            }
        },
        "socio-economics": {
            "programStageSocioEconomic": {
                "filter": "repeatable:eq:false",
                "hint": "Non-repeateable ProgramStage",
                "inputType": "LIST",
                "label": "Socio-economics Program Stage",
                "order": 2,
                "resource": "programStages"
            }
        },
        "transfer": {
            "destinySchool": {
                "filter": "valueType:eq:ORGANISATION_UNIT",
                "hint": "Organisation Unit  Data Element",
                "inputType": "LIST",
                "label": "Destiny School",
                "order": 2,
                "resource": "dataElements"
            },
            "originSchool": {
                "filter": "valueType:eq:ORGANISATION_UNIT",
                "hint": "Organisation Unit  Data Element",
                "inputType": "LIST",
                "label": "Origin School",
                "order": 1,
                "resource": "dataElements"
            },
            "programStageTransfer": {
                "filter": "repeatable:eq:true",
                "hint": "Repeatable Program Stage",
                "inputType": "LIST",
                "label": "Program Stage",
                "order": 0,
                "resource": "programStages"
            },
            "status": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element",
                "inputType": "LIST",
                "label": "Transfer Status",
                "optionSetValue": true,
                "order": 3,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "transferStatus": {
                "approvedCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Approved Code",
                    "optionSetValue": true,
                    "order": 5,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "penddingCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Pedding Code",
                    "optionSetValue": true,
                    "order": 4,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "reprovedCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Reproved Code",
                    "optionSetValue": true,
                    "order": 6,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                }
            }
        }
    },
    {
        "attendance": {
            "absenceReason": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with option sets",
                "inputType": "LIST",
                "label": "Reason of absence",
                "optionSetValue": true,
                "order": 3,
                "required": false,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "attendanceStatus": {
                "absentCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Absent Code",
                    "optionSetValue": true,
                    "order": 2,
                    "required": true,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "lateCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Late Code",
                    "optionSetValue": true,
                    "order": 3,
                    "required": false,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "leaveCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Leave Code",
                    "optionSetValue": true,
                    "order": 4,
                    "required": false,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "presentCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Present Code",
                    "optionSetValue": true,
                    "order": 1,
                    "required": true,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                }
            },
            "programStageAttendance": {
                "filter": "repeatable:eq:true",
                "hint": "Repeatable Program Stage",
                "inputType": "LIST",
                "label": "Attendance Program Stage",
                "order": 1,
                "required": true,
                "resource": "programStages"
            },
            "status": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with option sets",
                "inputType": "LIST",
                "label": "Attendance Status",
                "optionSetValue": true,
                "order": 2,
                "required": true,
                "resource": "dataElements",
                "valueType": "TEXT"
            }
        },
        "key": "staff",
        "lastUpdate": "2022-01-01",
        "program": {
            "program": {
                "filter": "",
                "hint": "Tracker Program",
                "inputType": "LIST",
                "label": "Staff Program",
                "resource": "programs"
            }
        },
        "registration": {
            "academicYear": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element with Option Sets",
                "inputType": "LIST",
                "label": "Academic Year",
                "optionSetValue": true,
                "order": 1,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "employmentType": {
                "dataFilter": true,
                "filter": "valueType:eq:TEXT",
                "filterCode": "grade",
                "hint": "Data optionally with Option Sets",
                "inputType": "LIST",
                "label": "Employment type",
                "optionSetValue": true,
                "order": 3,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "programStageRegistration": {
                "filter": "repeatable:eq:true",
                "hint": "Repeatable ProgramStage",
                "inputType": "LIST",
                "label": "Registration Program Stage",
                "order": 0,
                "resource": "programStages"
            },
            "typeOfStaff": {
                "dataFilter": true,
                "filter": "valueType:eq:TEXT",
                "filterCode": "class",
                "hint": "Data Element with Option Sets",
                "inputType": "LIST",
                "label": "Type of staff",
                "optionSetValue": true,
                "order": 2,
                "resource": "dataElements",
                "valueType": "TEXT"
            }
        },
        "transfer": {
            "destinySchool": {
                "filter": "valueType:eq:ORGANISATION_UNIT",
                "hint": "Organisation Unit  Data Element",
                "inputType": "LIST",
                "label": "Destiny School",
                "order": 1,
                "resource": "dataElements"
            },
            "programStageTransfer": {
                "filter": "repeatable:eq:true",
                "hint": "Repeatable Program Stage",
                "inputType": "LIST",
                "label": "Program Stage",
                "order": 0,
                "resource": "programStages"
            },
            "status": {
                "filter": "valueType:eq:TEXT",
                "hint": "Data Element",
                "inputType": "LIST",
                "label": "Transfer Status",
                "optionSetValue": true,
                "order": 2,
                "resource": "dataElements",
                "valueType": "TEXT"
            },
            "transferStatus": {
                "approvedCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Approved Code",
                    "optionSetValue": true,
                    "order": 1,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "penddingCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Pedding Code",
                    "optionSetValue": true,
                    "order": 1,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                },
                "reprovedCode": {
                    "filter": "valueType:eq:TEXT",
                    "hint": "option sets",
                    "inputType": "LIST",
                    "label": "Reproved Code",
                    "optionSetValue": true,
                    "order": 1,
                    "resource": "optionSets",
                    "valueType": "TEXT"
                }
            }
        }
    }
]