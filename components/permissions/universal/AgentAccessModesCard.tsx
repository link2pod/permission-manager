"use client"

import { useContext } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import { AccessModes } from "@inrupt/solid-client";
import { setAgentAccess } from "@inrupt/solid-client/universal";
import { useSession } from "@inrupt/solid-ui-react";
import EditableTextField from "../agentcardelements/EditableTextField";
import CheckboxList from "../agentcardelements/CheckboxList";
import useGetAgentAccessAll from "@/lib/hooks/useGetAgentAccessAll";
//import Ipsum from "@/test/components/Ipsum";

const accessDescription = {
  read: "Read/view data",
  append: "Add to a container",
  write: "Add, Edit, and Delete resource",
  controlRead: "Control who can change permissions of the resource",
  controlWrite: "Control who can change permissions of the resource",
}

export default function AgentAccessModesCard(props: {
  agentWebId: string,
  accessModes: AccessModes,
  mutate?: (..._:any[]) => any,
  disabled?: boolean, 
  handleAgentIdChange?: (newname:string) => any, 
}) {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()

  const handleSubmit = async (newAccessModesObject: Record<string, boolean>) => {
    if (!selectedResourceIRI) { return }
    const newAccessModes = newAccessModesObject as AccessModes
    const savedAccessModes = await setAgentAccess(
      selectedResourceIRI, props.agentWebId, newAccessModes,
      { fetch: session.fetch }
    )
    if (!savedAccessModes) {
      throw Error("Unable to save")
    }
    if (JSON.stringify(savedAccessModes) !== JSON.stringify(newAccessModes)) {
      console.log(savedAccessModes, newAccessModes)
      throw Error("Saved Data differ's from intended")
    }
    if (props.mutate) props.mutate()
  }

  return (
    <div className="w-full h-full">
      {/** webId title */}
      <div className="w-full flex justify-center items-center h-10">
        <div className="font-semibold pr-2 flex-none">AgentId: </div>
        <div className="max-h-full overflow-x-auto whitespace-nowrap">
          {
            props.handleAgentIdChange
              ? <EditableTextField
                value={props.agentWebId}
                onChange={props.handleAgentIdChange}
              />
              : props.agentWebId
          }
        </div>
      </div>
      <hr />
      <CheckboxList
        object={props.accessModes}
        onSubmit={handleSubmit}
        descriptions={accessDescription}
        disabled={props.disabled}
      />
    </div>
  )
}
