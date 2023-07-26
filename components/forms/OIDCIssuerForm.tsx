"use client"

import handleLogin from "./HandleInput"
import { BaseForm } from "./BaseForm"

const OIDCIssuers = [
  'http://localhost:3000/',
  'http://localhost:8000/',
  'https://inrupt.net/',
  'https://login.inrupt.com/',
  'https://solidcommunity.net/',
  'https://css.eastus2.cloudapp.azure.com/',
]

export default function OIDCIssuerForm() {
  const handleSubmit = async (oidcIssuer: string | undefined) => {
    if (!oidcIssuer) {
      throw Error("Please Enter your OIDC Issuer")
    }
    try {
      return await handleLogin(oidcIssuer)
    } catch (err: any) {
      if (!err || !err.message)
        throw Error("Failed to Login")
      throw err
    }
  }

  return <BaseForm
    handleLogin={handleSubmit}
    defaultValue={OIDCIssuers[0]}
    name="oidcLogin"
    label="Identity Provider"
  />
}
