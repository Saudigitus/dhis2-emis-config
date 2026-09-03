import React from 'react';
import { D2I18n } from 'dhis2-semis-types';
import ComponentConfigurationDialog from './dialogs/ComponentConfigurationDialog';
import IdentityConfigurationDialog from './dialogs/IdentityConfigurationDialog';
import TabConfigurationDialog from './dialogs/TabConfigurationDialog';
import { DialogTarget, IdentityCardConfig, ProfileComponentConfig, ProfileTabConfig, VariableOption, } from './types';

type Props = {
    i18n: D2I18n;
    target: DialogTarget;
    identityCard: IdentityCardConfig;
    attributes: VariableOption[];
    dataElements: VariableOption[];
    programStages: Array<{ id: string; label: string }>;
    onClose: () => void;
    onApplyIdentity: (value: IdentityCardConfig) => void;
    onApplyTab: (value: ProfileTabConfig) => void;
    onApplyComponent: (value: ProfileComponentConfig) => void;
    onDelete?: () => void;
};

export default function ConfigurationDialog(props: Props) {
    const { target } = props;

    if (target.kind === 'identity') {
        return (
            <IdentityConfigurationDialog
                i18n={props.i18n}
                section={target.section}
                identityCard={props.identityCard}
                attributes={props.attributes}
                dataElements={props.dataElements}
                onClose={props.onClose}
                onApply={props.onApplyIdentity}
            />
        );
    }

    if (target.kind === 'tab') {
        return (
            <TabConfigurationDialog
                i18n={props.i18n}
                tab={target.tab}
                isNew={target.isNew}
                onClose={props.onClose}
                onApply={props.onApplyTab}
                onDelete={target.isNew ? undefined : props.onDelete}
            />
        );
    }

    return (
        <ComponentConfigurationDialog
            i18n={props.i18n}
            component={target.component}
            isNew={target.isNew}
            programStages={props.programStages}
            onClose={props.onClose}
            onApply={props.onApplyComponent}
            onDelete={target.isNew ? undefined : props.onDelete}
        />
    );
}
