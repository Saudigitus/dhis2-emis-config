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
    const [profileConfig, setProfileConfig] = useState(sourceProfile);
    const [activeTabId, setActiveTabId] = useState(sourceProfile.tabs[0]?.id ?? '');
    const [dialogTarget, setDialogTarget] = useState<DialogTarget | null>(null);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setProfileConfig(sourceProfile);
        setActiveTabId(current => sourceProfile.tabs.some(tab => tab.id === current)
            ? current
            : sourceProfile.tabs[0]?.id ?? '');
        setDirty(false);
    }, [sourceProfile]);

    const updateProfileConfig = (next: ProfileConfig) => {
        setProfileConfig(next);
        setDirty(true);
    };

    const closeDialog = () => setDialogTarget(null);

    const updateIdentity = (identityCard: IdentityCardConfig) => {
        updateProfileConfig({ ...profileConfig, identityCard });
        closeDialog();
    };

    const updateSummaryCard = (card: ProfileSummaryCard) => {
        const exists = profileConfig.summaryCards.some(item => item.order === card.order);
        const summaryCards = exists
            ? profileConfig.summaryCards.map(item => item.order === card.order ? card : item)
            : [...profileConfig.summaryCards, card];

        updateProfileConfig({ ...profileConfig, summaryCards: summaryCards.sort((a, b) => a.order - b.order) });
        closeDialog();
    };

    const updateTab = (tab: ProfileTabConfig) => {
        const tabs = profileConfig.tabs.filter(item => item.id !== tab.id);
        const insertionIndex = Math.min(Math.max(tab.order, 0), tabs.length);
        tabs.splice(insertionIndex, 0, tab);
        updateProfileConfig({
            ...profileConfig,
            tabs: tabs.map((item, order) => ({ ...item, order })),
        });
        setActiveTabId(tab.id);
        closeDialog();
    };

    const updateComponent = (component: ProfileComponentConfig) => {
        const activeTab = profileConfig.tabs.find(tab => tab.id === activeTabId);
        if (!activeTab) return;

        const activeComponents = activeTab?.components ?? [];
        const exists = activeComponents?.some(item => item?.order === component?.order);
        const components = exists
            ? activeComponents?.map(item => item?.order === component?.order ? component : item)
            : [...activeComponents, component];

        updateProfileConfig({
            ...profileConfig,
            tabs: profileConfig.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
        });
        closeDialog();
    };

    const deleteTarget = () => {
        if (!dialogTarget) return;

        if (dialogTarget.kind === 'tab') {
            const tabs = profileConfig.tabs
                .filter(tab => tab.id !== dialogTarget.tab.id)
                .map((tab, order) => ({ ...tab, order }));
            updateProfileConfig({ ...profileConfig, tabs });
            setActiveTabId(tabs[0]?.id ?? '');
        }

        if (dialogTarget.kind === 'summaryCard') {
            updateProfileConfig({
                ...profileConfig,
                summaryCards: profileConfig.summaryCards.filter(card => card.order !== dialogTarget.card.order),
            });
        }

        if (dialogTarget.kind === 'component') {
            const activeTab = profileConfig.tabs.find(tab => tab.id === activeTabId);
            if (activeTab) {
                const components = (activeTab?.components ?? [])
                    .filter(component => component.order !== dialogTarget.component.order)
                    .map((component, order) => ({ ...component, order }));
                updateProfileConfig({
                    ...profileConfig,
                    tabs: profileConfig.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
                });
            }
        }

        closeDialog();
    };

    return {
        activeTabId,
        dialogTarget,
        dirty,
        profileConfig,
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
