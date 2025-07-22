import { Outlet } from "react-router-dom"
import { HeaderBarLayout } from "dhis2-semis-components"

const WithHeaderBarLayout = () => {

    return (
        <HeaderBarLayout
            header={null}
        >
            <Outlet />
        </HeaderBarLayout>
    )
}

export default WithHeaderBarLayout