import React from 'react';

import './IdentityCard.css';
import { formatFieldValue } from './format';
import { CardLayoutItem, Block } from './types';

interface IdentityCardProps {
    student: {
        id: number;
        fullName: string;
        photoUrl: string | null;
    };
    layout: CardLayoutItem[];
    studentData: Record<string, unknown>;
}

const BADGE_STYLES: Record<string, string> = {
    enrollmentStatus: 'ic-badge-green',
    gender: 'ic-badge-pink',
};

const BADGE_ICONS: Record<string, string> = {
    enrollmentStatus: '✅',
    gender: '♀',
};

/* Build blocks: items with same groupId stay together */
function buildBlocks(fields: CardLayoutItem[]): Block[] {
    const blocks: Block[] = [];
    for (const f of fields) {
        if (f.groupId === null) {
            blocks.push({ type: 'standalone', items: [f] });
        } else {
            const last = blocks[blocks.length - 1];
            if (last && last.type === 'group' && last.groupId === f.groupId) {
                last.items.push(f);
            } else {
                blocks.push({ type: 'group', groupId: f.groupId, groupName: f.groupName || '', items: [f] });
            }
        }
    }
    return blocks;
}

/* Render section with grouped/standalone logic */
function renderBlocks(blocks: Block[], studentData: Record<string, unknown>): React.ReactNode[] {
    const result: React.ReactNode[] = [];
    blocks.forEach((block, blockIdx) => {
        const values = block.items
            .map((item) => {
                const val = studentData[item.fieldKey];
                return val !== null && val !== undefined && val !== '' ? formatFieldValue(val, 'text', item.fieldKey) : null;
            })
            .filter(Boolean) as string[];

        if (values.length === 0) return;

        if (block.type === 'group') {
            // Group: join values with space, display as one unit with group name
            result.push(
                <span key={`g-${block.groupId}`} className="ic-subtitle-part ic-subtitle-group">
                    {block.groupName && (
                        <span className="ic-group-tag">
                            {block.groupName}
                        </span>
                    )}
                    <span>{values.join(' ')}</span>
                </span>
            );
        } else {
            // Standalone
            result.push(
                <span key={`s-${block.items[0].fieldKey}`} className="ic-subtitle-part">{values.join(' ')}</span>
            );
        }
    });
    return result;
}

export function IdentityCard({ student, layout, studentData }: IdentityCardProps) {
    const section1 = layout.filter((l) => l.section === 1).sort((a, b) => a.sortOrder - b.sortOrder);
    const section2 = layout.filter((l) => l.section === 2).sort((a, b) => a.sortOrder - b.sortOrder);
    const section3 = layout.filter((l) => l.section === 3).sort((a, b) => a.sortOrder - b.sortOrder);

    // Section 1: headline — always joined with space
    const headline = section1
        .map((item) => studentData[item.fieldKey])
        .filter(Boolean)
        .map((v) => String(v))
        .join(' ')
        || student.fullName;

    // Section 2: subtitle — grouped vs standalone
    const s2Blocks = buildBlocks(section2);
    const subtitleParts = renderBlocks(s2Blocks, studentData);

    // Section 3: badges — separate items
    const badges = section3
        .map((item) => {
            const val = studentData[item.fieldKey];
            if (val === null || val === undefined || val === '') return null;
            const badgeClass = BADGE_STYLES[item.fieldKey] || 'ic-badge-default';
            const icon = BADGE_ICONS[item.fieldKey] || '';
            return { item, val, badgeClass, icon };
        })
        .filter(Boolean) as { item: CardLayoutItem; val: unknown; badgeClass: string; icon: string }[];

    return (
        <div className="ic-card">
            <div className="ic-main">
                {/* Photo */}
                <div className="ic-photo">
                    {student.photoUrl ? (
                        <img src={student.photoUrl} alt={student.fullName} className="ic-photo-img" />
                    ) : (
                        <div className="ic-photo-initial">
                            {student.fullName.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="ic-info">
                    {/* Section 1 — Headline */}
                    <h1 className="ic-headline">{headline}</h1>

                    {/* Section 2 — Subtitle */}
                    {subtitleParts.length > 0 && (
                        <p className="ic-subtitle">
                            {subtitleParts.map((part, idx) => (
                                <span key={idx}>
                                    {idx > 0 && <span className="ic-subtitle-sep">·</span>}
                                    {part}
                                </span>
                            ))}
                        </p>
                    )}

                    {/* Section 3 — Badges */}
                    {badges.length > 0 && (
                        <div className="ic-badges">
                            {badges.map(({ item, val, badgeClass, icon }) => (
                                <span key={item.fieldKey} className={`ic-badge ${badgeClass}`}>
                                    {icon && <span>{icon}</span>}
                                    {String(val)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="ic-actions">
                    <a href={`/students/${student.id}/edit`} className="ic-edit-btn">
                        <svg className="ic-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Edit
                    </a>
                    <button className="ic-more-btn">
                        <svg className="ic-icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
