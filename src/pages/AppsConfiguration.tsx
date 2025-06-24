import React, { useState } from 'react'
import Settings from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DashboardCard, WithPadding } from 'dhis2-semis-components';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import { Switch } from '@dhis2/ui';


const AppsConfiguration = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<any>({})

  const makeAction = (path: string, title: string) => ([
    {
      label: `Configure ${path.replace("-", " ")}`,
      icon: <Settings />,
      onAction: () => navigate(`/semis/${path}?sectionType=${title.toLocaleLowerCase()}`),
    },
    {
      label: `Enable ${path.replace("-", " ")}`,
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
      </WithPadding >
    </Box>
  )
}

export default AppsConfiguration