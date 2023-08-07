"use client"

import { useContext, useState } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import { Access } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import EditableTextField from "../agentcardelements/EditableTextField";
import CheckboxList from "../agentcardelements/CheckboxList";
import useResourceAcl from "@/lib/hooks/useResourceACL";
import defaultSaveAcl from "./defaultSaveAcl";
//import Ipsum from "@/test/components/Ipsum";

const accessDescription = {
  read: "Read/view data",
  append: "Add to a container",
  write: "Add, Edit, and Delete resource",
  control: "Control who can change permissions of the resource",
}

/**
 * 
 * @link ../agentcardelements/EditableTextField.tsx
 * @returns Card with agent's webId and their AccessModes as toggleable checkboxes
 */
export default function AgentAccessCard(props: {
  agentWebId: string,
  access: Access,
  isDefaultAccess?: boolean,
  disabled?: boolean,
  hideDelete?: boolean,
}) {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { data, mutate, isValidating }
    = useResourceAcl(selectedResourceIRI, { inruptConfig: { fetch: session.fetch } })

  const [agentWebId, setAgentWebId] = useState(props.agentWebId)

  const handleSubmit = async (newAccessObject: Record<string, boolean>) => {
    if (!data) return
    if (!selectedResourceIRI) return 
    if (props.disabled) return 
    const newAccess = newAccessObject as Access

    await defaultSaveAcl({
      resource: data, 
      agentWebId, 
      access: newAccess, 
      deleteAgentId: props.agentWebId,
      config: {fetch: session.fetch},
    })
    mutate()
  }

  const handleDelete = async () => {
    if (!data) return
    await defaultSaveAcl({resource: data, deleteAgentId: agentWebId, config: {fetch: session.fetch}})
    mutate()
  }

  return (
    <div className="w-full h-full">
      {/** webId title */}
      <div className="w-full flex justify-center items-center h-10 md:px-2">
        <div className="font-semibold pr-2 flex-none">AgentId: </div>
        <div className="max-h-full overflow-x-auto whitespace-nowrap">
          {props.disabled ? agentWebId : <EditableTextField
            value={agentWebId}
            onChange={setAgentWebId}
          />}
        </div>
      </div>
      <hr />
      <CheckboxList
        object={props.access}
        onSubmit={handleSubmit}
        onDelete={props.hideDelete ? undefined : handleDelete}
        descriptions={accessDescription}
        disabled={isValidating || props.disabled}
      />
    </div>
  )
}
