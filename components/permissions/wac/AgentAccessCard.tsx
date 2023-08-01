"use client"

import { useContext } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import { 
  Access, 
  hasFallbackAcl, 
  hasResourceAcl, 
  hasAccessibleAcl,  
  createAclFromFallbackAcl, 
  getResourceAcl, 
  setAgentResourceAccess,
  saveAclFor,
} from "@inrupt/solid-client";
import { setAgentAccess } from "@inrupt/solid-client/universal";
import { useSession } from "@inrupt/solid-ui-react";
import EditableTextField from "../agentcardelements/EditableTextField";
import CheckboxList from "../agentcardelements/CheckboxList";
import useResourceAcl from "@/lib/hooks/useResourceACL";
//import Ipsum from "@/test/components/Ipsum";

const accessDescription = {
  read: "Read/view data",
  append: "Add to a container",
  write: "Add, Edit, and Delete resource",
  control: "Control who can change permissions of the resource",
}

export default function AgentAccessCard(props: {
  agentWebId: string,
  access: Access,
  mutate?: (..._: any[]) => any,
  disabled?: boolean,
  handleAgentIdChange?: (newname: string) => any,
}) {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  const { session } = useSession()
  const { data, mutate }
    = useResourceAcl(selectedResourceIRI, { inruptConfig: { fetch: session.fetch } })

  const handleSubmit = async (newAccessObject: Record<string, boolean>) => {
    if (!data) return
    if (!selectedResourceIRI) { return }
    const newAccess = newAccessObject as Access
    
    let resourceAcl;
    if (!hasResourceAcl(data)) {
      if (!hasAccessibleAcl(data)) {
        throw new Error(
          "The current user does not have permission to change access rights to this Resource."
        );
      }
      if (!hasFallbackAcl(data)) {
        throw new Error(
          "The current user does not have permission to see who currently has access to this Resource."
        );
      }
      resourceAcl = createAclFromFallbackAcl(data);
    } else {
      resourceAcl = getResourceAcl(data);
    }

    const updatedAcl = setAgentResourceAccess(
      resourceAcl,
      props.agentWebId, 
      newAccess
    );

    // Now save the ACL:
    const savedAccess = await saveAclFor(data, updatedAcl);
    if (!savedAccess) {
      throw Error("Unable to save")
    }
    if (JSON.stringify(savedAccess) !== JSON.stringify(newAccess)) {
      console.log(savedAccess, newAccess)
      throw Error("Saved Data differ's from intended")
    }
    mutate()
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
        object={props.access}
        onSubmit={handleSubmit}
        descriptions={accessDescription}
        disabled={props.disabled}
      />
    </div>
  )
}
