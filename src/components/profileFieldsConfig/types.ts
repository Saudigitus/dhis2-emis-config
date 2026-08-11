export interface CardLayoutItem {
    id: number;
    section: number;
    fieldKey: string;
    label: string;
    sortOrder: number;
    groupId: number | null;
    groupName: string | null;
}

export interface GroupDef {
    id: number;
    name: string;
}

export interface ProfileFieldRow {
    id: number;
    fieldKey: string;
    label: string;
    fieldType: string;
    groupId: number;
    sortOrder: number;
    visible: boolean;
    options: string[] | null;
    groupName: string;
    panelType: string;
    groupColor: string;
    groupSortOrder: number;
}

export interface FieldGroup {
    id: number;
    name: string;
    panelType: string;
    sortOrder: number;
    color: string;
}

export interface GroupData {
    groupName: string;
    groupColor: string;
    groupSortOrder: number;
    fields: ProfileFieldRow[];
}

export type Block =
    | { type: 'standalone'; items: CardLayoutItem[] }
    | { type: 'group'; groupId: number; groupName: string; items: CardLayoutItem[] };
