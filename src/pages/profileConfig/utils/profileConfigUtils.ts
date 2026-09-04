import { ProfileConfig, VariableOption } from '../types';

export type ProgramStageOption = { id: string; label: string };

export const normalizeProfile = (
    profile: Partial<ProfileConfig> | undefined,
    programId = '',
): ProfileConfig => {
    const emptyIdentity: any = {};

    return {
        identityCard: {
            ...emptyIdentity,
            ...(profile?.identityCard ?? {}),
            photo: { ...emptyIdentity?.photo, ...(profile?.identityCard?.photo ?? {}) },
            title: { ...emptyIdentity?.title, ...(profile?.identityCard?.title ?? {}) },
            subtitle: { ...emptyIdentity?.subtitle, ...(profile?.identityCard?.subtitle ?? {}) },
            badges: profile?.identityCard?.badges ?? [],
        },
        program: profile?.program ?? programId,
        tabs: (profile?.tabs ?? []).map((tab, tabIndex) => ({
            ...tab,
            order: tabIndex,
            components: (tab.components ?? []).map((component, componentIndex) => ({
                ...component,
                order: componentIndex,
            })),
        })),
    };
};

export const getAttributeOptions = (program: any): VariableOption[] => (
    program?.programTrackedEntityAttributes ?? []
).map((item: any) => ({
    id: item.trackedEntityAttribute.id,
    label: item.trackedEntityAttribute.displayName ?? item.trackedEntityAttribute.name,
    source: 'ATTRIBUTE' as const,
    valueType: item.trackedEntityAttribute.valueType,
}));

export const getDataElementOptions = (program: any): VariableOption[] => {
    const unique = new Map<string, VariableOption>();

    (program?.programStages ?? []).forEach((stage: any) => {
        (stage.programStageDataElements ?? []).forEach((item: any) => {
            const element = item.dataElement;
            if (element?.id && !unique.has(element.id)) {
                unique.set(element.id, {
                    id: element.id,
                    label: element.displayName ?? element.name,
                    source: 'DATA_ELEMENTS',
                    valueType: element.valueType,
                });
            }
        });
    });

    return Array.from(unique.values());
};

export const getProgramStageOptions = (program: any): ProgramStageOption[] => (
    program?.programStages ?? []
).map((stage: any) => ({ id: stage.id, label: stage.displayName }));
