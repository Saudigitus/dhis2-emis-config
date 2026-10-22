import ModalContent from "./ModalContent";
import { useBuildForm } from "../../hooks/form";
import React, { useState } from "react";
import { DataStoreState, ModalComponent, } from "dhis2-semis-components";
import { ModalManagerInterface } from "../../types/modal/ModalProps";
import { useUrlParams, capitalizeString } from "dhis2-semis-functions";
import usePostDataStore from "../../hooks/dataStore/usePostDataStore";
import { useRecoilValue } from "recoil";
import { ProgramDataState } from "../../atoms/ProgramDataSchema";
import useGetDataStore from "../../hooks/dataStore/useGetDataStore";
import { modulePostBody } from "../../utils/form/formatters/formatDataStoreValues";
import { DataStoreConfigState } from "../../atoms/DataStoreSchema";
import { DataStoreConfigType } from "../../types/dataStore/dataStoreConfigType";
import { SchoolCalendarState } from "../../atoms/schoolCalendar";
import useShowAlerts from "../../hooks/alert/useShowAlert";
import useGetDataStoreConfig from "../../hooks/dataStore/useGetDataStoreConfig";

// Status options of attendance and transfer: each one must have its own code.
const STATUS_CODE_FIELDS = ['presentCode', 'absentCode', 'lateCode', 'leaveCode', 'approvedCode', 'penddingCode', 'reprovedCode']

function ModalManager(props: ModalManagerInterface) {
    const { open, setOpen, initialValues, i18n } = props;
    const [trackeValues, setTrackedValues] = React.useState<any>({});
    const { useQuery, remove } = useUrlParams();
    const programData = useRecoilValue<any>(ProgramDataState)
    const name = useQuery.get("name");
    const section = useQuery.get("section");
    const [loadCreateConfig, setLoading] = useState<boolean>(false)
    const { refetch } = useGetDataStore(true)
    const { createDataStore } = usePostDataStore()
    const { getDataStore } = useGetDataStoreConfig({ setLoading: () => { } })
    const allInitialValues = { ...initialValues }
    const { buildForm, loading } = useBuildForm({ trackeValues, i18n })
    const formVariables = buildForm()
    const config = useRecoilValue(DataStoreConfigState)
    const prevDataStore = useRecoilValue(DataStoreState)
    const calendar = useRecoilValue(SchoolCalendarState)
    const { show } = useShowAlerts()

    const handleCloseModal = () => {
        remove("name")
        remove("module")
        remove("section")
        setOpen(false);
    }

    // What is on the server now, so that changes saved elsewhere since the page was opened are kept.
    const readCurrent = async (key: string, fallback: any) => {
        try {
            return (await getDataStore(key))?.dataStoreConfig ?? fallback
        } catch (error: any) {
            if (error?.details?.httpStatusCode === 404) return fallback
            throw error
        }
    }

    async function onSubmit(e: Record<string, any>): Promise<void> {
        if (!formVariables?.flatMap((x: any) => x.fields).flat()?.every((field: any) =>
            (!field?.required) || (field?.required && e[field.name])
        )) return

        const codes = STATUS_CODE_FIELDS.map((field) => e?.[field]).filter(Boolean)
        if (new Set(codes).size !== codes.length) {
            show({
                message: i18n.t("Each status must have a different code"),
                type: { warning: true }
            })
            return
        }

        setLoading(true)
        try {
            const configKey = config?.find(x => x.key == section)
            const currentValues = await readCurrent('dataStore/semis/values', prevDataStore ?? [])
            let postData = modulePostBody(e, programData, currentValues as unknown as DataStoreConfigType[], configKey, section!)
            const keyIndex = postData?.findIndex((x: any) => x.key == section)
            const { academicYear, ...rest } = postData?.[keyIndex]?.[e?.module]

            if (keyIndex > -1) {
                postData[keyIndex] = { ...postData[keyIndex], [e?.module]: rest }
            }

            await createDataStore({
                data: postData,
                key: 'dataStore/semis/values',
            })

            if (academicYear) {
                const currentCalendar = await readCurrent('dataStore/semis/schoolCalendar', calendar ?? {})
                await createDataStore({
                    key: "dataStore/semis/schoolCalendar",
                    data: { ...currentCalendar, academicYear: academicYear }
                })
            }

            await refetch()
            show({
                message: i18n.t("Configurations saved successfully"),
                type: { success: true }
            })
            handleCloseModal()
        } catch (error: any) {
            show({
                message: `${i18n.t("Unable to save data")}: ${error?.message ?? ''}`,
                type: { critical: true }
            });
        } finally {
            setLoading(false)
        }
    }

    const formatedName = capitalizeString(name!)
    const formatedSection = capitalizeString(section!)

    return (
        <ModalComponent
            open={open}
            loading={loading}
            handleClose={handleCloseModal}
            title={
                `${i18n.t('{{name}}', {
                    name: i18n.t(formatedName),
                })} - ${i18n.t('{{section}} Configuration', {
                    section: i18n.t(formatedSection),
                })}`
            }
        >
            <ModalContent
                setTrackedValues={setTrackedValues}
                loading={loading || loadCreateConfig}
                onSubmit={onSubmit}
                formFields={formVariables!}
                onCancel={handleCloseModal}
                initialValues={allInitialValues}
            />
        </ModalComponent>
    );
}

export default ModalManager;