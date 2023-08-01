"use client"

import ResourceAgentList from "./ResourceAgentList"
import AddAgentAccessModes from "./AddAgentAccessModes"
import { useContext } from "react"
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext"

export default function ResourcePermissionsDisplay() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  return (
    <div>
      <div className="bg-base space-y-2 flex flex-wrap justify-center items-center lg:h-full">
        <ResourceAgentList />
      </div>
      <div className={`${selectedResourceIRI ? "" : "hidden"} bg-gray-100`}>
        <hr className="my-2" />
        <h2 className="text-xl text-center my-2">Add permissions for new agent</h2>
        <div className="w-5/6 bg-base drop-shadow-md mx-auto py-2">
          <AddAgentAccessModes />
        </div>
      </div>
    </div>
  )
}
