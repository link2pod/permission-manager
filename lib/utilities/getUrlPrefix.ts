/**
 * 
 * @param url url of resource or container
 * @returns container of a resource. If url represents container, returns parent container
 */
export function getUrlPrefix(url: string){
    return url.substring(0, url.substring(0, url.length - 1).lastIndexOf("/") + 1)
}
