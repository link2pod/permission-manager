"use client"

import { Access } from "@inrupt/solid-client"
import AgentAccessCard from "./AgentAccessCard";

/**
 * render list of agents and their accesses as `AgnentAccessCard`s that can be edited
 * @param props.agents record of webId keys and their corresponding Access objects
 * @returns 
 */
export default function ResourceAgentList(props: {
  agents: Record<string, Access>,
  isDefaultAccess?: boolean,
  disabled?: boolean,
}) {
  const agents = Object.entries(props.agents).sort(([aid], [bid]) => {
    return aid.localeCompare(bid)
  })

  return (
    <div className="flex flex-wrap justify-center items-center">
      {
        agents.map(([agentWebId, access]) =>
          <div
            className="w-fit h-fit bg-base drop-shadow-md py-2 my-2 mx-2"
            key={`_aac${agentWebId}`}
          >
            <AgentAccessCard
              agentWebId={agentWebId}
              access={access}
              isDefaultAccess={props.isDefaultAccess}
              disabled={props.disabled}
            />
          </div>)
      }
    </div>
  )
}
