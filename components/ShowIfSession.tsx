"use client"

import React from "react"
import { useSession } from "@inrupt/solid-ui-react"

/**
 * Client-side wrapper component that uses `useSession` 
 * and renders children if session is logged in. 
 * To render if session is not logged in, set `props.showIfNotSession` to `true`
 * @param props.children React Children to conditionally render 
 * @param props.showIfNotSession default `false`. 
 * If `true`, then render children if session not loggedIn.
 * If `false` or `undefined`, render children if loggedIn. 
 * @returns null if `children` aren't to be shown, `children` otherwise
 */
export default function ShowIfSession(props: {
  children: React.ReactNode,
  showIfNotSession?: boolean,
}){
  const {session, sessionRequestInProgress} = useSession()
  const isSession = session.info.isLoggedIn || sessionRequestInProgress

  if (isSession == !props.showIfNotSession) 
    return props.children 
  return null
}
