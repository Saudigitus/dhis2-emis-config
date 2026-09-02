import React from 'react';
import { Edit as IconEdit } from '@mui/icons-material';
import styles from './idDetails.module.css';

type Props = {
    label: string;
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};

export default function EditableRegion({ label, children, onClick, className = '' }: Props) {
    return (
        <button type="button" className={`${styles.editableRegion} ${className}`} onClick={onClick}>
            {children}
            <span className={styles.editHint}><IconEdit sx={{ fontSize: 14 }} /> {label}</span>
        </button>
    );
}
