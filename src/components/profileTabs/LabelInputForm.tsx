import React from 'react';
import { IconCheckmarkCircle16, IconWarningFilled16 } from '@dhis2/ui';
import { motion } from 'framer-motion';
import { DEFAULT_LABEL_COLORS } from '../../utils/constants/colors/colors';

interface LabelInputFormProps {
    inputText: string;
    setInputText: (val: string) => void;
    selectedColor: typeof DEFAULT_LABEL_COLORS[0];
    setSelectedColor: (color: typeof DEFAULT_LABEL_COLORS[0]) => void;
    onAddLabel: () => void;
    isMaxReached: boolean;
    errorMsg: string | null;
    setErrorMsg: (msg: string | null) => void;
    fixedMax: number;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export const LabelInputForm: React.FC<LabelInputFormProps> = ({
    inputText,
    setInputText,
    selectedColor,
    setSelectedColor,
    onAddLabel,
    isMaxReached,
    errorMsg,
    setErrorMsg,
    fixedMax,
    inputRef,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddLabel();
        }
    };

    return (
        <div className="lm-input-section-content">
            <label className="lm-input-label">Add a Tab</label>

            <div className="lm-input-row">
                <div className="lm-input-wrapper">
                    <input
                        ref={inputRef as any}
                        type="text"
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                            if (errorMsg) setErrorMsg(null);
                        }}
                        onKeyDown={handleKeyDown}
                        disabled={isMaxReached}
                        placeholder={
                            isMaxReached
                                ? `Maximum of ${fixedMax} labels reached`
                                : 'Write label name (e.g. Active Student, High Priority)...'
                        }
                        className={`lm-text-input ${isMaxReached ? 'is-disabled' : ''}`}
                    />
                </div>

                <button
                    type="button"
                    onClick={onAddLabel}
                    disabled={isMaxReached || !inputText.trim()}
                    className={`lm-ok-button ${isMaxReached || !inputText.trim() ? 'is-disabled' : 'is-enabled'
                        }`}
                >
                    <IconCheckmarkCircle16 />
                    <span>OK</span>
                </button>
            </div>

            {errorMsg && (
                <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lm-error-msg"
                >
                    <IconWarningFilled16 />
                    <span>{errorMsg}</span>
                </motion.div>
            )}
        </div>
    );
};