import { useState } from 'react';

import './SeedButton.css';

interface SeedButtonProps {
    onSeeded?: () => void;
}

export function SeedButton({ onSeeded }: SeedButtonProps) {
    const [loading, setLoading] = useState(false);

    async function handleSeed() {
        setLoading(true);
        try {
            await fetch('/api/seed', { method: 'POST' });
            onSeeded?.();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleSeed}
            disabled={loading}
            className="sb-btn"
        >
            {loading ? 'Seeding...' : '🌱 Seed Demo Data'}
        </button>
    );
}
