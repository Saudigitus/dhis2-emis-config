import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppsConfiguration from '../../pages/AppsConfiguration';
import WithHeaderBarLayout from '../../layout/WithHeaderBarLayout';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<WithHeaderBarLayout />} >
                <Route key={'configuration'} path={'/'} element={<AppsConfiguration />} />
            </Route>
        </Routes>
    )
}
