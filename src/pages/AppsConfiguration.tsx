import { Switch } from '@dhis2/ui';
import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Settings from '@mui/icons-material/Settings';
import { useUrlParams } from 'dhis2-semis-functions';
import { DashboardCard, DataStoreState, WithPadding } from 'dhis2-semis-components';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import ModalManager from '../components/saveConfiguration/ModalManager';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';
import InfoIcon from '@mui/icons-material/Info';
import { useRecoilValue } from 'recoil';
import usePostDataStore from '../hooks/dataStore/usePostDataStore';
import useGetDataStore from '../hooks/dataStore/useGetDataStore';
import { moduleBodyToForm } from '../utils/form/formatters/formatDataStoreValues';
import { getDataStoreSection, isModuleConfigured, isModuleEnabled } from '../utils/dataStore/common';

const AppsConfiguration = () => {
  const { add } = useUrlParams();
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const { createDataStore } = usePostDataStore()
  const dataStore = useRecoilValue(DataStoreState)
  const { refetch } = useGetDataStore(true)
  const [loading, setLoading] = useState<any>({})

  const handleConfiguration = ({ key, section, label }: { key: string, section: string, label: string }) => {
    add("name", label)
    add("module", key)
    add("section", section.toLocaleLowerCase())
    setOpen(true)
  }

  const onModuleEnable = (e: any, section: string, label: string, key: string) => {
    const updated = dataStore.map((itemSection: any) =>
      itemSection.key === section?.toLowerCase()
        ? {
          ...itemSection,
          [key]: {
            ...itemSection[key],
            enabled: e?.checked,
          }
        }
        : itemSection
    )

    setLoading({ [key+section]: true })
    createDataStore({
      data: updated,
      message: `${section} ${key} ${e?.checked ? "enabled" : "disabled"} successfully`
    }).then(() => {
      refetch().then(() => {
        setLoading({ [key+section]: false })
      })
    })
  }

  const makeAction = ({ key, section, label, registrationLabel, configurable }: { configurable: boolean, key: string, section: string, label: string, registrationLabel: string }) => ([
    ...(key == "registration" ? [{
      label: "This module contain general configuration and it's required for semis to work properly",
      icon: <InfoIcon style={{ color: "orange" }} />,
    }] : [{}]),
    ...(configurable ? [{
      label: (key == "registration" || isModuleConfigured(section, dataStore, "registration"))
        ? `Configure ${label.replace("-", " ")}`
        : `Cannot configure ${label.replace("-", " ")} before configuring ${registrationLabel}`,
      icon: <Settings />,
      disabled: key == "registration" ? false : !isModuleConfigured(section, dataStore, "registration"),
      onAction: () => {
        handleConfiguration({ key, section, label })
        const initialValues = {
          module: key, key: section.toLocaleLowerCase(),
          ...moduleBodyToForm(getDataStoreSection(section, dataStore), key ?? "")
        }
        setInitialValues(initialValues)
      },
    }] : []),
    {
      label: isModuleConfigured(section, dataStore, key) ? `${isModuleEnabled(section, key, dataStore) ? 'Disable' : 'Enable'} ${label.replace("-", " ")}` : `You must configure this module first to enable it`,
      icon: (loading?.[key+section]) ? <CircularProgress size={20} /> :
        <Switch
          disabled={!isModuleConfigured(section, dataStore, key)}
          className="custom-switch-config"
          name={`${section}-${label}`}
          checked={isModuleEnabled(section, key, dataStore)}
          onChange={(e: any) => onModuleEnable(e, section, label, key)}
        />
    }
  ]);

  return (
    <Box height={"93vh"} style={{ overflowY: "scroll" }}>
      <WithPadding p="2rem">
        {
          dashboardData?.map(({ title: section, cards }) => {
            return (
              <DashboardLayout title={section} >
                {
                  cards.map(({ key, label, icon, configurable }) => (
                    <DashboardCard
                      key={label}
                      icon={icon}
                      contents={[{ label }]}
                      actions={[...makeAction({ key, section, label, registrationLabel: cards[0]?.label, configurable })]}
                    />
                  ))
                }
              </DashboardLayout>
            )
          })
        }
        {open && <ModalManager open={open} setOpen={setOpen} initialValues={initialValues} />}
      </WithPadding >
    </Box>
  )
}

export default AppsConfiguration