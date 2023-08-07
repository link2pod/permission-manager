"use client"

import { useState } from "react";
import CheckboxItem from "./CheckboxItem";

/**
 * Render in checkbox each entry in `props.object`. 
 * Shows buttons `Save`, `Delete` (optional), and `Reset`
 * @param props.object Object containing access text and boolean of it's active state
 * @param props.onSubmit required function called when `Save` button is clicked
 * @param props.onDelete If passed, render `Delete` button which calls `props.onDelete` when clicked
 * @param props.disabled If true, greys out checkboxes and makes then uninteractive 
 * @param props.descriptions text describing each key in `props.object`. 
 * Text will be rendered in tooltip when it's corresponding checkbox/text is hovered-over  
 */
export default function CheckboxList(props: {
  object: Record<string, boolean>,
  onSubmit: (e: Record<string, boolean>) => any,
  onDelete?: () => any,
  descriptions: Record<string, string>,
  disabled?: boolean,
}) {
  const [object, setObject] = useState(props.object)
  const onDelete = props.onDelete

  return (
    <div className="w-full h-full ">
      {/**Render props.object as list of `CheckboxItem`s */}
      <div className="sm:px-4 py-1 flex flex-wrap ">
        {Object.entries(object).map(([type, active]) => <CheckboxItem
          itemname={type}
          active={active}
          handleToggle={() => {
            var newObject = { ...object }
            newObject[type] = !active
            setObject(newObject)
          }}
          description={props.descriptions[type]}
          disabled={props.disabled}
          key={type}
        />)}
      </div>
      <hr />
      {/** Render buttons */}
      <div className="w-full flex justify-evenly">
        <button onClick={() => props.onSubmit(object)} disabled={props.disabled}>Save</button>
        <button onClick={() => {
          setObject(props.object)
        }}
          disabled={props.disabled}
        >Reset</button>
        {onDelete && <button
          onClick={() => onDelete()}
          disabled={props.disabled}
        >Delete</button>}
      </div>
    </div>
  )
}
