"use client"
import { getSolidDataset } from '@inrupt/solid-client'
import useSWR from 'swr'
import { getDefaultSession } from '@inrupt/solid-client-authn-browser'

// helper typedef
type useSWRGetDatasetParams
    = Parameters<typeof useSWR<Awaited<ReturnType<typeof getSolidDataset>>>>

/**
 * Wrapper hook for useSWR that wraps a getSolidDataset call. 
 * Automatically uses getDefaultSession().fetch(), unless otherwise specified
 * @param key useSWR key (first parameter of useSWR)
 * @param options.swrConfig config for useSWR (third parameter of useSWR). 
 * Default value is `{}` (i.e. empty object)
 * @param options.inruptConfig options for getSolidDataset (second parameter). 
 * By default, fetcher will use getDefaultSession()
 * (i.e. currently authenticated session's fetch function)
 * @link https://swr.vercel.app 
 * @returns equivalent to calling `useSWR(key, () => getSolidDataset(key))`
 */
export default function useSolidDataset(key: string | null, options?: {
    swrConfig?: useSWRGetDatasetParams[2]
    inruptConfig?: Parameters<typeof getSolidDataset>[1]
}) {
    const swrConfig = (options && options.swrConfig) ? options.swrConfig : {}
    const inruptConfig = (options && options.inruptConfig) ? options.inruptConfig : {
        fetch: getDefaultSession().fetch,
    }
    //console.log(options, inruptConfig)
    return useSWR(
        key, (key) => {
            //console.log("inside fetcher",key, inruptConfig)
            return getSolidDataset(key, inruptConfig)
        },
        swrConfig)
}
