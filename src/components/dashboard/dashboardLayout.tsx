import { WithPadding } from "dhis2-semis-components";
import style from "./dashboardLayout.module.css";
import { FC, ReactNode } from "react";

interface DashboardLayoutProps {
    title: string,
    children: ReactNode
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, title }) => {
    return (
        <WithPadding p="10px 30px">
            <div>
                <label className={style.title}>{title}</label>
                <div className={style.containerCards}>
                    {children}
                </div>
            </div>
        </WithPadding>
    )
}

export default DashboardLayout