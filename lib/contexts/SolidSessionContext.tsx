"use client"

import { ReactNode } from "react"
import { SessionProvider } from "@inrupt/solid-ui-react"

/**
 * @inrupt/solid-ui-react/SessionProvider must be client-side component
 * @param props React Children
 * @returns SessionProvider from `inrupt/solid-ui-react`
 * @link https://solid-ui-react.docs.inrupt.com/?path=/docs/authentication-session-provider--provider-with-hook
 */
export default function SolidSessionContextProvider(props: {
  children: ReactNode,
}){
  return (
    <SessionProvider 
      restorePreviousSession={true}
    >{props.children}</SessionProvider>
  )
}
