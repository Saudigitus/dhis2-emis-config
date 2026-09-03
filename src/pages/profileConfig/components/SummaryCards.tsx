import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import styles from '../profileConfig.module.css';
import { DialogTarget, ProfileSummaryCard } from '../types';

type Props = {
    i18n: D2I18n;
    cards: ProfileSummaryCard[];
    onConfigure: (target: DialogTarget) => void;
};

export default function SummaryCards({ i18n, cards, onConfigure }: Props) {
    const nextOrder = Array.from({ length: 6 }, (_, order) => order)
        .find(order => !cards?.some(card => card?.order === order));

    return (
        <section className={styles.summarySection} aria-label={i18n.t('Summary cards')}>
            <div className={styles.summarySectionHeader}>
                <h2>{i18n.t('Summary cards')}</h2>
                <span>{i18n.t('Configure up to 6 cards')}</span>
            </div>
            <div className={styles.summaryCards}>
                {cards?.map(card => (
                    <button
                        type="button"
                        key={`summary-card-${card.order}`}
                        className={styles.summaryCard}
                        onClick={() => onConfigure({ kind: 'summaryCard', card })}
                    >
                        <span className={styles.summaryValue}>{i18n.t('N/A')}</span>
                        <span className={styles.summaryName}>{card.displayName}</span>
                    </button>
                ))}
                {nextOrder !== undefined && (
                    <button
                        type="button"
                        className={`${styles.summaryCard} ${styles.summaryCardEmpty}`}
                        onClick={() => onConfigure({
                            kind: 'summaryCard',
                            card: {} as any,
                            isNew: true,
                        })}
                    >
                        <span className={styles.summaryValue}>+</span>
                        <span className={styles.summaryName}>{i18n.t('Configure card')}</span>
                    </button>
                )}
            </div>
        </section>
    );
}
