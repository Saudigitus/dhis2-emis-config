import { useEffect, useState } from 'react';
import {
    DialogTarget,
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileConfig,
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

    const updateTab = (tab: ProfileTabConfig) => {
        const id = tab?.id || `profile-tab-${Date.now()}-${profileConfig.tabs.length}`;
        const nextTab = { ...tab, id, createdAt: tab?.createdAt ?? Date.now() };
        const tabs = profileConfig.tabs.filter(item => item.id !== id);
        const insertionIndex = Math.min(Math.max(nextTab.order, 0), tabs.length);
        tabs.splice(insertionIndex, 0, nextTab);
        updateProfileConfig({
            ...profileConfig,
            tabs: tabs.map((item, order) => ({ ...item, order })),
        });
        setActiveTabId(id);
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

    const deleteTarget = (target: DialogTarget | null = dialogTarget) => {
        if (!target || target.kind === 'identity') return;

        if (target.kind === 'tab') {
            const tabs = profileConfig.tabs
                .filter(tab => tab.id !== target.tab.id)
                .map((tab, order) => ({ ...tab, order }));
            updateProfileConfig({ ...profileConfig, tabs });
            setActiveTabId(current => current === target.tab.id ? tabs[0]?.id ?? '' : current);
        }

        if (target.kind === 'component') {
            const activeTab = profileConfig.tabs.find(tab => tab.id === activeTabId);
            if (activeTab) {
                const components = (activeTab?.components ?? [])
                    .filter(component => component.order !== target.component.order)
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
        updateTab,
    };
}
