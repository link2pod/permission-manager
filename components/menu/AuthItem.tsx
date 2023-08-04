"use client"

import { useSession } from "@inrupt/solid-ui-react"
import MenuItem from "./MenuItem"
import { useSWRConfig } from "swr"

export default function AuthItem() {
  const { session, logout, sessionRequestInProgress } = useSession()
  const { mutate } = useSWRConfig()

  const handleLogout = () => {
    logout()
    mutate(
      key => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    )
  }

  if (session.info.isLoggedIn) {
    return (
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
    )
  }

  if (sessionRequestInProgress) {
    return (
      <MenuItem>
        Signing In
      </MenuItem>
    )
  }

  return null
}
