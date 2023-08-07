"use client"

import { useContext } from "react"
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext"

/**
 * Display's IRI of currently selected resource as set in nearest `SelectedResourceContext.Provider`
 * @link /lib/contexts/SelectedResourceContext.ts
*/
export default function SelectedResourceIRI() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  return (
    <div className="sm:p-2 w-full h-full truncate border bg-gray-50">
      <h3>
        {selectedResourceIRI ? selectedResourceIRI : "No resource selected"}
      </h3>
    </div>
  )
}
