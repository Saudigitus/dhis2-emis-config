import {
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileSummaryCard,
    ProfileTabConfig,
} from '../types';

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

export const createSummaryCard = (order: number): ProfileSummaryCard => ({
    displayName: '',
    order,
    source: 'ATTRIBUTE',
    variable: '',
});
