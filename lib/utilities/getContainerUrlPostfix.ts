/**
 * 
 * @param url container's url 
 * @returns postfix of url
 */
export function getContainerUrlPostfix(url: string) {
    // cut trailing '/'
    let startindex = url.length - 1;
    // decrement startindex until url[startindex] is a '/'
    while (startindex > 0 && url[startindex] !== '/') --startindex
    return url.substring(startindex)
}

