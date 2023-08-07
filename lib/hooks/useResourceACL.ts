"use client"
import useSWR from 'swr'
import { getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { getResourceInfoWithAcl } from "@inrupt/solid-client"

// helper typedef
type useSWRParams
    = Parameters<typeof useSWR<Awaited<ReturnType <typeof getResourceInfoWithAcl>>>>

/**
 * Wrapper for useSWR that fetches agent access permissions for a resource using getResourceInfoWithAcl. 
 * Automatically uses getDefaultSession().fetch(), unless otherwise specified
 * @param key useSWR key (first parameter of useSWR)
 * @param options.swrConfig config for useSWR (third parameter of useSWR). 
 * Default value is `{}` (i.e. empty object)
 * @param options.inruptConfig options for getSolidDataset (second parameter). 
 * By default, fetcher will use getDefaultSession()
 * (i.e. currently authenticated session's fetch function)
 * @link https://swr.vercel.app 
 * @returns provides everything from `useSWR(key, () => getResourceInfoWithAcl(key))`
 */
export default function useResourceAcl(key: string | null | undefined, options?: {
    swrConfig?: useSWRParams[2]
    inruptConfig?: Parameters<typeof getResourceInfoWithAcl>[1]
}) {
    const swrConfig = (options && options.swrConfig) ? options.swrConfig : {}
    const inruptConfig = (options && options.inruptConfig) ? options.inruptConfig : {
        fetch: getDefaultSession().fetch,
    }
    /*
    const [agentAccessAll, setAgentAccessAll] 
        = useState(undefined as undefined | Awaited<ReturnType<typeof getAgentAccessAll>>)
        */
    //console.log(options, inruptConfig)
    return useSWR(
        key ? `_aclonly${key}` : null, () => {
            return getResourceInfoWithAcl(key as string, inruptConfig)
        },
        swrConfig)
}
