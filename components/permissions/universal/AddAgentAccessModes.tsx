"use client"

import { useContext, useState } from "react";
import AgentAccessModesCard from "./AgentAccessModesCard";
import { useSession } from "@inrupt/solid-ui-react";
import useGetAgentAccessAll from "@/lib/hooks/useGetAgentAccessAll";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";

const defaultModes = {
  read: true,
  write: true,
  append: true,
  controlRead: false,
  controlWrite: false,
}

export default function AddAgentAccessModes() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { mutate } = useGetAgentAccessAll(
    selectedResourceIRI,
    { inruptConfig: { fetch: session.fetch } }
  )
  const [agentId, setAgentId] = useState("http://new.com/new/profile/card#me")
  return <AgentAccessModesCard
    agentWebId={agentId}
    accessModes={
      defaultModes
    }
    handleAgentIdChange={setAgentId}
    mutate={mutate}
  />
}

