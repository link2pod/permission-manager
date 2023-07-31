"use client"

import { ReactNode, createContext, useState } from "react"

export const defaultContextValue = {
  selectedResourceIRI: undefined as string | undefined,
  setSelectedResourceIRI: (s: string | undefined) => { },
}

const SelectedResourceContext = createContext(defaultContextValue)
export default SelectedResourceContext

export function SelectedResourceContextProvider(props: {
  children: ReactNode,
}) {
  const [selectedResourceIRI, setSelectedResourceIRI] = useState(undefined as undefined | string)
  
  return (
    <SelectedResourceContext.Provider
      value={{
        selectedResourceIRI,
        setSelectedResourceIRI: (s: string | undefined) => setSelectedResourceIRI(s)
      }}
    >
      {props.children}
    </SelectedResourceContext.Provider>
  )
}
