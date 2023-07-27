import getUrlPostfix from "./getUrlPostfix";

/**
 * 
 * @param url container's url 
 * @returns postfix of url
 */
export function getContainerUrlPostfix(url: string) {
    // ignore trailing '/' and call getUrlPostfix, then add '/' back
    return getUrlPostfix(url.substring(0,url.length-1)) + '/'
}

