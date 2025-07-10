import ModalContent from "./ModalContent";
import { useBuildForm } from "../../hooks/form";
import React from "react";
import { ModalComponent, } from "dhis2-semis-components";
import { ModalManagerInterface } from "../../types/modal/ModalProps";
import { useUrlParams, capitalizeString } from "dhis2-semis-functions";
import usePostDataStore from "../../hooks/dataStore/usePostDataStore";
import { useRecoilValue } from "recoil";
import { ProgramDataState } from "../../atoms/ProgramDataSchema";

function ModalManager(props: ModalManagerInterface) {
    const { open, setOpen, initialValues } = props;
    const [trackeValues, setTrackedValues] = React.useState<any>({});
    const { useQuery, remove } = useUrlParams();
    const programData = useRecoilValue<any>(ProgramDataState)
    const name = useQuery().get("name");
    const { createDataStore, loading: loadCreateConfig } = usePostDataStore()
    const section = useQuery().get("section");
    const allInitialValues = {
        ...initialValues,
        trackedEntityType: programData?.trackedEntityType?.id
    }
    const { buildForm, loading } = useBuildForm({ trackeValues })
    const formVariables = buildForm()

    const handleCloseModal = () => {
        remove("name")
        remove("module")
        remove("section")
        setOpen(false);
    }

    function onSubmit(e: Record<string, any>): void {
        var formData: any = {}
        switch (e.module) {
            case "registration":
                formData = {
                    "registration": {
                        "enabled": false,
                        "academicYear": e.academicYear,
                        "grade": e.grade,
                        "lastUpdate": new Date().toISOString(),
                        "programStage": e.programStage,
                        "section": e.section,
                    },
                    "program": e.program,
                    "key": e.key?.toLowerCase(),
                    "trackedEntityType": e.trackedEntityType,
                    "defaults": {
                        "allowSearching": e.allowSearching === "true",
                        "currentAcademicYear": e.currentAcademicYear,
                        "defaultOrder": `${e.defaultOrder}:${e.orderType}`,
                    },
                }
                break;
        }
        createDataStore({
            data: [formData]
        }).then(() => {
            setOpen(false);
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