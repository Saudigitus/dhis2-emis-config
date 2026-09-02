import React from "react";
import { Navigate } from "react-router-dom";
import { SimpleLayout } from "dhis2-semis-components";
import AppsConfiguration from "../../pages/AppsConfiguration";
import { D2I18n } from "dhis2-semis-types";
import ProfileConfiguration from "../../pages/profileConfig/profileConfig";

export default function RouteList({ i18n }: { i18n: D2I18n }) {
    console.log('á')
    return [
        {
            path: '/',
            layout: SimpleLayout,
            component: () => <Navigate to="/semis/configuration" replace />
        },
        {
            path: '/semis/configuration',
            layout: SimpleLayout,
            component: () => <AppsConfiguration i18n={i18n} />
        },
         {
            path: '/semis/profile',
            layout: SimpleLayout,
            component: () => <ProfileConfiguration i18n={i18n} />
        }
    ]
}
