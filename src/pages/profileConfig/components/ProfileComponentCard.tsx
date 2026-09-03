import React from 'react';
import { DeleteOutline as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileComponentConfig } from '../types';
import { getComponentColumnSpan, getComponentTypeLabel } from '../utils/profileSectionsUtils';

type Props = {
    i18n: D2I18n;
    component: ProfileComponentConfig;
    programStages: Array<{ id: string; label: string }>;
    onConfigure: (target: DialogTarget) => void;
    onDelete: (target: Extract<DialogTarget, { kind: 'component' }>) => void;
};

export default function ProfileComponentCard({
    i18n,
    component,
    programStages,
    onConfigure,
    onDelete,
}: Props) {
    const programStage = component?.details?.programStage;
    const programStageLabel = programStage
        ? programStages?.find(stage => stage?.id === programStage)?.label ?? programStage
        : '';

    return (
        <div
            className={styles.componentCard}
            style={{ gridColumn: `span ${getComponentColumnSpan(component?.size)}` }}
        >
            <span className={styles.componentHeader}>
                <span>{component.displayName}</span>
                <span className={styles.itemActions}>
                    <button
                        type="button"
                        className={styles.iconAction}
                        onClick={() => onConfigure({ kind: 'component', component })}
                        title={i18n.t('Edit component')}
                        aria-label={i18n.t('Edit component')}
                    >
                        <EditIcon sx={{ fontSize: 16 }} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.iconAction} ${styles.deleteAction}`}
                        onClick={() => onDelete({ kind: 'component', component })}
                        title={i18n.t('Delete component')}
                        aria-label={i18n.t('Delete component')}
                    >
                        <DeleteIcon sx={{ fontSize: 17 }} />
                    </button>
                </span>
            </span>
            <button
                type="button"
                className={styles.componentBody}
                onClick={() => onConfigure({ kind: 'component', component })}
            >
                {getComponentTypeLabel(component.type, i18n)}
                {programStageLabel && ` · ${programStageLabel}`}
            </button>
        </div>
    );
}
