"use client"

import { getIri, getProfileAll, getThingAll } from "@inrupt/solid-client"
import { SOLID } from "@inrupt/vocab-solid"
import handleLogin from "./HandleInput"
import { BaseForm } from "./BaseForm"

/**
 * Form that handles logging-in using webId. 
 * TODO: test if it works. 
 */
export default function WebIdLoginForm() {
  const handleSubmit = async (webId: string | undefined) => {
    if (!webId) {
      throw Error("Undefined WebId")
    }
    const profile = await getProfileAll(webId)
    const oidcIssuer
      = [...profile.altProfileAll, profile.webIdProfile]
        .map((dataset) =>
          getThingAll(dataset).map(
            (thing) => getIri(thing, SOLID.oidcIssuer)
          ).find((s) => s)
        ).find((e) => e)
    if (!oidcIssuer) {
      throw Error("Identity Provider not found in your webId. Try logging in with Identity Provider")
    }
    return handleLogin(oidcIssuer)
  }

  return <BaseForm
    handleLogin={handleSubmit}
    name="webidlogin"
    label="WebId"
  />
}
