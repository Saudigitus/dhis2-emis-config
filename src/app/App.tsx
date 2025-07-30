import React from 'react'
import "./App.module.css"
import "../assets/style/globalStyle.css"
import { Router } from "../components/routes"
import { AppWrapper } from 'dhis2-semis-components';
import { HashRouter } from 'react-router-dom';
import { useConfig } from '@dhis2/app-runtime'
import CustomAppWrapper from './wrapper/AppWrapper';

function ConfigirationsPage() {
    const { baseUrl } = useConfig()

    return (

        // <AppWrapper
        //     baseUrl={baseUrl}
        //     dataStoreKey="dataStore/edson/values"
        // >
        //     <HashRouter>
        <CustomAppWrapper>
            <Router />
        </CustomAppWrapper>
        //     </HashRouter >
        // </AppWrapper>
    )
}

export default ConfigirationsPage