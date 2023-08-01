"use client"

import { useState } from "react";
import CheckboxItem from "./CheckboxItem";


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
