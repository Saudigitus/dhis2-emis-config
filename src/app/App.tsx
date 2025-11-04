import React from 'react'
import "./App.module.css"
import "../assets/style/globalStyle.css"
import { Router } from "../components/routes"
// import { useConfig } from '@dhis2/app-runtime'
import CustomAppWrapper from './wrapper/AppWrapper';
// import { AppWrapper } from 'dhis2-semis-components'
// import { HashRouter } from 'react-router-dom'
import { D2I18n } from 'dhis2-semis-types';

function ConfigirationsPage({ i18n }: { i18n: D2I18n }) {
    // const { baseUrl } = useConfig()
    const i18nLocal = i18n

    return (
        // <AppWrapper
        //     baseUrl={baseUrl}
        //     dataStoreKey="dataStore/semis/values"
        //     schoolCalendarKey='dataStore/semis/schoolCalendar'
        // >
        //     <HashRouter>
        <CustomAppWrapper i18n={i18nLocal}>
            <Router i18n={i18nLocal} />
        </CustomAppWrapper>
        //     </HashRouter >
        // </AppWrapper> 
    )
}

export default ConfigirationsPage
