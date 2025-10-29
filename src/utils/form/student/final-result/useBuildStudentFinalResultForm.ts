import { GroupFormProps } from 'dhis2-semis-types'

type formStudentFinalResultFormType = {
    programFields: GroupFormProps['fields']
    finalResultFields: GroupFormProps['fields']
    finalResultStatusDetails: GroupFormProps['fields']
}

function formStudentFinalResultForm({
    finalResultFields,
    programFields,
    finalResultStatusDetails
}: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: '',
            name: 'Program Details',
            fields: [...programFields]
        },
        ...(finalResultFields.length > 0
            ? [
                  {
                      visible: true,
                      name: 'Final Result Details',
                      fields: [...finalResultFields]
                  }
              ]
            : []),
        ...(finalResultStatusDetails.length > 0
            ? [
                  {
                      visible: true,
                      name: 'Promotion Criteria',
                      fields: [...finalResultStatusDetails]
                  }
              ]
            : [])
    ]
}

export { formStudentFinalResultForm }
