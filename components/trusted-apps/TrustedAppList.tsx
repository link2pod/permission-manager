"use client"

import { Access } from "@inrupt/solid-client"
import TrustedAppCard from "./TrustedAppCard"
import AppcardData from "./appcardType"

export default function TrustedAppList(props: {
  apps: Record<string, AppcardData>,
}){
  return (
    <div className="flex flex-wrap">
      {
        Object.entries(props.apps).map(([appIri, access]) => 
          <TrustedAppCard 
            
          />
        )
      }
    </div>
  )
}
