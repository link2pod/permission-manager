"use client"

import { useContext } from "react";
import SelectedResourceContext from "@/lib/contexts/SelectedResourceContext";

export default function ResourceAgentList() {
  const { selectedResourceIRI } = useContext(SelectedResourceContext)
  return (<div>Resource Agnet list</div>)
}
