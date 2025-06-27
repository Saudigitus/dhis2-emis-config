import { FC, ReactNode } from "react";
import style from "./dashboardLayout.module.css";
import { WithPadding } from "dhis2-semis-components";

interface DashboardLayoutProps {
    title: string,
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, title }) => {
    return (
        <WithPadding p="10px 30px">
            <div className={style.container}>
                <label className={style.title}>{title}</label>
                <div className={style.containerCards}>
                    {children}
                </div>
            </div>
        </WithPadding>
    )
}

export default DashboardLayout