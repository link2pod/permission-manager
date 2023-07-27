/**
 * 
 * @param url container's url 
 * @returns postfix of url, i.e. substring from rightmost '/' to end of url 
 */
export default function getUrlPostfix(url: string) {
    let startindex = url.length - 1;
    // decrement startindex until url[startindex] is a '/'
    while (startindex > 0 && url[startindex] !== '/') --startindex
    return url.substring(startindex)
}

