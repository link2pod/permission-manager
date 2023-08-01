"use client"

import { useState } from "react";
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";
//import Ipsum from "@/test/components/Ipsum";


export default function CheckboxList(props: {
  object: Record<string, boolean>,
  onSubmit: (e: Record<string, boolean>) => any,
  descriptions: Record<string, string>,
  disabled?: boolean,
}) {
  const [object, setObject] = useState(props.object)

  return (
    <div className="w-full h-full ">
      <div className="sm:px-4 py-1">
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
        />)}
      </div>
      {!props.disabled && <>
        <hr />
        <div className="w-full flex justify-evenly">
          <button onClick={() => props.onSubmit(object)}>Save</button>
          <button onClick={() => {
            setObject(props.object)
          }}>Reset</button>

        </div>
      </>}
    </div>
  )
}

function CheckboxItem(props: {
  itemname: string,
  active: boolean,
  description?: string,
  disabled?: boolean,
  handleToggle: () => any
}) {
  return (
    <div className="flex items-center">
      <div className="h-full pr-1">
        <Checkbox
          active={props.active}
          handleToggle={props.handleToggle}
          disabled={props.disabled}
        />
      </div>
      <div className="text-bold">{props.itemname}: {props.description}</div>
    </div>
  )
}

function Checkbox(props: {
  disabled?: boolean,
  active: boolean,
  handleToggle: () => any
}) {
  const handleToggle = () => {
    props.handleToggle()
  }
  return (
    <div
      className={`w-full h-full ${props.disabled ? "text-gray-200" : "hover:cursor-pointer text-primary"}`}
      onClick={handleToggle}
    >
      {props.active ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
    </div>
  )
}
