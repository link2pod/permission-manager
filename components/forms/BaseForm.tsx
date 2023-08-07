"use client"

import { useRef, useState } from "react"
import { BiError } from "react-icons/bi"

/**
 * Login-form component with `<input>` field and label styling. 
 * - Calls `props.handleLogin` when user submits form. 
 * - Render's error message if there's errors with the form, 
 * or errors thrown from `props.handleLogin`
 * - TODO: make error messages more user friendly
 * @param props.handleLogin function called when user submits form
 * . The function will recieve the string from the `input` field 
 * @returns 
 */
export function BaseForm(props: {
  handleLogin: (value: string | undefined) => any,
  defaultValue?: string,
  name: string,
  label: string,
}) {
  const [value, setValue] = useState(props.defaultValue)
  const [error, setError] = useState(undefined as undefined | string)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    try {
      await props.handleLogin(value)
    } catch (err: any) {
      const errmessage = err?.message
      const message = typeof errmessage === 'string'
        ? err.message       // custom err.message if it exists
        : 'Failed to login' // default message
      inputRef.current?.focus()
      setError(message) // show error emssage
    }
  }

  return (
    <div className="w-full h-full ">
      <form
        className="w-full sm:flex"
        onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
      >
        <label
          className="flex-none pr-1 text-lg"
          htmlFor={props.name}
        >
          <div className="text-center">{props.label}</div>
        </label>
        <div className="relative w-full">
          <input
            className="w-full pl-1 border rounded"
            name={props.name}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              // clear error message
              inputRef.current?.setCustomValidity('')
              setError(undefined)
            }}
            ref={inputRef}
          />
          {
            error && <div className="z-10 absolute w-full h-10 border border-error rounded grid grid-cols-12">
              <BiError className="fill-error w-full h-full" />
              <div className="overflow-auto col-span-11">
                {error}
              </div>
            </div>
          }
        </div>
      </form>
    </div >
  )
}
