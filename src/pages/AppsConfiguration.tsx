import { Switch } from '@dhis2/ui';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import styles from "./pages.module.css"
import Settings from '@mui/icons-material/Settings';
import { useUrlParams } from 'dhis2-semis-functions';
import { DashboardCard, WithPadding } from 'dhis2-semis-components';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import ModalManager from '../components/saveConfiguration/ModalManager';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';


const AppsConfiguration = () => {
  const { add } = useUrlParams();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<any>({})

  const handleConfiguration = ({ key, section, label }: { key: string, section: string, label: string }) => {
    add("name", label)
    add("module", key)
    add("section", section.toLocaleLowerCase())
    setOpen(true)
  }

  const makeAction = ({ key, section, label }: { key: string, section: string, label: string }) => ([
    {
      label: `Configure ${label.replace("-", " ")}`,
      icon: <Settings />,
      onAction: () => {
        handleConfiguration({ key, section, label })
      },
    },
    {
      label: `${visible[`${section}-${label}`] ? "Disable" : "Enable"} ${label.replace("-", " ")}`,
      icon: <Switch
        className="custom-switch-config"
        name={`${section}-${label}`}
        checked={visible[`${section}-${label}`] || false}
        onChange={(e: any) => setVisible((prevState: any) => ({ ...prevState, [`${section}-${label}`]: e?.checked }))}
        value="checked"
      />
    }
  ]);

  return (
    <Box height={"93vh"} style={{overflowY: "scroll"}}>
      <WithPadding p="2rem">
        {
          dashboardData?.map(({ title: section, cards }) => {
            return (
              <DashboardLayout title={section} >
                {
                  cards.map(({ key, label, icon }) => (
                    <DashboardCard
                      key={label}
                      icon={icon}
                      contents={[{ label }]}
                      actions={[...makeAction({ key, section, label })]}
                    />
                  ))
                }
              </DashboardLayout>
            )
          })
        }

        {open && <ModalManager open={open} setOpen={setOpen} />}
      </WithPadding >
    </Box>
  )
}

export default AppsConfiguration