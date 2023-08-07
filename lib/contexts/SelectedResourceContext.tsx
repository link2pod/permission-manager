"use client"

import { ReactNode, createContext, useState } from "react"

/**
 * selectedResourceIRI: iri selected by file-browser component
 */
export const defaultContextValue = {
  selectedResourceIRI: undefined as string | undefined,
  setSelectedResourceIRI: (s: string | undefined) => { },
}

/**
 * Contains selectedResourceIRI, and it's setter function. 
 * Primarily used to synchronize selectedResource between file browser and permission display
 */
const SelectedResourceContext = createContext(defaultContextValue)
export default SelectedResourceContext

/**
 * wraps SelectedResourceContext.Provider in Client-side component 
 * for use in NextJS component tree
 * @param props React Children
 * @returns SelectedResourceContext.Provider component
 */
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
