import { ReactNode } from "react"
import { Menu } from "@headlessui/react"

/**
 * Default styling for an item in the nav/menu dropdown 
 */
export default function MenuItem(props: {
  children?: ReactNode,
  onClick?: () => any,
}) {
  return (
    <Menu.Item >
      {({ active }) => (
        <div
          className={`w-full p-1 rounded ${active && 'bg-primary text-white'} hover:cursor-pointer`}
          onClick={props.onClick}
        >
          {props.children}
        </div>
      )}
    </Menu.Item>
  )
}
