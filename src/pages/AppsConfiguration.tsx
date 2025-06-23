import React from 'react'
import Tabs from '../components/tabs/Tabs'
import { useUrlParams } from 'dhis2-semis-functions'

const tabs = [
  {
    id: 'student',
    label: 'Student',
    component: () => <div>Default Tab Content</div>,
  },
  {
    id: 'staff',
    label: 'Staff',
    component: () => <div>Settings Tab Content</div>,
  }
]

const AppsConfiguration = () => {
  const { useQuery } = useUrlParams()
  const sectionType = useQuery().get('sectionType')
  const activeTab = tabs.find(tab => tab.id === sectionType) || tabs[0]


  return (
    <div>
      <Tabs tabs={tabs} />
      <div style={{ marginTop: '1rem' }}>
        {activeTab.component()}
      </div>
    </div>
  )
}

export default AppsConfiguration