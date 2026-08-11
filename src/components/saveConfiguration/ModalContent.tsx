import React, { useState } from 'react'
import { Form } from 'react-final-form';
import { ModalContentInterface } from '../../types/modal/ModalProps';
import { CustomForm, WithBorder, WithPadding } from 'dhis2-semis-components';
import { LinearProgress } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { ProgramLoaderState } from '../../atoms/getProgramLoaderSchema';
import { LabelManager } from '../profileTabs/profileTabManager';
import { CardLayoutConfigurator } from '../profileFieldsConfig/CardLayoutConfigurator';
import { CardLayoutItem } from '../profileFieldsConfig/types';
import { LabelItem } from '../../types/profileTypes/profileTypes';
import { organizeProfileSections } from '../../utils/profileFieldGroup/profileGroupFieldFormatter';

function ModalContent(props: ModalContentInterface) {
    const { formFields, onSubmit, onCancel, initialValues, loading, setTrackedValues } = props;
    const loadingProgram = useRecoilValue<boolean>(ProgramLoaderState)
    const [cardLayoutItems, setCardLayoutItems] = useState<CardLayoutItem[]>([])
    const [labels, setLabels] = useState<LabelItem[]>([])

    const onSave = (e: any) => {
        const fieldGroups = organizeProfileSections(cardLayoutItems as any)
        onSubmit({ ...e, ...fieldGroups, tabs: labels })
    }

    return (
        <WithPadding>
            <WithBorder type='all'>
                <WithPadding>
                    {loadingProgram && <LinearProgress />}
                    <CustomForm
                        Form={Form}
                        loading={loading}
                        withButtons={true}
                        formFields={formFields}
                        setTrackedValues={setTrackedValues}
                        initialValues={initialValues}
                        onCancel={() => { onCancel() }}
                        trackedEntity={initialValues?.trackedEntity}
                        onFormSubtmit={(e: Record<string, any>) => { onSave(e) }}
                        hasChangedExternaly={true}
                        customComponent={
                            <>
                                <hr />
                                <WithPadding p='1px 18px'>
                                    <CardLayoutConfigurator items={cardLayoutItems} setItems={setCardLayoutItems} />
                                </WithPadding>
                                <hr />
                                <h6 style={{ margin: "30px 0 0 10px", fontWeight: "700", fontSize: "18px" }} > Tabs configuration </h6>
                                <WithPadding p='1px 18px'>
                                    <LabelManager labels={labels} setLabels={setLabels} />
                                </WithPadding>
                            </>
                        }
                    />

                </WithPadding>
            </WithBorder>
        </WithPadding>
    )
}
export default ModalContent