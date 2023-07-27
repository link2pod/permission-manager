import React from "react";

export function RectangleSkeleton(props:{
  children?: React.ReactNode,
  className?: string,
}){
  return (<div className={`${props.className} animate-pulse bg-gray-100`}>{props.children}</div>)
}
