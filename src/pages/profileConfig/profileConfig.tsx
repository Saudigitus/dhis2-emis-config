import React, { useRef } from 'react';
import { Button, ButtonStrip, Card, IconLock24, Label, Tooltip } from '@dhis2/ui';
import { EditDocument as IconEdit, MoreVert as IconMore, Person as IconUser } from "@mui/icons-material";
import { D2I18n, ProgramConfig } from 'dhis2-semis-types';
import { getOptionStyle } from 'dhis2-semis-functions';
import styles from './ProfileDetail.module.css';
import useGetSelectedKeys from '../../../../../libs/components/src/hooks/config/useGetSelectedKeys';
import { getDisplayName } from 'dhis2-semis-components';

function BadgeTag({ badge, i18n, program }: { badge: any; i18n: D2I18n, program: ProgramConfig }) {
    const displayValue = badge.value ?? i18n.t('Not recorded');
    const isPositive = badge.source === 'FINAL_RESULT_STATUS' ? badge.value : true;

    return (
        <div
            style={{
                color: '#fff',
                backgroundColor: getOptionStyle({ metaData: badge?.attributeId!, program: program as any, value: displayValue })?.color || "#bbbbbb"
            }}
            className={styles.badge}
        >
            {getDisplayName({ metaData: badge?.attributeId!, program, value: displayValue })}
        </div>
    );
}

export default function ProfileConfiguration(props: any) {
    const { i18n,fields, onEdit } = props;

    const { program: programData, dataStoreData } = useGetSelectedKeys()
    const moreMenuRef = React.useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef(null);

    const canUploadImage = dataStoreData.profile?.identityCard?.photo?.attribute

    const title = fields?.title ?? i18n.t('Student Profile');
    const subtitle = fields?.subtitle ?? '—';
    const badges = fields?.badges ?? [];

    const handleImageClick = () => {
    }

    const handleImageChange = async (event: any) => {
    }

    return (
        <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
                <div className={styles.profileInfo}>
                    <div
                        className={`${styles.avatarContainer} ${canUploadImage ? styles.editable : styles.disabled
                            }`}
                        onClick={canUploadImage ? handleImageClick : undefined}
                    >

                        <IconUser
                            sx={{ color: '#1E6194', fontSize: 28 }}
                        />

                        <Tooltip content={i18n.t("You can't upload/change a photo")}>
                            <div className={styles.disabledIndicator}>
                                <IconLock24 />
                            </div>
                        </Tooltip>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className={styles.studentDetails}>
                        <h2 className={styles.studentName}>{title}</h2>
                        <Label className={styles.studentId}>{subtitle}</Label>
                        <div className={styles.tagsContainer}>
                            {badges.map((badge: any) => (
                                <BadgeTag key={badge.order} badge={badge} i18n={i18n} program={programData!} />
                            ))}
                        </div>
                    </div>

                </div>

                <ButtonStrip>
                    <Button small primary onClick={onEdit} icon={<IconEdit sx={{ fontSize: 15 }} />}>
                        {i18n.t('Edit')}
                    </Button>
                    <div ref={moreMenuRef}>
                        <Button
                            small
                            secondary
                            icon={<IconMore />}
                            aria-label="More actions"
                        />
                    </div>
                </ButtonStrip>
            </div>
        </Card >
    );
}
