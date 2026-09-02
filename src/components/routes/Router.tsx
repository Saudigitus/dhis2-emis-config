import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import AppsConfiguration from '../../pages/AppsConfiguration';
import { D2I18n } from 'dhis2-semis-types';
import ProfileConfiguration from '../../pages/profileConfig/profileConfig';

export default function Router({ i18n }: { i18n: D2I18n }) {
    
    return (
        <Routes>
            <Route path='/' element={<Outlet />} >
                <Route key={'configuration'} path={'/'} element={<AppsConfiguration i18n={i18n} />} />
                <Route key={'profile'} path={'/profile'} element={<ProfileConfiguration i18n={i18n} />} />
            </Route>
        </Routes>
    )
}
