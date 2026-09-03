export type IdentityText = {
    attributes: string[];
    separator: string;
};

export type IdentityBadge = {
    order: number;
    source: 'ATTRIBUTE' | 'DATA_ELEMENTS';
    styled: boolean;
    variable?: string;
};

export type IdentityCardConfig = {
    badges: IdentityBadge[];
    photo: { attribute: string };
    subtitle: IdentityText;
    title: IdentityText;
};

export type ProfileComponentType = 'TEI_FORM' | 'EVENT_CARDS' | 'EVENT_TABLE';

export type ProfileComponentConfig = {
    type: ProfileComponentType;
    displayName: string;
    editable: boolean;
    order: number;
    size: string;
    details?: {
        pageSize: number;
        programStage: string;
    };
};

export type ProfileTabConfig = {
    color: string;
    components: ProfileComponentConfig[];
    createdAt: number;
    displayName: string;
    id: string;
    order: number;
};

export type ProfileSummaryCard = {
    displayName: string;
    order: number;
    source: 'ATTRIBUTE' | 'DATA_ELEMENTS';
    variable: string;
};

export type ProfileConfig = {
    identityCard: IdentityCardConfig;
    program: string;
    summaryCards: ProfileSummaryCard[];
    tabs: ProfileTabConfig[];
};

export type VariableOption = {
    id: string;
    label: string;
    source: 'ATTRIBUTE' | 'DATA_ELEMENTS';
    valueType?: string;
};

export type DialogTarget =
    | { kind: 'identity'; section: 'photo' | 'title' | 'subtitle' | 'badges' }
    | { kind: 'summaryCard'; card: ProfileSummaryCard; isNew?: boolean }
    | { kind: 'tab'; tab: ProfileTabConfig; isNew?: boolean }
    | { kind: 'component'; component: ProfileComponentConfig; isNew?: boolean };
