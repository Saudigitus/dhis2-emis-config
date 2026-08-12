import React, { useEffect, useState } from 'react'
import { Form } from 'react-final-form';
import { ModalContentInterface } from '../../types/modal/ModalProps';
import { CustomForm, useDataStoreKey, useProgramsKeys, WithBorder, WithPadding } from 'dhis2-semis-components';
import { LinearProgress } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { ProgramLoaderState } from '../../atoms/getProgramLoaderSchema';
import { LabelManager } from '../profileTabs/profileTabManager';
import { CardLayoutConfigurator } from '../profileFieldsConfig/CardLayoutConfigurator';
import { CardLayoutItem } from '../profileFieldsConfig/types';
import { LabelItem } from '../../types/profileTypes/profileTypes';
import { organizeProfileSections } from '../../utils/profileFieldGroup/profileGroupFieldFormatter';
import { useUrlParams } from 'dhis2-semis-functions';
import { SectionType } from 'src/types/variables/Variables';

function ModalContent(props: ModalContentInterface) {
    const { formFields, onSubmit, onCancel, initialValues, loading, setTrackedValues } = props;
    const loadingProgram = useRecoilValue<boolean>(ProgramLoaderState)
    const [cardLayoutItems, setCardLayoutItems] = useState<CardLayoutItem[]>([])
    const [labels, setLabels] = useState<LabelItem[]>(initialValues?.tabs || [])
    const [indicators, setIndicators] = useState<LabelItem[]>(initialValues?.indicators || [])
    const { useQuery } = useUrlParams()
    const section = useQuery.get("section") as SectionType
    const programs = useProgramsKeys()
    const { program } = useDataStoreKey({ sectionType: section ?? "" }) ?? [];
    const sectionProgram: any = programs?.find(x => x.id == program)
    const indicatorOptions = sectionProgram?.programIndicators?.map((prog: any) => ({ key: prog.id, label: prog.displayName })) || []
    const AllAttributes = sectionProgram?.programTrackedEntityAttributes?.map((x: any) => ({
        key: x?.trackedEntityAttribute?.id,
        label: x?.trackedEntityAttribute?.displayName,
    })) || []

    useEffect(() => {
        if (initialValues?.profileSections?.length > 0) {
            const updated = initialValues?.profileSections?.map((x: any) => {
                if (!x.label) {
                    return { ...x, label: AllAttributes?.find((att: any) => att.key == x.fieldKey)?.label }
                }

                return x
            })

            setCardLayoutItems(updated)
        }
    }, [initialValues])

    const onSave = (e: any) => {
        const fieldGroups = organizeProfileSections(cardLayoutItems as any)
        onSubmit({ ...e, ...fieldGroups, tabs: labels, indicators })
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
                            !loadingProgram && <>
                                <hr />
                                <WithPadding p='1px 18px'>
                                    <CardLayoutConfigurator AllAttributes={AllAttributes} items={cardLayoutItems} setItems={setCardLayoutItems} />
                                </WithPadding>
                                <hr />
                                <h6 style={{ margin: "30px 0 0 10px", fontWeight: "700", fontSize: "18px" }} > Program indicators configuration </h6>
                                <WithPadding p='1px 18px'>
                                    <LabelManager inputType='list' options={indicatorOptions} labels={indicators} setLabels={setIndicators} />
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