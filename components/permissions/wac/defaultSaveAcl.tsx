"use client"

import {
  Access,
  hasFallbackAcl,
  hasResourceAcl,
  hasAccessibleAcl,
  createAclFromFallbackAcl,
  getResourceAcl,
  setAgentResourceAccess,
  setAgentDefaultAccess,
  saveAclFor,
  AclDataset,
  getResourceInfoWithAcl, 
  removeThing,
  getThingAll,
  getIri,
} from "@inrupt/solid-client";
import { ACL } from "@inrupt/vocab-solid";


export default async function defaultSaveAcl(args: {
  resource: Awaited<ReturnType<typeof getResourceInfoWithAcl>>,
  config?: Parameters<typeof saveAclFor>[2],
  deleteAgentId?: string,
} | {
  resource: Awaited<ReturnType<typeof getResourceInfoWithAcl>>,
  agentWebId: string,
  access: Access,
  isDefaultAccess?: boolean,
  config?: Parameters<typeof saveAclFor>[2],
  deleteAgentId?: string,
}) {
  const resource = args.resource
  if (!resource) return

  let resourceAcl: AclDataset;
  if (!hasResourceAcl(resource)) {
    if (!hasAccessibleAcl(resource)) {
      throw new Error(
        "The current user does not have permission to change access rights to this Resource."
      );
    }
    if (!hasFallbackAcl(resource)) {
      throw new Error(
        "The current user does not have permission to see who currently has access to this Resource."
      );
    }
    resourceAcl = createAclFromFallbackAcl(resource);
  } else {
    resourceAcl = getResourceAcl(resource);
  }

  if (args.deleteAgentId){
    const agentThing = getThingAll(resourceAcl).find((thing) => getIri(thing, ACL.agent) === args.deleteAgentId )
    console.log(agentThing)
    if (agentThing)
      resourceAcl = removeThing(resourceAcl, agentThing)
  }

  if ('agentWebId' in args) {
    const agentWebId = args.agentWebId
    const setFn = args.isDefaultAccess ? setAgentDefaultAccess : setAgentResourceAccess
    resourceAcl = setFn(
      resourceAcl,
      agentWebId,
      args.access,
    );
  }

  // Now save the ACL:
  const savedAccessAcl = await saveAclFor(resource, resourceAcl, args.config);
  if (!savedAccessAcl) {
    throw new Error("Unable to save")
  }
  /*
  const savedAccess = getAgentResourceAccess(savedAccessAcl, agentWebId)
  if (JSON.stringify(savedAccess) !== JSON.stringify(newAccess)) {
    console.log(savedAccess, newAccess)
    throw Error("Saved resource differ's from intended")
  }
  */
 return savedAccessAcl
}
