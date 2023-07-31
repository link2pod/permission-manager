import { Session } from "@inrupt/solid-client-authn-browser"
import { getUrlPrefix } from "./getUrlPrefix"

/**
 * Retrieves acl resource as advertized by the link, for=acl in HEAD request to given url.
 * Reference https://solid.github.io/web-access-control-spec/#acl-resource-discovery 
 * @param url url of resource to get acl for
 * @returns direct-acl  or undefined if not found
 */
export default async function getDefaultResourceAcl(url: string, config?: { fetch?: Session["fetch"] }) {
    const authfetch = config?.fetch ? config.fetch : fetch
    var currUrl = url
    const res = await authfetch(currUrl, {
        method: "HEAD",
    })
    const headers = res.headers

    const links = headers.get("link")
    console.log(links)
    // Check if a key contains a "link pim:storage; rel=type"
    const aclIRI = links?.split(',').find((s:any) => {
        console.log(s)
        return false
        /*
        if (key === "link") {
            value.split(",").forEach((v) => {
                const [url, rel] = v.split(";")
                if (rel.trim() === `rel="type"` && url.trim() === "<http://www.w3.org/ns/pim/space#Storage>") {
                    return
                }
            })
        }
        */
    })
    if (!aclIRI) return undefined
    return authfetch(aclIRI)
}

