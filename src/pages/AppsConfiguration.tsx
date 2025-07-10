import { Switch } from '@dhis2/ui';
import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Settings from '@mui/icons-material/Settings';
import { useUrlParams } from 'dhis2-semis-functions';
import { DashboardCard, WithPadding } from 'dhis2-semis-components';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import ModalManager from '../components/saveConfiguration/ModalManager';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';
import InfoIcon from '@mui/icons-material/Info';
import { DataStoreDataState } from '../atoms/DataStoreDataSchema';
import { useRecoilValue } from 'recoil';
import usePostDataStore from '../hooks/dataStore/usePostDataStore';

const isModuleConfigured = (section: string, dataStore: any[]): boolean => {
  // Check if the section exists in the dataStore and if the module is configured
  if (!dataStore || !Array.isArray(dataStore)) return false;
  const sectionData = dataStore.find((item: any) => item?.key === section?.toLowerCase());
  return sectionData;
}

const isModuleEnabled = (section: string, label: string, dataStore: any[]): boolean => {
  if (isModuleConfigured(section, dataStore)) {
    const sectionData = dataStore.find((item: any) => item?.key === section?.toLowerCase());
    return sectionData?.[label]?.enabled || false;
  } else {
    return false;
  }
}

const AppsConfiguration = () => {
  const { add } = useUrlParams();
  const [open, setOpen] = useState(false);
  const { createDataStore, loading } = usePostDataStore()

  const [visible, setVisible] = useState<any>({})
  const dataStore = useRecoilValue(DataStoreDataState)


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

    createDataStore({
      data: updated,
      message: `${key} ${e?.checked ? "enabled" : "disabled"} successfully`
    })
    setVisible((prevState: any) => ({ ...prevState, [`${section}-${label}`]: e?.checked }))
  }

  const makeAction = ({ key, section, label }: { key: string, section: string, label: string }) => ([
    {
      label: "This module contain general configuration and it's required for semis to work properly",
      icon: <InfoIcon style={{ color: "orange" }} />,
    },
    {
      label: `Configure ${label.replace("-", " ")}`,
      icon: <Settings />,
      onAction: () => {
        handleConfiguration({ key, section, label })
      },
    },
    {
      label: isModuleConfigured(section, dataStore) ? `${visible[`${section}-${label}`] ? "Disable" : "Enable"} ${label.replace("-", " ")}` : `You must configure the module first to enable it`,
      icon: loading ? <CircularProgress size={20} /> : <Switch
        disabled={!isModuleConfigured(section, dataStore)}
        className="custom-switch-config"
        name={`${section}-${label}`}
        checked={visible[`${section}-${label}`] || false}
        onChange={(e: any) => onModuleEnable(e, section, label, key)}
        value="checked"
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
                  cards.map(({ key, label, icon }) => (
                    <>
                      <DashboardCard
                        key={label}
                        icon={icon}
                        contents={[{ label }]}
                        actions={[...makeAction({ key, section, label })]}
                      />
                      {open && <ModalManager open={open} setOpen={setOpen} initialValues={{ module: key, key: section }} />}

                    </>
                  ))

                }
              </DashboardLayout>
            )
          })
        }
      </WithPadding >
    </Box>
  )
}

export default AppsConfiguration