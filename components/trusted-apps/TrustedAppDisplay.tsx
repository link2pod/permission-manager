"use client"

import useGetProfileAll from "@/lib/hooks/useProfileAll"
import { useSession } from "@inrupt/solid-ui-react"
import { 
  getThingAll,
  getIriAll,
  getSourceIri,
  Thing,
  createThing,
  buildThing,
} from "@inrupt/solid-client"
import { RectangleSkeleton } from "../Skeletons"
import TrustedAppList from "./TrustedAppList"





export default function TrustedAppDisplay(){
  const {session} = useSession()

  const loggedIn = session.info.isLoggedIn
  const webId = session.info.webId

  const {data: profile, isLoading} = useGetProfileAll(loggedIn ? webId : null, {
    inruptConfig:{fetch: session.fetch}
  })

  if (isLoading){
    return (
      <RectangleSkeleton className="w-full h-fit text-center py-10">
        Loading Profile
      </RectangleSkeleton>
    )
  }

  if (!loggedIn || !webId) {
    return (
      <div className="border border-error h-fit p-4 mx-auto w-fit rounded">Not Logged In!</div>
    )
  }

  if (!profile) return null
  
  const profileDatasets = [profile.webIdProfile, ...profile.altProfileAll]
  const trustedAppThings = profileDatasets.flatMap(
    (dataset) => getThingAll(dataset).flatMap(
      (datasetThing) => {
        console.log(datasetThing)
        return getIriAll(datasetThing, "https://www.w2.org/ns/auth/acl#trustedApp")
      }
    )
  )
  const appAccessRecords = {
    "testApp": {
      access: defaultAccess,
      datasetIri: "", 
      thing: createThing(),
    }
  }

  return (
    <div className="w-full h-full">
      <TrustedAppList 
        apps={appAccessRecords}
      />
    </div>
  )
}

const defaultAccess = {
  read: true,
  write: true,
  append: true,
  control: false,
}