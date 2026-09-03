import { D2I18n } from 'dhis2-semis-types';
import { ProfileComponentSize, ProfileComponentType } from '../types';

export const getComponentColumnSpan = (size?: ProfileComponentSize) => {
    const match = /^w([1-9]|1[0-2])$/.exec(size ?? '');
    return match ? Number(match[1]) : 12;
};

export const getComponentTypeLabel = (type: ProfileComponentType, i18n: D2I18n) => ({
    TEI_FORM: i18n.t('Personal details'),
    EVENT_CARDS: i18n.t('Event cards'),
    EVENT_TABLE: i18n.t('Event table'),
}[type]);
