"use client"

import { useContext } from "react"
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext"

export default function ResourcePermissionsDisplay() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  return (
    <div className="bg-blue-500 h-full">
      <div className="sm:p-2 w-full truncate bg-base border bg-gray-50">
        <h3>
          {selectedResourceIRI}
        </h3>
      </div>
      
    </div>
  )
}
