/**
 * 
 * @param url resource url 
 * @returns postfix of url, e.g. www/.../resource.ttl => /resource.ttl
 * If resource url is a container, returns substring from 2nd rightmost '/' to end
 * E.g.: www/.../container/ => /container/
 */
export default function getUrlPostfix(url: string) {
    let startindex = url.length - 1;
    // decrement startindex until url[startindex] is a '/'
    while (startindex > 0 && url[startindex] !== '/') --startindex
    return url.substring(startindex)
}

