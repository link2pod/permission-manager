"use client"

import AddAgentAccess from "./AddAgentAccess"
import { useContext } from "react"
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext"
import { useSession } from "@inrupt/solid-ui-react"
import { getFallbackAcl, getResourceAcl, getAgentResourceAccessAll, getAgentDefaultAccessAll} from "@inrupt/solid-client"
import useResourceAcl from "@/lib/hooks/useResourceACL"
import { RectangleSkeleton } from "../../Skeletons"
import ResourceAgentList from "./ResourceAgentList"

export default function ResourcePermissionsDisplay() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { data, isLoading, mutate, isValidating } = useResourceAcl(
    selectedResourceIRI,
    { inruptConfig: { fetch: session.fetch } }
  )

  if (isLoading) {
    return <RectangleSkeleton className="w-full h-full">
      fetching agent accesses
    </RectangleSkeleton>
  }
  if (!data) return null
  const fallbackACL = getFallbackAcl(data)
  const resourceACL = getResourceAcl(data)
  console.log(resourceACL, fallbackACL)

  if (!fallbackACL && !resourceACL) {
    return (
      <div className="border border-error h-full w-full">
        Permissions could not be fetched. Try logging in again
      </div>
    )
  }

  if (resourceACL) {
    return (
      <div>
        <ResourceAgentList
          agents={getAgentResourceAccessAll(resourceACL)}
        />
        <hr className="my-2" />
        <h2 className="text-xl text-center my-2">Add permissions for new agent</h2>
        <div className="w-5/6 bg-base drop-shadow-md mx-auto py-2">
          <AddAgentAccess />
        </div>
        <button>
          Reset to Fallback Acl
        </button>
      </div>
    )
  }
  if (fallbackACL) {
    return (
      <div>
        <div>
          No resource permissions found. Create from fallback permissions?
          <div className="w-5/6 bg-base drop-shadow-md mx-auto py-2">
            <AddAgentAccess />
          </div>
        </div>
        <hr />
        <h3>Fallback Permissions</h3>
        <ResourceAgentList
          agents={getAgentDefaultAccessAll(fallbackACL)}
        />
      </div>
    )
  }
}
