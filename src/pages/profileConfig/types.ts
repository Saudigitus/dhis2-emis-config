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

export type ProfileConfig = {
    identityCard: IdentityCardConfig;
    program: string;
    tabs: ProfileTabConfig[];
};

export type VariableOption = {
    id: string;
    label: string;
    source: 'ATTRIBUTE' | 'DATA_ELEMENTS';
    valueType?: string;
};

export const emptyIdentityCard = (): IdentityCardConfig => ({
    badges: [],
    photo: { attribute: '' },
    subtitle: { attributes: [], separator: ' · ' },
    title: { attributes: [], separator: ' ' },
});

export const createProfileTab = (order: number): ProfileTabConfig => ({
    color: '#147CD7',
    components: [],
    createdAt: Date.now(),
    displayName: `Section ${order + 1}`,
    id: `profile-tab-${Date.now()}-${order}`,
    order,
});

export const createProfileComponent = (order: number): ProfileComponentConfig => ({
    type: 'TEI_FORM',
    displayName: `Component ${order + 1}`,
    editable: false,
    order,
    size: 'FULL',
});
