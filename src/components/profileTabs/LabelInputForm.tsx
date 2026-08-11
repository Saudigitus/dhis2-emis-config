import React, { useEffect, useRef, useState } from 'react';
import { IconCheckmarkCircle16, IconWarningFilled16, IconChevronDown16, IconSearch16 } from '@dhis2/ui';
import { motion } from 'framer-motion';
import { LabelInputType, LabelOption } from '../../types/profileTypes/profileTypes';

interface LabelInputFormProps {
    inputText: string;
    setInputText: (val: string) => void;
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
            <label className="lm-input-label">Add a Tab</label>

            <div className="lm-input-row">
                <div className="lm-input-wrapper">
                    {isList ? (
                        <SearchableSelect
                            options={availableOptions}
                            value={inputText}
                            onChange={setInputText}
                            disabled={isMaxReached || availableOptions.length === 0}
                            placeholder={
                                isMaxReached
                                    ? `Maximum of ${fixedMax} labels reached`
                                    : 'Search / select an option...'
                            }
                        />
                    ) : (
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
                    )}
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

interface SearchableSelectProps {
    options: LabelOption[];
    value: string;
    onChange: (key: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
    options,
    value,
    onChange,
    disabled,
    placeholder,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = query.trim()
        ? options.filter((o) =>
            o.label.toLowerCase().includes(query.toLowerCase())
        )
        : options;

    const selectedLabel = options.find((o) => o.key === value)?.label ?? '';

    return (
        <div className="lm-searchable-select" ref={containerRef}>
            <div className="lm-searchable-input-wrap">
                <span className="lm-searchable-icon">
                    <IconSearch16 />
                </span>

                <input
                    type="text"
                    value={isOpen ? query : selectedLabel}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => {
                        setIsOpen(true);
                        setQuery('');
                    }}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    className={`lm-searchable-input ${disabled ? 'is-disabled' : ''}`}
                />

                <button
                    type="button"
                    className="lm-searchable-toggle"
                    onClick={() => setIsOpen((prev) => !prev)}
                    tabIndex={-1}
                >
                    <IconChevronDown16 />
                </button>
            </div>

            {isOpen && !disabled && (
                <div className="lm-searchable-dropdown">
                    {filtered.length === 0 ? (
                        <div className="lm-searchable-empty">No matching options</div>
                    ) : (
                        filtered.map((option) => (
                            <button
                                key={option.key}
                                type="button"
                                className={`lm-searchable-option ${option.key === value ? 'is-selected' : ''}`}
                                onClick={() => {
                                    onChange(option.key);
                                    setIsOpen(false);
                                    setQuery('');
                                }}
                            >
                                {option.label}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
