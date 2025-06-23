import React from 'react'
import { TabBar, Tab } from '@dhis2/ui'
import { useUrlParams } from 'dhis2-semis-functions'


const Tabs = ({ tabs }: { tabs: any[] }) => {
  const { useQuery, add } = useUrlParams()
  const sectionType = useQuery().get('sectionType')

  return (
    <TabBar>
      {
        tabs.map((tab) => (
          <Tab
            selected={sectionType == tab.id}
            key={tab.id}
            onClick={() => {
              add("sectionType", tab.id)
            }}
          >
            {tab.label}
          </Tab>
        ))
      }
    </TabBar>
  )
}

export default Tabs