import { Switch } from '@dhis2/ui';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Settings from '@mui/icons-material/Settings';
import { useUrlParams } from 'dhis2-semis-functions';
import { DashboardCard, WithPadding } from 'dhis2-semis-components';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import ModalManager from '../components/saveConfiguration/ModalManager';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';
import { useNavigate } from 'react-router-dom';


const AppsConfiguration = () => {
  const { add } = useUrlParams();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState<any>({})
  const navigate = useNavigate()

  const handleConfiguration = (path: string, title: string) => {
    add("module", path)
    add("section", title)
    setOpen(true)
  }

  const makeAction = (path: string, title: string) => ([
    {
      label: `Configure ${path.replace("-", " ")}`,
      icon: <Settings />,
      onAction: () => navigate(`/semis/configuration/${path}?sectionType=${title.toLocaleLowerCase()}`),
    },
    {
      label: `${visible[`${title}-${path}`] ? "Disable" : "Enable"} ${path.replace("-", " ")}`,
      icon: <Switch
        className="custom-switch-config"
        name={`${title}-${path}`}
        checked={visible[`${title}-${path}`] || false}
        onChange={(e: any) => setVisible((prevState: any) => ({ ...prevState, [`${title}-${path}`]: e?.checked }))}
        value="checked"
      />
    }
  ]);

  return (
    <Box height={"93vh"}>
      <WithPadding p="2rem">
        {
          dashboardData?.map(({ title, cards }) => {
            return (
              <DashboardLayout title={title} >
                {
                  cards.map(({ label, icon, path }) => (
                    <DashboardCard
                      key={label}
                      icon={icon}
                      contents={[{ label }]}
                      actions={[...makeAction(path, title)]}
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