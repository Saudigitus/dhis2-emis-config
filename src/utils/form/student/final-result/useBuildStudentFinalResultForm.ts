import { D2I18n, GroupFormProps } from 'dhis2-semis-types'

type formStudentFinalResultFormType = {
    programFields: GroupFormProps['fields']
    finalResultFields: GroupFormProps['fields']
    finalResultStatusDetails: GroupFormProps['fields']
    i18n: D2I18n
}

function formStudentFinalResultForm({
    finalResultFields,
    programFields,
    finalResultStatusDetails,
    i18n
}: formStudentFinalResultFormType) {
    return [
        {
            visible: true,
            description: '',
            name: i18n.t('Program Details'),
            fields: [...programFields]
        },
        ...(finalResultFields.length > 0
            ? [
                  {
                      visible: true,
                      name: i18n.t('Final Result Details'),
                      fields: [...finalResultFields]
                  }
              ]
            : []),
        ...(finalResultStatusDetails.length > 0
            ? [
                  {
                      visible: true,
                      name: i18n.t('Promotion Criteria'),
                      fields: [...finalResultStatusDetails]
                  }
              ]
            : [])
    ]
}

export { formStudentFinalResultForm }
