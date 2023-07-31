"use client"

import { useContext } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import useGetAgentAccessAll from "@/lib/hooks/useGetAgentAccessAll";
import { useSession } from "@inrupt/solid-ui-react"
import { RectangleSkeleton } from "../../Skeletons";
import AgentAccessCard from "./AgentAccessModesCard";

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
      <div className="w-fit h-fit bg-base drop-shadow-md py-2">
        <AgentAccessCard
          agentWebId={agentWebId}
          accessModes={accessModes}
          key={`_aac${agentWebId}`}
          disabled={isValidating}
        />
      </div>
    )
  }
  return null
}
