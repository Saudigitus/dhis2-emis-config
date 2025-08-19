import { Box } from '@dhis2/ui'
import { WithPadding } from 'dhis2-semis-components'
import React from 'react'
import { dashboardData } from '../../utils/constants/dashboard/dashboardData'
import DashboardLayout from '../dashboard/dashboardLayout'
import { Skeleton } from '@mui/material'

const ConfigLoader = () => {
    return (
        <Box>
            <WithPadding p="1rem">
                {dashboardData.map(({ title: section, cards }) => (
                    <DashboardLayout key={section} title={<Skeleton variant="rounded" width={70} height={20} />}>
                        {cards.map(() => (
                            <Skeleton variant="rounded" width={180} height={202} />
                        ))}
                    </DashboardLayout>
                ))}
            </WithPadding>
        </Box>
    )
}

export default ConfigLoader