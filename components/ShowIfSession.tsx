"use client"

import React from "react"
import { useSession } from "@inrupt/solid-ui-react"

export default function ShowIfSession(props: {
  children: React.ReactNode,
  showIfNotSession?: boolean,
}){
  const {session, sessionRequestInProgress} = useSession()
  const isSession = session.info.isLoggedIn || sessionRequestInProgress
  console.log(session)

  if (isSession == !props.showIfNotSession) 
    return props.children 
  return null
}
