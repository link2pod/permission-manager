"use client"

import { useContext } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import useGetAgentAccessAll from "@/lib/hooks/useGetAgentAccessAll";
import { useSession } from "@inrupt/solid-ui-react"
import { RectangleSkeleton } from "../../Skeletons";
import AgentAccessCard from "./AgentAccessModesCard";

/**
 * Reads from `SelectedResourceContext`
 * @returns Agent accessModes for the currenlty selected resource 
 * rendered as a list of `AgentAccessModesCard` components
 */
export default function ResourceAgentList() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { data, isLoading, isValidating } = useGetAgentAccessAll(
    selectedResourceIRI,
    { inruptConfig: { fetch: session.fetch } }
  )

  if (isLoading) {
    return <RectangleSkeleton className="w-full h-20">
      fetching agent accesses
    </RectangleSkeleton>
  }
  if (data) {
    return Object.entries(data).map(([agentWebId, accessModes]) =>
      <div
        className="w-fit h-fit bg-base drop-shadow-md py-2"
        key={`_aac${agentWebId}`}
      >
        <AgentAccessCard
          agentWebId={agentWebId}
          accessModes={accessModes}
          disabled={isValidating}
        />
      </div>
    )
  }
  return null
}
