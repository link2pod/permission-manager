"use client"
import { getSolidDatasetWithAcl } from '@inrupt/solid-client'
import useSWR from 'swr'
import { SolidDatasetWithAcl } from '../utilities/types'
import { getDefaultSession } from '@inrupt/solid-client-authn-browser'

/**
 * Wrapper hook for useSWR that wraps a getSolidDatasetWithAcl call. 
 * Automatically uses getDefaultSession().fetch(), unless otherwise specified
 * @param datasetIRI IRI of dataset to fetch with acl. Dataset won't fetch if null
 * @param options.swrConfig config for useSWR (third parameter of useSWR). 
 * Default value is `{}` (i.e. empty object)
 * @param options.inruptConfig options for getSolidDatasetWithAcl (second parameter). 
 * By default, fetcher will use getDefaultSession()
 * (i.e. currently authenticated session's fetch function)
 * @link https://swr.vercel.app 
 * @returns equivalent to calling `useSWR(datasetIRI+".acl", () => getSolidDatasetWithAcl(datasetIRI))`
 */
export function useSolidDatasetWithAcl(datasetIRI: string | null, options?: {
    swrConfig?: Parameters<typeof useSWR<SolidDatasetWithAcl>>[2]
    inruptConfig?: Parameters<typeof getSolidDatasetWithAcl>[1]
}) {
    const swrConfig = (options && options.swrConfig) ? options.swrConfig : {}
    const inruptConfig = (options && options.inruptConfig) ? options.inruptConfig : {
        fetch: getDefaultSession().fetch,
    }
    const key = datasetIRI ? `${datasetIRI}.acl` : null
    return useSWR(
        key, () => {
            //console.log("inside withacl fetcher",key, inruptConfig)
            if (!datasetIRI) throw Error(`${key}, ${datasetIRI}`) // shouldn't be possible
            return getSolidDatasetWithAcl(datasetIRI, inruptConfig)
        },
        swrConfig)
}
