import settings from "../../../assets/images/sidebar/settings.svg"
import gauge from "../../../assets/images/sidebar/gauge.svg"
import fileDocument from "../../../assets/images/sidebar/file-document.svg"
import appsLoggOut from "../../../assets/images/sidebar/apps-loggOut.svg"
import glyph from "../../../assets/images/sidebar/Glyph.svg"
import listAdd from "../../../assets/images/sidebar/listAdd.svg"
import { type SideBarItemProps } from "../../../types/sideBar/SideBarTypes"

function sideBarData(): SideBarItemProps[] {
    return [
        {
            title: "Overview",
            subItems: [
                {
                    icon: appsLoggOut,
                    label: "Modules Configuration",
                    showBadge: false,
                    route: "/apps/configuration"
                }, {
                    icon: appsLoggOut,
                    label: "Apps Instalation",
                    showBadge: false,
                    route: "/apps/installation"
                }
            ]
        },
        {
            title: "Students",
            subItems: [
                {
                    icon: settings,
                    label: "Program",
                    showBadge: false,
                    route: "/students/program"
                },
                {
                    icon: listAdd,
                    label: "Enrollment",
                    showBadge: false,
                    route: "/students/enrollment"
                },
                {
                    icon: fileDocument,
                    label: "Socio - economics",
                    showBadge: false,
                    route: "/students/socio-economics"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    route: "/students/attendance"
                },
                {
                    icon: gauge,
                    label: "Performance",
                    showBadge: false,
                    route: "/students/performance"
                }
            ]
        },
        {
            title: "Staff",
            subItems: [
                {
                    icon: settings,
                    label: "Program",
                    showBadge: false,
                    route: "/staff/program"
                },
                {
                    icon: listAdd,
                    label: "Enrollment",
                    showBadge: false,
                    route: "/staff/enrollment"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    route: "/staff/attendance"
                }
            ]
        }
    ]
}
export { sideBarData }
