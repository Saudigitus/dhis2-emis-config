import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { useGetProgramIndicators } from 'dhis2-semis-functions';
import { Button, Card } from '@dhis2/ui';
import { WarningAmber as WarningIcon } from '@mui/icons-material';

type Props = {
    i18n: D2I18n;
    program: string
};

const indicators = Array.from({ length: 5 }, (_, index) => index + 1);

export default function SummaryCards({ i18n, program }: Props) {
    const { programIndicators } = useGetProgramIndicators({ programId: program })

    return (
        <section className={styles.summarySection} aria-label={i18n.t('Summary cards')}>
            <div className={styles.academicYearLabel}>{i18n.t('Academic year')}: {indicators.map((year) => (
                <button
                    key={year}
                    type="button"
                    className={styles.item}
                    disabled
                >
                    Year {year}
                </button>
            ))}
                &nbsp;
                <Button
                    small
                >
                    more
                </Button>
            </div>

            <div className={styles.summarySectionHeader}>
                <h2>{i18n.t('Summary cards')}:</h2>
                <span>{i18n.t('Max: 6 indicators')}</span>
            </div>

            {programIndicators?.length === 0 ? (
                <div className={styles.summaryWarningContainer}>
                    <Card className={styles.summaryWarningCard}>
                        <span className={styles.summaryWarningIconContainer}>
                            <WarningIcon className={styles.summaryWarningIcon} />
                        </span>
                        <span className={styles.summaryWarningContent}>
                            <strong>{i18n.t('No program indicators')}</strong>
                            <span>{i18n.t('There are no program indicators configured for this program.')}</span>
                        </span>
                    </Card>
                </div>
            ) : (
                <div className={styles.summaryCards}>
                    {programIndicators?.slice(0, 6)?.map(indicator => (
                        <div
                            key={`indicator-${indicator?.id}`}
                            className={styles.summaryCard}
                        >
                            <span className={styles.summaryValue}>{i18n.t('N/A')}</span>
                            <span className={styles.summaryName}>
                                {indicator?.displayName}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
