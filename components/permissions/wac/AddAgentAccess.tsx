"use client"

import AgentAccessCard from "./AgentAccessCard";
import { defaultAccess } from "./accessObjects";

export default function AddAgentAccess(props: {
  isDefaultAccess?: boolean,
}) {
  return <AgentAccessCard
    agentWebId="http://domain/new/profile/card#me"
    access={
      defaultAccess
    }
    hideDelete
    isDefaultAccess={props.isDefaultAccess}
  />
}

