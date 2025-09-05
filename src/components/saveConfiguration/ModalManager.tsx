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

function ModalManager(props: ModalManagerInterface) {
    const { open, setOpen, initialValues } = props;
    const [trackeValues, setTrackedValues] = React.useState<any>({});
    const { useQuery, remove } = useUrlParams();
    const programData = useRecoilValue<any>(ProgramDataState)
    const name = useQuery.get("name");
    const section = useQuery.get("section");
    const [loadCreateConfig, setLoading] = useState<boolean>(false)
    const { refetch } = useGetDataStore(true)
    const { createDataStore } = usePostDataStore()
    const allInitialValues = { ...initialValues }
    const { buildForm, loading } = useBuildForm({ trackeValues })
    const formVariables = buildForm()
    const config = useRecoilValue(DataStoreConfigState)
    const prevDataStore = useRecoilValue(DataStoreState)
    const calendar = useRecoilValue(SchoolCalendarState)

    console.log(allInitialValues,'jahsjasd')
    const handleCloseModal = () => {
        remove("name")
        remove("module")
        remove("section")
        setOpen(false);
    }

    function onSubmit(e: Record<string, any>): void {
        setLoading(true)
        const configKey = config?.find(x => x.key == section)
        let postData = modulePostBody(e, programData, prevDataStore as unknown as DataStoreConfigType[], configKey)
        const keyIndex = postData?.findIndex((x: any) => x.key == section)
        const { academicYear, ...rest } = postData?.[keyIndex]?.[e?.module]

        if (keyIndex > -1) {
            postData[keyIndex] = { ...postData[keyIndex], [e?.module]: rest }
        }

        createDataStore({
            data: postData,
            key: 'dataStore/semis/values',
        }).then(async () => {
            if (academicYear && section === "student") {
                await createDataStore({
                    key: "dataStore/semis/schoolCalendar",
                    data: { ...calendar, academicYear: academicYear }
                }).then(() => {
                    refetch().then(() => {
                        setLoading(false);
                        setOpen(false);
                    })
                })
            } else {
                refetch().then(() => {
                    setLoading(false);
                    setOpen(false);
                })
            }
        })
    }

    return (
        <ModalComponent
            open={open}
            loading={loading}
            handleClose={handleCloseModal}
            title={`${capitalizeString(name!)} - ${capitalizeString(section!)} Configuration`}
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