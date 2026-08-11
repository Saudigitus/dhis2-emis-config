import React from 'react';
import { IconCheckmarkCircle16, IconWarningFilled16 } from '@dhis2/ui';
import { motion } from 'framer-motion';
import { DEFAULT_LABEL_COLORS } from '../../utils/constants/colors/colors';
import { LabelInputType, LabelOption } from '../../types/profileTypes/profileTypes';

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
    inputType?: LabelInputType;
    availableOptions?: LabelOption[];
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
    inputType = 'text',
    availableOptions = [],
}) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onAddLabel();
        }
    };

    const isList = inputType === 'list';

    return (
        <div className="lm-input-section-content">
            <label className="lm-input-label">
                {isList ? 'Add a Tab' : 'Add a Tab'}
            </label>

            <div className="lm-input-row">
                {isList ? (
                    <div className="lm-input-wrapper lm-select-wrapper">
                        <select
                            value={inputText}
                            onChange={(e) => {
                                setInputText(e.target.value);
                                if (errorMsg) setErrorMsg(null);
                            }}
                            disabled={isMaxReached || availableOptions.length === 0}
                            className={`lm-select-input ${isMaxReached ? 'is-disabled' : ''}`}
                        >
                            <option value="">
                                {isMaxReached
                                    ? `Maximum of ${fixedMax} labels reached`
                                    : 'Select an option...'}
                            </option>

                            {availableOptions.map((option) => (
                                <option key={option.key} value={option.key}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <svg
                            className="lm-select-chevron"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                ) : (
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
                )}

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
