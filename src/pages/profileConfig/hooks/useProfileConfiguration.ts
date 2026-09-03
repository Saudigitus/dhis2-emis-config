import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetSelectedKeys from '../../../../../../libs/components/src/hooks/config/useGetSelectedKeys';
import {
    getAttributeOptions,
    getDataElementOptions,
    getProgramStageOptions,
    normalizeProfile,
} from '../utils/profileConfigUtils';
import useProfileEditor from './useProfileEditor';

export default function useProfileConfiguration() {
    const navigate = useNavigate();
    const { program, dataStoreData } = useGetSelectedKeys();

    const sourceProfile = useMemo(
        () => normalizeProfile(dataStoreData?.profile, dataStoreData?.program ?? program?.id ?? ''),
        [dataStoreData?.profile, dataStoreData?.program, program?.id],
    );
    const editor = useProfileEditor(sourceProfile);

    const attributes = useMemo(() => getAttributeOptions(program), [program]);
    const dataElements = useMemo(() => getDataElementOptions(program), [program]);
    const programStages = useMemo(() => getProgramStageOptions(program), [program]);
console.log(program)
    return {
        ...editor,
        attributes,
        dataElements,
        programStages,
        goBack: () => navigate(-1),
    };
}
