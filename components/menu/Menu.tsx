"use client"

import Link from "next/link"
import { useState } from "react"
import MenuItem from "./MenuItem"
import AuthItem from "./AuthItem"

export default function NavDropdown() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative drop-shadow-md">
      <div
        onClick={() => setShow(!show)}
        className="hover:cursor-pointer hover:text-primary bg-base drop-shadow-md w-full h-full rounded"
      >
        <MenuIcon
        />
      </div>
      <div className={`absolute rounded -pt-1 right-0 w-screen flex justify-end ${show ? "" : "hidden"}`}>
        <div className="w-2/3 sm:w-1/3 right-0 bg-base sm:py-2 rounded">
          <MenuLinkItem href="/" text="Home" />
          <MenuLinkItem href="/apps" text="Manage Apps" />
          <MenuLinkItem href="/files" text="Manage Files" />
          <AuthItem />
        </div>
      </div>
    </div>
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

