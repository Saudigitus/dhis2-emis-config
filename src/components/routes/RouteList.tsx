import { Navigate } from "react-router-dom";
import React from "react";
import { SideBarLayout, SimpleLayout } from "../../layout"
import { AppsConfiguration, AppsInstallation, GenericForm, StaffAttendance, StaffEnrollment, StaffProgram, StudentsAttendance, StudentsEnrollment, StudentsPerformance, StudentsProgram, StudentsSocioEconomics } from "../../pages";

export default function RouteList() {
    return [
        {
            path: "/",
            layout: SimpleLayout,
            component: () => <Navigate to="/students/program" replace />
        },
        {
            path: "/students/program",
            layout: SideBarLayout,
            component: () => <StudentsProgram />
        },
        {
            path: "/students/enrollment",
            layout: SideBarLayout,
            component: () => <StudentsEnrollment />
        },
        {
            path: "/students/socio-economics",
            layout: SideBarLayout,
            component: () => <StudentsSocioEconomics />
        },
        {
            path: "/students/attendance",
            layout: SideBarLayout,
            component: () => <StudentsAttendance />
        },
        {
            path: "/students/performance",
            layout: SideBarLayout,
            component: () => <StudentsPerformance />
        },
        {
            path: "/staff/program",
            layout: SideBarLayout,
            component: () => <StaffProgram />
        },
        {
            path: "/staff/enrollment",
            layout: SideBarLayout,
            component: () => <StaffEnrollment />
        },
        {
            path: "/staff/attendance",
            layout: SideBarLayout,
            component: () => <StaffAttendance />
        },
        {
            path: "/apps/installation",
            layout: SideBarLayout,
            component: () => <AppsInstallation />
        },
        {
            path: "/apps/configuration",
            layout: SideBarLayout,
            component: AppsConfiguration
        },
        {
            path: "/form",
            layout: SideBarLayout,
            component: GenericForm
        }
    ]
}
