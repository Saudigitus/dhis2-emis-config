/* eslint-disable */
import React, { useState, useEffect } from 'react'

import AppList from '../../datastore/apps.json'
import ValuesList from '../../datastore/values.json'
import ConfigsList from '../../datastore/config.json'

import { useDataMutation, useDataQuery } from "@dhis2/app-runtime"

const appsQuery = {
    apps: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`
    }
}

const configQuery = {
    configs: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`
    }
}

const valuesQuery = {
    values: {
        resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`
    }
}

const appsMutation: any = {
    type: 'create',
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_APP_NAME}`,
    data: ({ data }: any) => data
}

const configMutation: any = {
    type: 'create',
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_CONFIG_KEY}`,
    data: ({ data }: any) => data
}

const valueMutation: any = {
    type: 'create',
    resource: `dataStore/${process.env.REACT_APP_DATA_STORE_NAME}/${process.env.REACT_APP_DATA_STORE_SEMIS_VALUES_KEY}`,
    data: ({ data }: any) => data
}

export default function getInitDataStore() {
    const [appsMutate] = useDataMutation(appsMutation)
    const [configsMutate] = useDataMutation(configMutation)
    const [valuesMutate] = useDataMutation(valueMutation)

    const [isAppsInitialized, setIsAppsInitialized] = useState(false)
    const [isConfigsInitialized, setIsConfigsInitialized] = useState(false)
    const [isValuesInitialized, setIsValuesInitialized] = useState(false)

    const { data: appsData } = useDataQuery(appsQuery, {
        onComplete: () => setIsAppsInitialized(true),
        onError: async (err: any) => {
            try {
                await appsMutate({ data: AppList })
                setIsAppsInitialized(true)
            } catch (err) { }
        }
    })

    useDataQuery(configQuery, {
        onComplete: () => setIsConfigsInitialized(true),
        onError: async (err: any) => {
            try {
                await configsMutate({ data: ConfigsList })
                setIsConfigsInitialized(true)
            } catch (err) { }
        }
    })

    useDataQuery(valuesQuery, {
        onComplete: () => setIsValuesInitialized(true),
        onError: async (err: any) => {
            try {
                await valuesMutate({ data: ValuesList })
                setIsValuesInitialized(true)
            } catch (err) { }
        }
    })

    return { isInitialized: isAppsInitialized && isConfigsInitialized && isValuesInitialized ? true : false }

}