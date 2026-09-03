import { useEffect, useState } from 'react';
import {
    DialogTarget,
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileConfig,
    ProfileSummaryCard,
    ProfileTabConfig,
} from '../types';

export default function useProfileEditor(sourceProfile: ProfileConfig) {
    const [draft, setDraft] = useState(sourceProfile);
    const [activeTabId, setActiveTabId] = useState(sourceProfile.tabs[0]?.id ?? '');
    const [dialogTarget, setDialogTarget] = useState<DialogTarget | null>(null);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setDraft(sourceProfile);
        setActiveTabId(current => sourceProfile.tabs.some(tab => tab.id === current)
            ? current
            : sourceProfile.tabs[0]?.id ?? '');
        setDirty(false);
    }, [sourceProfile]);

    const updateDraft = (next: ProfileConfig) => {
        setDraft(next);
        setDirty(true);
    };

    const closeDialog = () => setDialogTarget(null);

    const updateIdentity = (identityCard: IdentityCardConfig) => {
        updateDraft({ ...draft, identityCard });
        closeDialog();
    };

    const updateSummaryCard = (card: ProfileSummaryCard) => {
        const exists = draft.summaryCards.some(item => item.order === card.order);
        const summaryCards = exists
            ? draft.summaryCards.map(item => item.order === card.order ? card : item)
            : [...draft.summaryCards, card];

        updateDraft({ ...draft, summaryCards: summaryCards.sort((a, b) => a.order - b.order) });
        closeDialog();
    };

    const updateTab = (tab: ProfileTabConfig) => {
        const tabs = draft.tabs.filter(item => item.id !== tab.id);
        const insertionIndex = Math.min(Math.max(tab.order, 0), tabs.length);
        tabs.splice(insertionIndex, 0, tab);
        updateDraft({
            ...draft,
            tabs: tabs.map((item, order) => ({ ...item, order })),
        });
        setActiveTabId(tab.id);
        closeDialog();
    };

    const updateComponent = (component: ProfileComponentConfig) => {
        const activeTab = draft.tabs.find(tab => tab.id === activeTabId);
        if (!activeTab) return;

        const exists = activeTab.components.some(item => item.order === component.order);
        const components = exists
            ? activeTab.components.map(item => item.order === component.order ? component : item)
            : [...activeTab.components, component];

        updateDraft({
            ...draft,
            tabs: draft.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
        });
        closeDialog();
    };

    const deleteTarget = () => {
        if (!dialogTarget) return;

        if (dialogTarget.kind === 'tab') {
            const tabs = draft.tabs
                .filter(tab => tab.id !== dialogTarget.tab.id)
                .map((tab, order) => ({ ...tab, order }));
            updateDraft({ ...draft, tabs });
            setActiveTabId(tabs[0]?.id ?? '');
        }

        if (dialogTarget.kind === 'summaryCard') {
            updateDraft({
                ...draft,
                summaryCards: draft.summaryCards.filter(card => card.order !== dialogTarget.card.order),
            });
        }

        if (dialogTarget.kind === 'component') {
            const activeTab = draft.tabs.find(tab => tab.id === activeTabId);
            if (activeTab) {
                const components = activeTab.components
                    .filter(component => component.order !== dialogTarget.component.order)
                    .map((component, order) => ({ ...component, order }));
                updateDraft({
                    ...draft,
                    tabs: draft.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
                });
            }
        }

        closeDialog();
    };

    return {
        activeTabId,
        dialogTarget,
        dirty,
        draft,
        closeDialog,
        deleteTarget,
        openDialog: setDialogTarget,
        selectTab: setActiveTabId,
        updateComponent,
        updateIdentity,
        updateSummaryCard,
        updateTab,
    };
}
