export interface CardLayoutItem {
    id: number;
    section: number;
    fieldKey: string;
    label: string;
    sortOrder: number;
    groupId: string | null;
    groupName: string | null;
}

export interface GroupDef {
    id: string;
    name: string;
}

export interface ProfileFieldRow {
    id: number;
    fieldKey: string;
    label: string;
    fieldType: string;
    groupId: string;
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
    | { type: 'group'; groupId: string; groupName: string; items: CardLayoutItem[] };
