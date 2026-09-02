import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DataStoreState } from 'dhis2-semis-components';
import { D2I18n } from 'dhis2-semis-types';
import useGetSelectedKeys from '../../../../../../libs/components/src/hooks/config/useGetSelectedKeys';
import useGetDataStore from '../../../hooks/dataStore/useGetDataStore';
import usePostDataStore from '../../../hooks/dataStore/usePostDataStore';
import useShowAlerts from '../../../hooks/alert/useShowAlert';
import {
    getAttributeOptions,
    getDataElementOptions,
    getProgramStageOptions,
    normalizeProfile,
    replaceDataStoreProfile,
} from '../utils/profileConfigUtils';
import useProfileEditor from './useProfileEditor';

export default function useProfileConfiguration(i18n: D2I18n) {
    const navigate = useNavigate();
    const { program, dataStoreData } = useGetSelectedKeys();
    const dataStore = useRecoilValue<any>(DataStoreState);
    const { createDataStore, loading: saving } = usePostDataStore();
    const { refetch } = useGetDataStore(true);
    const { show } = useShowAlerts();

    const sourceProfile = useMemo(
        () => normalizeProfile(dataStoreData?.profile, dataStoreData?.program ?? program?.id ?? ''),
        [dataStoreData?.profile, dataStoreData?.program, program?.id],
    );
    const editor = useProfileEditor(sourceProfile);

    const attributes = useMemo(() => getAttributeOptions(program), [program]);
    const dataElements = useMemo(() => getDataElementOptions(program), [program]);
    const programStages = useMemo(() => getProgramStageOptions(program), [program]);

    const saveConfiguration = async () => {
        const sectionKey = dataStoreData?.key;
        const hasSection = Array.isArray(dataStore) && dataStore.some(section => section.key === sectionKey);

        if (!sectionKey || !hasSection) {
            show({ message: i18n.t('Unable to identify the current configuration section.'), type: { critical: true } });
            return;
        }

        try {
            await createDataStore({
                data: replaceDataStoreProfile(dataStore, sectionKey, editor.draft),
                key: 'dataStore/semis/values',
            });
            await refetch();
            editor.markSaved();
            show({ message: i18n.t('Profile configuration saved successfully.'), type: { success: true } });
        } catch (error: any) {
            show({
                message: `${i18n.t('Unable to save profile configuration')}: ${error?.message ?? ''}`,
                type: { critical: true },
            });
        }
    };

    return {
        ...editor,
        attributes,
        dataElements,
        programStages,
        saving,
        goBack: () => navigate(-1),
        saveConfiguration,
    };
}
