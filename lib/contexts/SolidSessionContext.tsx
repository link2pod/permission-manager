"use client"

import { ReactNode } from "react"
import { SessionProvider } from "@inrupt/solid-ui-react"

export default function SolidSessionContextProvider(props: {
  children: ReactNode,
}){
  return (
    <SessionProvider 
      restorePreviousSession={true}
    >{props.children}</SessionProvider>
  )
}
