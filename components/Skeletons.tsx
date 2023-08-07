import React from "react";

/**
 * Rectangle with pulsating loading animation
 * @param props.className additional CSS classes to add (default is `animate-pulse bg-gray-100`) 
 * @returns Rectangle Loading Skeleton 
 */
export function RectangleSkeleton(props:{
  children?: React.ReactNode,
  className?: string,
}){
  return (<div className={`${props.className} animate-pulse bg-gray-100`}>{props.children}</div>)
}
