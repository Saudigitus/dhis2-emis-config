interface DashboardCardProps {
    title: string
    subItem: CardSubItemProps[]
}

interface CardSubItemProps {
    icon: string
    title: string
    timeLabel: string
    program: string
    configRoute: string
    status: string
}
export type {DashboardCardProps, CardSubItemProps}
