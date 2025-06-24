import React from 'react'
import Settings from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DashboardCard, WithPadding } from 'dhis2-semis-components';
import { dashboardData } from '../utils/constants/dashboard/dashboardData';
import DashboardLayout from '../components/dashboard/dashboardLayout';
import { Switch } from '@dhis2/ui';


const AppsConfiguration = () => {
  const navigate = useNavigate();

  const makeAction = (path: string, title: string) => ([
    {
      label: `Enable ${path.replace("-", " ")}`,
      icon: <Switch
        checked
        name="exampleName"
        onChange={function zA() { }}
        value="checked"
      />
    },
    {
      label: `Configure ${path.replace("-", " ")}`,
      icon: <Settings />,
      onAction: () => navigate(`/semis/${path}?sectionType=${title.toLocaleLowerCase()}`),
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