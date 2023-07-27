import { getUrlPrefix } from "./getUrlPrefix"

/**
 * Fetches rootContainer of the resource at url, according to the solid specification
 * Purpose is to find the rootStorage for a webID without pim:storage predicate in its profile 
 * @param url 
 * @returns 
 */
export async function getRootContainer(url: string) {
    var currUrl = url.concat("/")
    var rootContainerUrl = undefined as undefined | string
    while (currUrl.length > 0 && !rootContainerUrl) {
        // Do http request to resource, and fetch the "link rel-type" from the response headers
        try {
            const res = await fetch(currUrl, {
                method: "HEAD",
            })
            const headers = res.headers

            // Check if a key contains a "link pim:storage; rel=type"
            headers.forEach((value, key) => {
                if (key === "link") {
                    value.split(",").forEach((v) => {
                        const [url, rel] = v.split(";")
                        if (rel.trim() === `rel="type"` && url.trim() === "<http://www.w3.org/ns/pim/space#Storage>") {
                            rootContainerUrl = currUrl
                            return
                        }
                    })
                }
            })
        } catch (e) {
            // swallow errors since it's likely unauthenticated or other error could arise
        }
        // Get parent container url
        currUrl = getUrlPrefix(currUrl)
    }
    if (!rootContainerUrl) {
        throw new Error("Couldn't find root container")
    }
    return rootContainerUrl
}
