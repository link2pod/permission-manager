"use client"

import AgentAccessCard from "./AgentAccessCard";

const defaultAccess = {
  read: true,
  write: true,
  append: true,
  control: false,
}

/**
 * @returns Card to add WAC Access for a new agent
 */
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

