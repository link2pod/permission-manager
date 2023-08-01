"use client"

import { Access } from "@inrupt/solid-client"
import AgentAccessCard from "./AgentAccessCard";

export default function ResourceAgentList(props: {
  agents: Record<string, Access>,
  isDefaultAccess?: boolean,
  disabled?: boolean,
}) {

  return (
    <div className="bg-base space-y-2 flex flex-wrap justify-center items-center">
      {
        Object.entries(props.agents).map(([agentWebId, access]) =>
          <div className="w-fit h-fit bg-base drop-shadow-md py-2">
            <AgentAccessCard
              agentWebId={agentWebId}
              access={access}
              key={`_aac${agentWebId}`}
              isDefaultAccess={props.isDefaultAccess}
              disabled={props.disabled}
            />
          </div>)
      }
    </div>
  )
}
