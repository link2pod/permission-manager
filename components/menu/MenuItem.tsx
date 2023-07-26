import { ReactNode } from "react"
import { Menu } from "@headlessui/react"
import Link from "next/link"

export default function MenuItem(props: {
  children?: ReactNode,
  onClick?: () => any,
}) {
  return (
    <Menu.Item >
      {({ active }) => (
        <div
          className={`w-full p-1 rounded ${active && 'bg-primary text-white'}`}
          onClick={props.onClick}
        >
          {props.children}
        </div>
      )}
    </Menu.Item>
  )
}
