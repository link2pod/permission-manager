"use client"

import { useSession } from "@inrupt/solid-ui-react"
import MenuItem from "./MenuItem"
import { useSWRConfig } from "swr"

/**
 * Login/logout button in nav/menu dropdown
 */
export default function AuthItem() {
  const { session, logout, sessionRequestInProgress } = useSession()
  const { mutate } = useSWRConfig()

  const handleLogout = () => {
    logout() // invalidate currently signed-in session
    mutate( // clear swr cache
      key => true, // clear all cache keys
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

  // If not logged in, layouts should render a login-form modal 
  return null
}
