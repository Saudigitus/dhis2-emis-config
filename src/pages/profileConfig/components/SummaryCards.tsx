import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { useGetProgramIndicators } from 'dhis2-semis-functions';

type Props = {
    i18n: D2I18n;
    program: string
};


export default function SummaryCards({ i18n, program }: Props) {
    const { programIndicators } = useGetProgramIndicators({ programId: program })

    return (
        <section className={styles.summarySection} aria-label={i18n.t('Summary cards')}>
            <div className={styles.academicYearLabel}>{i18n.t('Academic year')}:</div>

            <div className={styles.summarySectionHeader}>
                <h2>{i18n.t('Summary cards')}</h2>
                <span>{i18n.t('Max: 6 indicators')}</span>
            </div>
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
        </section>
    );
}
