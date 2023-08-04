"use client"
import useSWR from 'swr'
import { getProfileAll } from '@inrupt/solid-client'

// helper typedef
type useSWRParams
    = Parameters<typeof useSWR<Awaited<ReturnType <typeof getProfileAll>>>>

/**
 * Wrapper for useSWR that fetches a solid profile using getProfileAll. 
 * @param key useSWR key (first parameter of useSWR)
 * @param options.swrConfig config for useSWR (third parameter of useSWR). 
 * Default value is `{}` (i.e. empty object)
 * @param options.inruptConfig options for getSolidDataset (second parameter). 
 * @link https://swr.vercel.app 
 * @returns provides everything from `useSWR(key, () => getProfileAll(key))`
 */
export default function useGetProfileAll(key: string | null | undefined, options?: {
    swrConfig?: useSWRParams[2]
    inruptConfig?: Parameters<typeof getProfileAll>[1]
}) {
    const swrConfig = (options && options.swrConfig) ? options.swrConfig : {}
    const inruptConfig = options?.inruptConfig
    
    return useSWR(
        key, async (key) => {
            const agentAccessAll = await getProfileAll(key, inruptConfig)
            return agentAccessAll
        },
        swrConfig)
}
