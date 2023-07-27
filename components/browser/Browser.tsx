"use client"

import { useSession } from "@inrupt/solid-ui-react"
import PodList from "./PodList"
import { RectangleSkeleton } from "../Skeletons"
import Ipsum from "@/test/components/Ipsum"

export default function Browser() {
  const { session, sessionRequestInProgress } = useSession()

  const webId = session.info.webId

  if (sessionRequestInProgress) {
    return (
      <RectangleSkeleton className="w-full">
        <div className="w-full truncate py-2 text-center">Authenticating {webId}</div>
      </RectangleSkeleton>
    )
  }

  if (!session.info.isLoggedIn) {
    return <div className="text-center w-full py-2">Not Logged in!</div>
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="text-center truncate flex-none border-b py-2 sm:px-1">
        Logged-in as {webId} <Ipsum />
      </div>
      <div className="h-full flex-auto overflow-auto text-gray-700">
        <PodList />
      </div>
    </div>
  )
}




