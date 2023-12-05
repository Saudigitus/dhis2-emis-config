import type { Status } from "./AppStatus"

interface IAppItem {
    id: number
    name: string
    version: string
    icon: any
    status: Status
    updatedAt: Date
}

export default IAppItem
