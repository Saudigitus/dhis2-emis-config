import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';

type Props = {
    i18n: D2I18n;
};

const indicators = Array.from({ length: 6 }, (_, index) => index + 1);

export default function SummaryCards({ i18n }: Props) {
    return (
        <section className={styles.summarySection} aria-label={i18n.t('Summary cards')}>
            <div className={styles.summarySectionHeader}>
                <h2>{i18n.t('Summary cards')}</h2>
                <span>{i18n.t('6 indicators')}</span>
            </div>
            <div className={styles.summaryCards}>
                {indicators.map(indicator => (
                    <div
                        key={`indicator-${indicator}`}
                        className={styles.summaryCard}
                    >
                        <span className={styles.summaryValue}>{i18n.t('N/A')}</span>
                        <span className={styles.summaryName}>
                            {i18n.t('Indicator {{number}}', { number: indicator })}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
