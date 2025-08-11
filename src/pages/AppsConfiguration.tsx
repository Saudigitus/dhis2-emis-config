import { Switch } from '@dhis2/ui';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Settings from '@mui/icons-material/Settings';
import { useUrlParams } from 'dhis2-semis-functions';
import { DashboardCard, DataStoreState, WithPadding, useDataStore, useSchoolCalendar } from 'dhis2-semis-components';
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
  const { add, useQuery } = useUrlParams();
  const name = useQuery.get("name")
  const module = useQuery.get("module")
  const section = useQuery.get("section")
  const [initialValues, setInitialValues] = useState({});
  const { createDataStore } = usePostDataStore()
  const dataStore = useRecoilValue(DataStoreState)
  const { refetch } = useGetDataStore(true)
  const { academicYear } = useSchoolCalendar();
  const [loading, setLoading] = useState<any>({})
  const { getDataStore } = useDataStore({ keySpace: 'dataStore/semis/values' })
  const [open, setOpen] = useState(Boolean(name && module && section));

  useEffect(() => {
    if (open) {
      console.log(getDataStoreSection(section!, dataStore), "getDataStoreSection")
      const initialValues = {
        module: module, key: section!.toLocaleLowerCase(),
        ...moduleBodyToForm(getDataStoreSection(section!, dataStore), module ?? "")
      }
      setInitialValues(() => initialValues)
      handleConfiguration({ module: module!, section: section!, label: name! })
    }
  }, [])

  const handleConfiguration = ({ module, section, label }: { module: string, section: string, label: string }) => {
    add("name", label)
    add("module", module)
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

    setLoading({ [key + section]: true })
    createDataStore({
      data: updated,
      key: 'dataStore/semis/values',
      message: `${section} ${key} ${e?.checked ? "enabled" : "disabled"} successfully`
    }).then(() => {
      refetch().then(async () => {
        await getDataStore(true)
      })
      setLoading({ [key + section]: false })
    })
  }

  const makeAction = ({ module, section, label, registrationLabel, configurable }: { configurable: boolean, module: string, section: string, label: string, registrationLabel: string }) => ([
    ...(module == "registration" ? [{
      label: "This module contain general configuration and it's required for semis to work properly",
      icon: <InfoIcon style={{ color: "orange" }} />,
    }] : [{}]),
    ...(configurable ? [{
      label: (module == "registration" || isModuleConfigured(section, dataStore, "registration"))
        ? `Configure ${label.replace("-", " ")}`
        : `Cannot configure ${label.replace("-", " ")} before configuring ${registrationLabel}`,
      icon: <Settings />,
      disabled: module == "registration" ? false : !isModuleConfigured(section, dataStore, "registration"),
      onAction: () => {
        const initialValues = {
          module: module, key: section.toLocaleLowerCase(),
          ...moduleBodyToForm(getDataStoreSection(section, dataStore), module ?? "")
        }
        setInitialValues(() => initialValues)
        handleConfiguration({ module, section, label })
      },
    }] : []),
    {
      label: isModuleConfigured(section, dataStore, module) ? `${isModuleEnabled(section, module, dataStore) ? 'Disable' : 'Enable'} ${label.replace("-", " ")}` : `You must configure this module first to enable it`,
      icon: (loading?.[module + section]) ? <CircularProgress size={20} /> :
        <Switch
          disabled={!isModuleConfigured(section, dataStore, module)}
          className="custom-switch-config"
          name={`${section}-${label}`}
          checked={isModuleEnabled(section, module, dataStore)}
          onChange={(e: any) => onModuleEnable(e, section, label, module)}
        />
    }
  ]);

  return (
    <Box>
      <WithPadding p="1rem">
        {
          dashboardData?.map(({ title: section, cards }) => {
            return (
              <DashboardLayout title={section} >
                {
                  cards.map(({ key: module, label, icon, configurable }) => (
                    <DashboardCard
                      key={label}
                      icon={icon}
                      contents={[{ label }]}
                      actions={[...makeAction({ module, section, label, registrationLabel: cards[0]?.label, configurable })]}
                    />
                  ))
                }
              </DashboardLayout>
            )
          })
        }
        {open && <ModalManager open={open} setOpen={setOpen} initialValues={{ ...initialValues, academicYear: academicYear }} />}
      </WithPadding >
    </Box>
  )
}

export default AppsConfiguration