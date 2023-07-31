import { Session, getDefaultSession } from "@inrupt/solid-client-authn-browser"
import { getUrlPrefix } from "./getUrlPrefix"
import getDirectResourceAcl from "./getDirectResourceAcl"
import { AclDataset, WithAcl, getSolidDatasetWithAcl } from "@inrupt/solid-client"


type T = WithAcl["internal_acl"]
/**
 * Implements algorithm at https://solid.github.io/web-access-control-spec/#effective-acl-resource 
 * starting with resource = url
 * @param url url of resource to get acl for
 * @returns a object with {directAcl, fallbackAcl} 
 */
export async function getResourceAcl(url: string, config?: { fetch?: Session["fetch"] }): 
Promise<{directAcl: null, fallbackAcl: AclDataset} | {directAcl: AclDataset, fallbackAcl: }> 
{
    const directAcl = await getDirectResourceAcl(url, config)
    if (directAcl) {
        return { directAcl, fallbackAcl: null }
    }
    // Get parent container url
    const res = getResourceAcl(getUrlPrefix(url), config)
    if (res.directAcl) return {directAcl: null, fallbackAcl: res.directAcl}
    return res
}


