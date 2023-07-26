import { ReactNode } from "react"

export default function MenuItem(props: {
  children?: ReactNode,
  onClick?: () => any,
}) {
  return (
    <div 
      className="p-1 sm:p-2 w-full hover:bg-gray-100 hover:text-primary hover:cursor-pointer" 
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
