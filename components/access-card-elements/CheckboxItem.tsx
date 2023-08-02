"use client"

import { Tooltip } from 'react-tooltip'
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";

export default function CheckboxItem(props: {
  itemname: string,
  active: boolean,
  description?: string,
  disabled?: boolean,
  handleToggle: () => any
}) {
  return (
    <div className="flex items-center flex-auto">
      <div className="h-full pr-1">
        <Checkbox
          active={props.active}
          handleToggle={props.handleToggle}
          disabled={props.disabled}
        />
      </div>
      <div 
        className="text-bold" 
        data-tooltip-id='my-tooltip'
        data-tooltip-content={props.description}
      >
        {props.itemname}
      </div>
      <Tooltip id="my-tooltip" />
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
      className={`w-full h-full flex items-center ${props.disabled ? "text-gray-200" : "hover:cursor-pointer text-primary"}`}
      onClick={handleToggle}
    >
      {props.active ? <RiCheckboxFill /> : <RiCheckboxBlankLine />}
    </div>
  )
}
