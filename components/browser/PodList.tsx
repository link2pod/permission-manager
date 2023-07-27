"use client"

import { getRootContainer } from "@/lib/utilities/getRootContainer"
import { getPodUrlAllFrom, getProfileAll } from "@inrupt/solid-client"
import { useSession } from "@inrupt/solid-ui-react"
import useSWR from 'swr'
import ResourceItem from "./BrowserItem"

export default function PodList() {
  const { session } = useSession()

  const webId = session.info.webId

  // Fetch profileAll of webId
  const { data: profileAll, isLoading, error }
    = useSWR(webId, (webId) => {
      return getProfileAll(webId, { fetch: session.fetch }
      )
    }, {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    })

  //  If rootStorages is empty array, then get rootStorage manually
  const { data: rootPod } = useSWR(
    webId ? 'rootStorage' : null,
    (_) => webId ? getRootContainer(webId) : undefined,
    { revalidateIfStale: false, revalidateOnFocus: false }
  )

  if (!webId) return <>WebId not found. Try refreshing the page <Ipsum /></>
  // get the rootStorages from the profileAll (null if profileAll is null) 
  const listedPods = profileAll ? getPodUrlAllFrom(profileAll, webId) : null

  // Array of podIRIs to be displayed
  const podsToDisplay = [
    ... (rootPod ? [rootPod] : []),
    ...(listedPods ? listedPods : []),
  ]

  console.log(podsToDisplay, rootPod, listedPods)

  return (
    <div className="w-full" >
      {podsToDisplay.map((podIRI) =>
        <ResourceItem 
          resourceIRI={podIRI} 
          depth={0} 
          isContainer={true}
        />
      )}
    </div>
  )
}




