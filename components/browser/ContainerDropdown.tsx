"use client"

import { Thing, ThingPersisted, getIriAll, getThing } from "@inrupt/solid-client"
import { LDP, RDF } from "@inrupt/vocab-common-rdf"
import { useSession } from "@inrupt/solid-ui-react"
import useSolidDataset from "@/lib/hooks/useSolidDataset"
import { useState } from "react"
import { Menu } from "@headlessui/react"
import Dropdown from "./Dropdown"
import ItemText from "./ItemText"
import BrowserItem from "./BrowserItem"

/**
 * On dropdown, fetch and cache container resource dataset. 
 * Renders Dropdown contents based on data-fetch state. 
 * Recursively renders things in the resource (as BrowserItems)
 * @param props.IRI iri of container to render
 * @returns 
 */
export default function ContainerDropdown(props: {
    IRI: string,
    depth: number,
}) {
    const containerIRI = props.IRI
    const [open, setOpen] = useState(false)
    const { session } = useSession()

    const { data: containerDataset, isLoading, error, isValidating }
        = useSolidDataset(open ? containerIRI : null,
            { inruptConfig: { fetch: session.fetch } })

    const handleToggleDropdown = () => {
        setOpen(!open)
    }

    return (
        <Menu>
            <div
                className="flex hover:bg-gray-100 hover:cursor-pointer hover:text-primary"
                style={{ paddingLeft: props.depth * 20 }}
            >
                <div className="pr-1">
                    <Dropdown.Button isOpen={open} handleToggleDropdown={handleToggleDropdown}>
                        <Menu.Button />
                    </Dropdown.Button>
                </div>
                <ItemText IRI={containerIRI} isContainer={true}/>
            </div>
            <Dropdown.Body
                isOpen={open} showLinedrop
                isLoading={isLoading} isValidating={isValidating}
                error={error}
            >
                <>
                    { // Render resources contained in the containerDataset
                        containerDataset && getIriAll(
                            getThing(containerDataset, containerIRI) as ThingPersisted,
                            LDP.contains,
                        ).map((containedThingIRI) => {
                            const containedThing = getThing(containerDataset, containedThingIRI)
                            if (!containedThing) { return null }
                            return <BrowserItem
                                IRI={containedThingIRI}
                                key={containedThingIRI}
                                depth={props.depth + 1}
                                isContainer={isContainer(containedThing)}
                            />
                        })
                    }
                </>
            </Dropdown.Body>
        </Menu>
    )
}

function isContainer(thing: Thing) {
    return getIriAll(thing, RDF.type).find((typeIri) => {
        return typeIri === LDP.Container
    }) ? true : false
}
