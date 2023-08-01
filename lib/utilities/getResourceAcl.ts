import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser"
import { getUrlPrefix } from "./getUrlPrefix"
import getDirectResourceAcl from "./getDirectResourceAcl"
import { AclDataset, WithAcl, getResourceInfoWithAcl, getSolidDatasetWithAcl } from "@inrupt/solid-client"


type T = WithAcl["internal_acl"]
/**
 * Implements algorithm at https://solid.github.io/web-access-control-spec/#effective-acl-resource 
 * starting with resource = url
 * @param url url of resource to get acl for
 * @returns a object with {directAcl, fallbackAcl} 
 */
export async function getResourceAcl(url: string, config?: { fetch?: Session["fetch"] })
{
    const AclInfo = await getResourceInfoWithAcl(url, config)
    
}


