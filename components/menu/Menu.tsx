"use client"

import Link from "next/link"
import { useState } from "react"
import MenuItem from "./MenuItem"
import AuthItem from "./AuthItem"
import { Menu } from "@headlessui/react"

export default function NavDropdown() {
  return (
    <Menu>
      <div className="relative drop-shadow-md">
        <Menu.Button as='div' className="">
          <div
            className="hover:cursor-pointer hover:text-primary bg-base drop-shadow-md w-full h-full rounded"
          >
            <MenuIcon />
          </div>
        </Menu.Button>
        <div className="absolute rounded right-0 w-screen flex justify-end">
          <Menu.Items as="div" className="border-0 bg-base w-2/3 sm:w-1/3 right-0 sm:py-2 rounded focus:outline-none">
            <MenuLinkItem text="Manage Apps" href="/apps" />
            <MenuLinkItem text="Manage Files" href="/files" />
            <MenuLinkItem text="Home" href="/" />
          </Menu.Items>
        </div>
      </div>
    </Menu>
  )
}

function MenuLinkItem(props: {
  text: string,
  href: string,
}) {
  return (
    <Link href={props.href}>
      <MenuItem>
        {props.text}
      </MenuItem>
    </Link>
  )
}

function MenuIcon(props: {
  className?: string,
}) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  )
}

