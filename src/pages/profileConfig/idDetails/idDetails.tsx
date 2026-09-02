import React from 'react';
import { Card } from '@dhis2/ui';
import { Person as IconUser } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from './idDetails.module.css';
import { IdentityCardConfig, VariableOption } from '../types';
import EditableRegion from './EditableRegion';

type IdentitySection = 'photo' | 'title' | 'subtitle' | 'badges';

type Props = {
    i18n: D2I18n;
    config: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    onConfigure: (section: IdentitySection) => void;
};

const getLabels = (ids: string[], variables: VariableOption[]) => {
    const labels = new Map(variables.map(variable => [variable.id, variable.label]));
    return ids.map(id => labels.get(id) ?? id);
};

export default function IdDetails({ i18n, config, attributes, dataElements, onConfigure }: Props) {
    const titleLabels = getLabels(config.title.attributes, attributes);
    const subtitleLabels = getLabels(config.subtitle.attributes, attributes);
    const allVariables = [...attributes, ...dataElements];
    const badgeLabels = config.badges.map(badge => {
        const match = allVariables.find(variable => variable.id === badge.variable && variable.source === badge.source);
        return match?.label ?? badge.variable ?? i18n.t('Variable');
    });
    const photo = attributes.find(attribute => attribute.id === config.photo.attribute);

    return (
        <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
                <div className={styles.profileInfo}>
                    <EditableRegion label={i18n.t('Photo')} className={styles.avatarRegion} onClick={() => onConfigure('photo')}>
                        <span className={styles.avatarContainer}>
                            <IconUser sx={{ color: '#1E6194', fontSize: 28 }} />
                        </span>
                        <span className={styles.photoName}>{photo?.label ?? i18n.t('Select photo')}</span>
                    </EditableRegion>

                    <div className={styles.studentDetails}>
                        <EditableRegion label={i18n.t('Title')} onClick={() => onConfigure('title')}>
                            <span className={styles.studentName}>
                                {titleLabels.length > 0 ? titleLabels.join(config.title.separator) : i18n.t('Select title variables')}
                            </span>
                        </EditableRegion>
                        <EditableRegion label={i18n.t('Subtitle')} onClick={() => onConfigure('subtitle')}>
                            <span className={styles.studentId}>
                                {subtitleLabels.length > 0 ? subtitleLabels.join(config.subtitle.separator) : i18n.t('Select subtitle variables')}
                            </span>
                        </EditableRegion>
                        <EditableRegion label={i18n.t('Badges')} onClick={() => onConfigure('badges')}>
                            <span className={styles.tagsContainer}>
                                {badgeLabels.length > 0 ? badgeLabels.map((badgeLabel, index) => (
                                    <span key={`${badgeLabel}-${index}`} className={styles.badge}>{badgeLabel}</span>
                                )) : <span className={styles.emptyBadges}>{i18n.t('Add badges')}</span>}
                            </span>
                        </EditableRegion>
                    </div>
                </div>

                <div className={styles.previewLabel}>{i18n.t('Identity card')}</div>
            </div>
        </Card>
    );
}
