"use client"

import { useContext } from "react";
import getUrlPostfix from "@/lib/utilities/getUrlPostfix";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";
import { getContainerUrlPostfix } from "@/lib/utilities/getContainerUrlPostfix";

/**
 * Render IRI of browserItem based on whether it's container or resource. 
 * If normal Resource (e.g. www/.../resource.ttl), show "resource.ttl"
 * If container (e.g. www/container/) show "container/"
 */
export default function ItemText(props: {
  IRI: string,
  isContainer?: boolean,
}) {

  const { setSelectedResourceIRI } = useContext(SelectedResourceContext)

  const displayText = props.isContainer 
    ? getContainerUrlPostfix(props.IRI)
    : getUrlPostfix(props.IRI)

  return (
    <div
      className="w-full"
      onClick={() => setSelectedResourceIRI(props.IRI)}
    >
      {displayText.substring(1)}
    </div>
  )
}

