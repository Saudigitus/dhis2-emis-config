import { useEffect, useState } from 'react';
import {
    DialogTarget,
    IdentityCardConfig,
    ProfileComponentConfig,
    ProfileConfig,
    ProfileTabConfig,
} from '../types';
import usePostDataStore from '../../../hooks/dataStore/usePostDataStore';
import { useRecoilValue } from 'recoil';
import { DataStoreState } from 'dhis2-semis-components';
import { useUrlParams } from 'dhis2-semis-functions';

export default function useProfileEditor(sourceProfile: ProfileConfig) {
    const [profileConfig, setProfileConfig] = useState(sourceProfile);
    const [activeTabId, setActiveTabId] = useState(sourceProfile.tabs[0]?.id ?? '');
    const [dialogTarget, setDialogTarget] = useState<DialogTarget | null>(null);
    const [dirty, setDirty] = useState(false);
    const { createDataStore, error, loading } = usePostDataStore()
    const dataStore = useRecoilValue(DataStoreState)
    const { urlParameters } = useUrlParams()
    const { sectionType } = urlParameters

    useEffect(() => {
        setProfileConfig(sourceProfile);
        setActiveTabId(current => sourceProfile.tabs.some(tab => tab.id === current)
            ? current
            : sourceProfile.tabs[0]?.id ?? '');
        setDirty(false);
    }, [sourceProfile]);

    const updateProfileConfig = async (next: ProfileConfig) => {
        let updatedDataStoreIndex = dataStore?.findIndex(x => x.key === sectionType)
        let copyDataStore: any = [...dataStore]
        copyDataStore[updatedDataStoreIndex] = { ...copyDataStore[updatedDataStoreIndex], profile: next }

        await createDataStore({ data: copyDataStore, key: 'dataStore/semis/values' })

        setProfileConfig(next);
        setDirty(true);
    };

    const closeDialog = () => setDialogTarget(null);

    const updateIdentity = async (identityCard: IdentityCardConfig) => {
        await updateProfileConfig({ ...profileConfig, identityCard });
        closeDialog();
    };

    const updateTab = async (tab: ProfileTabConfig) => {
        const id = tab?.id || `profile-tab-${Date.now()}-${profileConfig.tabs.length}`;
        const nextTab = { ...tab, id, createdAt: tab?.createdAt ?? Date.now() };
        const tabs = profileConfig.tabs.filter(item => item.id !== id);
        const insertionIndex = Math.min(Math.max(nextTab.order, 0), tabs.length);
        tabs.splice(insertionIndex, 0, nextTab);
        await updateProfileConfig({
            ...profileConfig,
            tabs: tabs.map((item, order) => ({ ...item, order })),
        });
        setActiveTabId(id);
        closeDialog();
    };

    const updateComponent = async (component: ProfileComponentConfig) => {
        const activeTab = profileConfig.tabs.find(tab => tab.id === activeTabId);
        if (!activeTab) return;

        const activeComponents = activeTab?.components ?? [];
        const exists = activeComponents?.some(item => item?.order === component?.order);
        const components = exists
            ? activeComponents?.map(item => item?.order === component?.order ? component : item)
            : [...activeComponents, component];

        await updateProfileConfig({
            ...profileConfig,
            tabs: profileConfig.tabs.map(tab => tab.id === activeTab.id ? { ...tab, components } : tab),
        });
        closeDialog();
    };

    const deleteTarget = async (target: DialogTarget | null = dialogTarget) => {
        if (!target || target.kind === 'identity') return;

        if (target.kind === 'tab') {
            const tabs = profileConfig.tabs
                .filter(tab => tab.id !== target.tab.id)
                .map((tab, order) => ({ ...tab, order }));
            await updateProfileConfig({ ...profileConfig, tabs });
            setActiveTabId(current => current === target.tab.id ? tabs[0]?.id ?? '' : current);
        }

        if (target.kind === 'component') {
            const activeTab = profileConfig.tabs.find(tab => tab.id === activeTabId);
            if (activeTab) {
                const components = (activeTab?.components ?? [])
                    .filter(component => component.order !== target.component.order)
                    .map((component, order) => ({ ...component, order }));
                await updateProfileConfig({
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
        error,
        loading,
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
