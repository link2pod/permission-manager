"use client"

import AddAgentAccess from "./AddAgentAccess"
import { useContext } from "react"
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext"
import { useSession } from "@inrupt/solid-ui-react"
import {
  getFallbackAcl,
  getResourceAcl,
  getAgentResourceAccessAll,
  getAgentDefaultAccessAll,
  isContainer,
} from "@inrupt/solid-client"
import useResourceAcl from "@/lib/hooks/useResourceACL"
import { RectangleSkeleton } from "../../Skeletons"
import ResourceAgentList from "./ResourceAgentList"
import defaultSaveAcl from "./defaultSaveAcl"

export default function ResourcePermissionsDisplay() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { data, isLoading, mutate } = useResourceAcl(
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

  if (!fallbackACL && !resourceACL) {
    return (
      <div className="border border-error h-full w-full">
        Permissions could not be fetched. Try logging in again
      </div>
    )
  }
  console.log(data, isContainer(data))

  if (resourceACL) {
    return (
      <div>
        <SectionHeader text="Resource Permissions" />
        <ResourceAgentList
          agents={getAgentResourceAccessAll(resourceACL)}
        />
        <div className="w-full my-2" />
        <h3 className="text-center text-lg my-2">Add Resource Permissions for New Agent </h3>
        <div className="w-5/6 bg-base drop-shadow-md mx-auto py-2">
          <AddAgentAccess />
        </div>
        {isContainer(data) &&
          <div className="pt-2">
            <SectionHeader text=" Set default permissions for members of this container " />
            <ResourceAgentList
              agents={getAgentDefaultAccessAll(resourceACL)}
              isDefaultAccess
            />
            <div className="w-full my-2" />
            <h3 className="text-center text-lg my-2">Add Default Permissions for New Agent </h3>
            <div className="w-5/6 bg-base drop-shadow-md mx-auto py-2">
              <AddAgentAccess isDefaultAccess />
            </div>
          </div>
        }
      </div>
    )
  }
  if (fallbackACL) {
    return (
      <div>
        <div className="flex space-x-2 h-20 w-full items-center justify-center">
          <p>
            No resource permissions found.
          </p>
          <button onClick={() => {
            defaultSaveAcl({
              resource: data,
              config: { fetch: session.fetch },
            })
            mutate()
          }}>
            Create from fallback permissions?
          </button>
        </div>
        <hr />
        <SectionHeader text="Inherited Fallback Permissions" />
        <ResourceAgentList
          agents={getAgentDefaultAccessAll(fallbackACL)}
          disabled
        />
      </div >
    )
  }
}

function SectionHeader(props: {
  text: string,
}) {
  return (
    <div className="w-full py-2 shadow-sm shadow-primary/10 mb-2 bg-gray-100">
      <h2 className="text-xl text-center ">{props.text}</h2>
    </div>
  )
}
