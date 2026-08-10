import React from 'react';
import { IconSettings16, IconLock16 } from '@dhis2/ui';

interface LabelHeaderProps {
    currentCount: number;
    fixedMax: number;
}

export const LabelHeader: React.FC<LabelHeaderProps> = ({ currentCount, fixedMax }) => {
    return (
        <div className="lm-max-config">
            <div className="lm-max-config-title">
                <IconSettings16 />
                <span>Label Limit</span>
                <span className="lm-fixed-badge">
                    <IconLock16 />
                    Fixed to {fixedMax}
                </span>
            </div>
            <div className="lm-max-config-right">
                <span className="lm-max-config-label">Max allowed:</span>
                <span className="lm-max-value-box">{fixedMax}</span>
                <span className="lm-count-pill">
                    {currentCount} / {fixedMax}
                </span>
            </div>
        </div>
    );
};