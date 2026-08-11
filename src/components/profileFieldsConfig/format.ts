export function isNotRecorded(val: unknown): boolean {
    return val === null || val === undefined || val === '';
}

export function formatFieldValue(
    val: unknown,
    type: string,
    key?: string
): string {
    if (val === null || val === undefined || val === '') return '—';

    if (type === 'date') {
        const date = new Date(String(val));

        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString();
        }
        
        return String(val);
    }

    if (type === 'boolean') {
        return val === true || val === 'true' ? 'Yes' : 'No';
    }

    return String(val);
}
