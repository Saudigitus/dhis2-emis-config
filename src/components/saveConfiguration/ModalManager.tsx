import { format } from "date-fns";
import ModalContent from "./ModalContent";
import React, { useEffect, useState } from "react";
import { ModalComponent, } from "dhis2-semis-components";
import form from "../../utils/constants/form/configFormFields.json"
import { ModalManagerInterface } from "../../types/modal/ModalProps";
import { useUrlParams, useGetSectionTypeLabel } from "dhis2-semis-functions";

function ModalManager(props: ModalManagerInterface) {
    const { urlParameters, useQuery } = useUrlParams();
    const { school, schoolName } = urlParameters();
    const module = useQuery().get("module");
    const section = useQuery().get("section");
    const { sectionName } = useGetSectionTypeLabel();
    const { open, setOpen, initialValues: initialValuesFromSearch } = props;
    const [initialValues] = useState<object>({ registerschoolstaticform: schoolName, enrollment_date: format(new Date(), "yyyy-MM-dd"), ...initialValuesFromSearch });
    const allInitialValues = {
        ...initialValues,
    }
    const [values, setValues] = useState<{ [key: string]: any }>({ orgUnit: school, ...allInitialValues });


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

    const formVariables = form[section as keyof typeof form][module as keyof typeof form["staff"]]

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
            handleClose={handleCloseModal}
            loading={false}
            title={``}
        >
            <ModalContent
                loading={false}
                onSubmit={onSubmit}
                onChange={handleChange}
                onCancel={handleCloseModal}
                formFields={[]}
                initialValues={allInitialValues}
            />
        </ModalComponent>
    );
}

export default ModalManager;