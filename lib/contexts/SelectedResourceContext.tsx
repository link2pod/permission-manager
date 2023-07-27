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
  console.log(selectedResourceIRI)
  return (
    <SelectedResourceContext.Provider
      value={{
        selectedResourceIRI,
        setSelectedResourceIRI: (s: string | undefined) => {
          console.log(s)
          setSelectedResourceIRI(s)
        }
      }}
    >
      {props.children}
    </SelectedResourceContext.Provider>
  )
}
