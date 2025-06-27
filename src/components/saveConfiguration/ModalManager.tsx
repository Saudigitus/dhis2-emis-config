import ModalContent from "./ModalContent";
import { useBuildForm } from "../../hooks/form";
import React, { useEffect, useState } from "react";
import { ModalComponent, } from "dhis2-semis-components";
import { ModalManagerInterface } from "../../types/modal/ModalProps";
import { useUrlParams, capitalizeString } from "dhis2-semis-functions";

function ModalManager(props: ModalManagerInterface) {
    const { open, setOpen } = props;
    const { useQuery } = useUrlParams();
    const name = useQuery().get("name");
    const section = useQuery().get("section");
    const [initialValues] = useState<object>({});
    const allInitialValues = { ...initialValues }
    const { buildForm } = useBuildForm()
    const formVariables = buildForm()


    console.log(formVariables, buildForm())

    // useEffect(() => {
    //     setValues(prev => ({
    //         ...prev,
    //         ...allInitialValues,
    //     }));
    // }, [updateInitialValues, generatedVariables])

    useEffect(() => {
        // if (saveMode == "CREATE" && !Object.keys(initialValuesFromSearch!).length)
        //     void returnPattern(attributes);

        // if (saveMode == "UPDATE")
        //     void getInitialValues(trackedEntity, enrollment);
    }, [open]);


    const handleCloseModal = () => setOpen(false);

    const handleChange = (e: { field: any; value: string; name: string }) => {
        // const { name, value } = e;
        // setValues(prev => ({
        //     ...allInitialValues,
        //     ...prev,
        //     [name]: value,
        // }));
    };

    function onSubmit(e: Record<string, any>): void {
    }

    return (
        <ModalComponent
            open={open}
            loading={false}
            handleClose={handleCloseModal}
            title={`${capitalizeString(name!)} - ${capitalizeString(section!)} Configuration`}
        >
            <ModalContent
                loading={false}
                onSubmit={onSubmit}
                onChange={handleChange}
                formFields={formVariables!}
                onCancel={handleCloseModal}
                initialValues={allInitialValues}
            />
        </ModalComponent>
    );
}

export default ModalManager;