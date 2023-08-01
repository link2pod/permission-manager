"use client"

import { useContext, useState } from "react";
import { useSession } from "@inrupt/solid-ui-react";
import useGetAgentAccessAll from "@/lib/hooks/useGetAgentAccessAll";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import AgentAccessCard from "./AgentAccessCard";

const defaultAccess = {
  read: true,
  write: true,
  append: true,
  control: false,
}

export default function AddAgentAccess() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { mutate } = useGetAgentAccessAll(
    selectedResourceIRI,
    { inruptConfig: { fetch: session.fetch } }
  )
  const [agentId, setAgentId] = useState("http://new.com/new/profile/card#me")
  return <AgentAccessCard
    agentWebId={agentId}
    access={
      defaultAccess
    }
    handleAgentIdChange={setAgentId}
    mutate={mutate}
  />
}

