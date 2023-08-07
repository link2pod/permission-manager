"use client"

import { Tooltip } from 'react-tooltip'
import { RiCheckboxFill, RiCheckboxBlankLine } from "react-icons/ri";

/**
 * Render checkbox, with text on side. 
 * When text or checkbox is hovered, display `props.description` in tooltip
 * @param props.itemname text to display beside checkbox 
 * @param props.handleToggle function called when checkbox is clicked
 * @param props.description text to display in tooltip 
 * @param props.disabled when true, cannot interact with checkbox, and becomes grayed-out
 * @returns 
 */
export default function CheckboxItem(props: {
  itemname: string,
  active: boolean,
  description?: string,
  disabled?: boolean,
  handleToggle: () => any
}) {
  return (
    <div
      className="flex items-center flex-auto"
      data-tooltip-id='my-tooltip'
      data-tooltip-content={props.description}
    >
      <div className="h-full pr-1">
        <Checkbox
          active={props.active}
          handleToggle={props.handleToggle}
          disabled={props.disabled}
        />
      </div>
      <div
        className="text-bold"
      >
        {props.itemname}
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  )
}

/**
 * Render toggleable checkbox. Calls `props.handleToggle` when clicked. 
 * @param props.active checkbox state. 
 * @param props.disabled when true, cannot interact with checkbox, and becomes grayed-out
 */
function Checkbox(props: {
  disabled?: boolean,
  active: boolean,
  handleToggle: () => any
}) {
  const handleToggle = () => {
    if (!props.disabled)
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
