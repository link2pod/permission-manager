"use client"

import { login } from "@inrupt/solid-client-authn-browser";

/**
 * wraps inrupt's login function
 * @param oidcIssuer url of OIDC issuer i.e. identity provider
 * @returns 
 */
export default function handleLogin(oidcIssuer: string) {
  return login({
    oidcIssuer: oidcIssuer,
    redirectUrl: window.location.href,
    clientName: "Link2 Permission Manager",
  })
}
